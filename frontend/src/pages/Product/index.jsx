import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useProducts } from "../../hooks/useProducts";
import useCategory from "../../hooks/useCategory";
import ProductHeader from "../../components/productHeader";
import Loading from "../../components/loading";
import FormModal from "../../components/Modal";

export default function ProductPage() {
  const {
    products,
    loading,
    form,
    editingId,
    error,
    handleChange,
    submitForm,
    startEdit,
    deleteProduct,
    resetForm
  } = useProducts();

  const { categories, loading: loadingCategory } = useCategory();

  const [modalOpen, setModalOpen] = useState(false);

  const openModalCreate = () => {
    resetForm();
    setModalOpen(true);
  };

  const openModalEdit = (product) => {
    startEdit(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    resetForm();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await submitForm();
    setModalOpen(false);
  };

  return (
    <section className="container px-4 py-1 mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <ProductHeader total={products.length} />

        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FontAwesomeIcon icon={faSearch} className="text-gray-400 text-sm" />
            </span>
            <input
              type="text"
              placeholder="Cari..."
              className="py-2 pl-9 pr-4 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none w-full md:w-56 bg-gray-50"
            />
          </div>

          <button
            onClick={openModalCreate}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm"
          >
            <FontAwesomeIcon icon={faPlus} />
            <span>Tambah</span>
          </button>
        </div>
      </div>

      <div className="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-12 px-4 py-3 text-sm font-bold text-gray-500 text-left">No</th>
              <th className="px-2 py-3 text-sm font-bold text-gray-500 text-left">Nama Produk</th>
              <th className="px-4 py-3 text-sm font-bold text-gray-500 text-left">Kategori</th>
              <th className="px-4 py-3 text-sm font-bold text-gray-500 text-left">Harga</th>
              <th className="w-28 px-2 py-3 text-sm font-bold text-gray-500 text-left">Status</th>
              <th className="w-24 px-4 py-3 text-sm font-bold text-gray-500 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={6} className="py-12 text-center">
                  <Loading />
                </td>
              </tr>
            ) : products.length ? (
              products.map((product, index) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-500">{index + 1}</td>
                  <td className="px-2 py-3 text-sm font-semibold text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {product.category || "-"}
                  </td>
                  <td className="px-4 py-3 text-sm font-mono text-gray-800">
                    Rp {Number(product.price).toLocaleString("id-ID")}
                  </td>
                  <td className="px-2 py-3 text-sm">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        product.status === "bisa dijual"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => openModalEdit(product)}
                        className="text-gray-400 hover:text-blue-600"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="text-gray-400 hover:text-red-600"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-12 text-center text-gray-400 italic">
                  Tidak ada data produk
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <FormModal
        open={modalOpen}
        onClose={closeModal}
        title={editingId ? "Edit Produk" : "Tambah Produk"}
      >
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div>
            <label className="text-sm font-medium text-gray-700">Nama Produk</label>
            <input
              name="name"
              placeholder="Masukkan nama produk"
              value={form.name}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 text-sm"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Harga</label>
            <input
              type="number"
              placeholder="15000"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 text-sm"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Kategori</label>
            <select
              name="category_id"
              value={form.category_id || ""}
              onChange={handleChange}
              disabled={loadingCategory}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 text-sm"
              required
            >
              <option value="">Pilih Kategori</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Status</label>
            <select
              name="status_id"
              value={form.status_id || ""}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 text-sm"
              required
            >
              <option value="">Pilih Status</option>
              <option value="1">Bisa Dijual</option>
              <option value="2">Tidak Bisa Dijual</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {editingId ? "Update" : "Tambah"}
            </button>
          </div>
        </form>
      </FormModal>
    </section>
  );
}
