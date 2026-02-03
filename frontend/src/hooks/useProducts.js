import { useState, useEffect, useCallback } from "react";
import { productService } from "../services/productService";

const initialForm = {
  name: "",
  price: "",
  category_id: "",
  status_id: ""
};

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const syncProducts = async ({ username, password }) => {
    if (!username || !password) {
      alert("Username dan password wajib diisi");
      return;
    }

    const confirmed = window.confirm(
      "Ambil data produk dari API external?"
    );
    if (!confirmed) return;

    setLoading(true);
    setError(null);

    try {
      await productService.syncProducts({ username, password });

      await getProducts();

      alert("Berhasil mengambil data produk 🎉");
    } catch (err) {
      console.error(err);
      setError("Gagal mengambil data produk");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getProducts();
      setProducts(data || []);
    } catch (err) {
      console.error(err);
      setError("Gagal mengambil data produk");
    } finally {
      setLoading(false);
    }
  }, []);

  const createProduct = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const created = await productService.createProduct(payload);
      setProducts((prev) => [created, ...prev]);
      return created;
    } catch (err) {
      console.error(err);
      setError("Gagal menambahkan produk");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id, payload) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await productService.updateProduct(id, payload);
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? updated : p))
      );
      return updated;
    } catch (err) {
      console.error(err);
      setError("Gagal mengupdate produk");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    const confirmed = window.confirm(
      "Apakah yakin ingin menghapus produk ini?"
    );
    if (!confirmed) return;

    setLoading(true);
    setError(null);
    try {
      await productService.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      setError("Gagal menghapus produk");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
    setError(null);
  };

  const startEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      category_id: String(product.category_id),
      status_id: String(product.status_id)
    });
    setEditingId(product.id);
  };

  const submitForm = async () => {
    if (!form.name || !form.price || !form.category_id || !form.status_id) {
      alert("Semua field wajib diisi!");
      return;
    }

    const payload = {
      name: form.name,
      price: Number(form.price),
      category_id: Number(form.category_id),
      status_id: Number(form.status_id)
    };

    if (editingId) {
      await updateProduct(editingId, payload);
    } else {
      await createProduct(payload);
    }

    resetForm();
  };

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return {
    products,
    form,
    editingId,
    loading,
    error,

    syncProducts,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,

    handleChange,
    submitForm,
    startEdit,
    resetForm
  };
};
