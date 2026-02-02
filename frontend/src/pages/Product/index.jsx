// src/pages/Product/index.jsx
import ProductHeader from "../../components/product/productHeader";
import ProductTable from "../../components/product/productTable";
import { useProducts } from "../../hooks/useProducts";

export default function ProductPage() {
  const { products, loading } = useProducts();

  return (
    <section className="container p-6 mx-auto font-sans">
      <ProductHeader total={products.length} />
      <div className="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-12 px-4 py-3 text-sm font-bold text-gray-500 uppercase tracking-wider text-left">No</th>
              <th className="max-w-xl px-2 py-3 text-sm font-bold text-gray-500 uppercase tracking-wider text-left">Nama Produk</th>
              <th className="px-4 py-3 text-sm font-bold text-gray-500 uppercase tracking-wider text-left">Kategori</th>
              <th className="px-4 py-3 text-sm font-bold text-gray-500 uppercase tracking-wider text-left">Harga</th>
              <th className="w-28 px-2 py-3 text-sm font-bold text-gray-500 uppercase tracking-wider text-left">Status</th>
              <th className="w-24 px-4 py-3 text-sm font-bold text-gray-500 uppercase tracking-wider text-center">Aksi</th>
            </tr>
          </thead>
          <ProductTable products={products} loading={loading} />
        </table>
      </div>
    </section>
  );
}
