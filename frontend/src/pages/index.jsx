import { useProducts } from "../hooks/useProducts";
import useCategory from "../hooks/useCategory";

export default function IndexPage() {
  const { products, loading: loadingProduct } = useProducts();
  const { categories, loading: loadingCategory } = useCategory();

  const totalProduct = products.length;
  const totalCategory = categories.length;

  const isLoading = loadingProduct || loadingCategory;

  return (
    <section className="px-4 py-1">
      <h1 className="text-xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {isLoading ? (
        <p className="text-gray-400 text-sm">Loading data...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border p-5">
            <p className="text-sm text-gray-500">Total Produk</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {totalProduct}
            </p>
          </div>

          <div className="bg-blue-50 rounded-xl shadow-sm border border-blue-100 p-5">
            <p className="text-sm text-blue-700">Total Kategori</p>
            <p className="mt-2 text-3xl font-bold text-blue-800">
              {totalCategory}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
