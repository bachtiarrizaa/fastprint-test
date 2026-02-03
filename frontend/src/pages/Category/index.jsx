import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import useCategory from "../../hooks/useCategory";
import ProductHeader from "../../components/productHeader";
import Loading from "../../components/loading";
import FormModal from "../../components/Modal";

export default function CategoryPage() {
  const {
    categories,
    loading,
    error,
    createCategory,
    updateCategory,
    deleteCategory
  } = useCategory();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: "" });

  const openModalCreate = () => {
    setForm({ name: "" });
    setEditingId(null);
    setModalOpen(true);
  };

  const openModalEdit = (category) => {
    setForm({ name: category.name });
    setEditingId(category.id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setForm({ name: "" });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateCategory(editingId, form);
    } else {
      await createCategory(form);
    }
    closeModal();
  };

  return (
    <section className="container px-4 py-1 mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <ProductHeader total={categories.length} title="Kategori" />
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
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all shadow-sm"
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
              <th className="w-12 px-4 py-3 text-sm font-bold text-gray-500 uppercase text-left">No</th>
              <th className="px-4 py-3 text-sm font-bold text-gray-500 uppercase text-left">Nama Kategori</th>
              <th className="w-24 px-4 py-3 text-sm font-bold text-gray-500 uppercase text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={3} className="px-4 py-12 text-center">
                  <Loading />
                </td>
              </tr>
            ) : categories.length > 0 ? (
              categories.map((category, index) => (
                <tr key={category.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-sm text-gray-500">{index + 1}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">
                    {category.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-center">
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => openModalEdit(category)}
                        className="text-gray-400 hover:text-blue-600 transition"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        onClick={() => deleteCategory(category.id)}
                        className="text-gray-400 hover:text-red-600 transition"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-4 py-12 text-center text-gray-400 italic">
                  Tidak ada data kategori.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <FormModal
        open={modalOpen}
        onClose={closeModal}
        title={editingId ? "Edit Kategori" : "Tambah Kategori"}
      >
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nama Kategori
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
              required
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Batal
            </button>
            <button
              type="submit"
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
