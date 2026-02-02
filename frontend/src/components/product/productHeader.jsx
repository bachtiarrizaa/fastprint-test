import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function ProductHeader({ total }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
      <div>
        <div className="flex items-center gap-x-3">
          <h2 className="text-xl font-bold text-gray-800">Produk FastPrint</h2>
          <span className="px-2.5 py-0.5 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full border border-blue-100">
            {total} Total
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-0.5">Daftar produk hasil sinkronisasi API fastprint.</p>
      </div>

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
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all shadow-sm">
          <FontAwesomeIcon icon={faPlus} />
          <span>Tambah</span>
        </button>
      </div>
    </div>
  );
}
