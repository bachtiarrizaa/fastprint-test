export default function ProductHeader({ total }) {
  return (
    <div>
      <div className="flex items-center gap-x-3">
        <h2 className="text-xl font-bold text-gray-800">Produk</h2>
        <span className="px-2.5 py-0.5 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full border border-blue-100">
          {total} Total
        </span>
      </div>
      <p className="text-sm text-gray-500 mt-0.5">Daftar produk hasil sinkronisasi API.</p>
    </div>
  );
}
