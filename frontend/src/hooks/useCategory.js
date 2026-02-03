import { useCallback, useEffect, useState } from "react";
import { categoryService } from "../services/categoryService";

export default function useCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await categoryService.getCategories();
      setCategories(res || []);
    } catch (err) {
      console.error(err);
      setError("Gagal mengambil kategori");
    } finally {
      setLoading(false);
    }
  }, []);

  const createCategory = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      await categoryService.createCategory(payload);
      await getCategories();
    } catch (err) {
      console.error(err);
      setError("Gagal menambahkan kategori");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateCategory = async (id, payload) => {
    setLoading(true);
    setError(null);
    try {
      await categoryService.updateCategory(id, payload);
      await getCategories();
    } catch (err) {
      console.error(err);
      setError("Gagal mengubah kategori");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id) => {
    const confirmed = window.confirm(
      "Apakah kamu yakin ingin menghapus kategori ini?"
    );

    if (!confirmed) return;

    setLoading(true);
    setError(null);

    try {
      await categoryService.deleteCategory(id);
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
      setError("Gagal menghapus kategori");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return {
    categories,
    loading,
    error,

    createCategory,
    updateCategory,
    deleteCategory,
    getCategories
  };
}
