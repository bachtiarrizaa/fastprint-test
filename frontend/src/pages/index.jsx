import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import useCategory from "../hooks/useCategory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faTags, faCloudArrowDown } from "@fortawesome/free-solid-svg-icons";

export default function IndexPage() {
  const { products, loading, syncProducts } = useProducts();
  const { categories, getCategories } = useCategory();

  const [syncForm, setSyncForm] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSyncForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSync = async () => {
    await syncProducts(syncForm);
    await getCategories();
    setSyncForm({ username: "", password: "" });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        Loading data...
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <section className="px-4 py-1">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Dashboard
        </h1>

        <div className="max-w-md mx-auto bg-white border rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-3">
              <FontAwesomeIcon
                icon={faCloudArrowDown}
                className="text-blue-600 text-xl"
              />
            </div>
            <h2 className="font-semibold text-gray-800">
              Sinkronisasi Produk
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Ambil data produk dari API Fastprint
            </p>
          </div>

          <div className="space-y-4">
            <input
              name="username"
              value={syncForm.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full border border-gray-400 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />

            <input
              name="password"
              value={syncForm.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full border border-gray-400 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />

            <button
              onClick={handleSync}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              <FontAwesomeIcon icon={faCloudArrowDown} />
              Sync Produk
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-1">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 border rounded-2xl shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
            <FontAwesomeIcon
              icon={faBox}
              className="text-green-600 text-xl"
            />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Produk</p>
            <p className="text-3xl font-bold text-gray-900">
              {products.length}
            </p>
          </div>
        </div>

        <div className="bg-blue-50 p-6 border border-blue-100 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-200 flex items-center justify-center">
            <FontAwesomeIcon
              icon={faTags}
              className="text-blue-700 text-xl"
            />
          </div>
          <div>
            <p className="text-sm text-blue-700">Total Kategori</p>
            <p className="text-3xl font-bold text-blue-800">
              {categories.length}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
