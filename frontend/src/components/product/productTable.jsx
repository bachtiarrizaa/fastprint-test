import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Loading from "./loading";

export default function ProductTable({ products, loading }) {
  if (loading) return <Loading />;

  if (!products.length)
    return (
      <tbody>
        <tr>
          <td colSpan={6} className="px-4 py-12 text-center text-gray-400 text-sm italic">
            Tidak ada data produk ditemukan.
          </td>
        </tr>
      </tbody>
    );

  return (
    <tbody className="divide-y divide-gray-200">
      {products.map((product, index) => (
        <tr key={product.id} className="hover:bg-gray-50/80 transition-colors">
          <td className="px-4 py-3 text-sm text-gray-500">{index + 1}</td>
          <td className="max-w-xl px-2 py-3 text-sm font-semibold text-gray-900" title={product.name}>
            {product.name}
          </td>
          <td className="px-4 py-3 text-sm text-gray-600">{product.category || "-"}</td>
          <td className="px-4 py-3 text-sm font-mono text-gray-800">
            Rp {Number(product.price).toLocaleString("id-ID")}
          </td>
          <td className="px-2 py-3 text-sm">
            <span
              className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tight ${
                product.status === "bisa dijual"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {product.status}
            </span>
          </td>
          <td className="px-4 py-3 text-sm text-center">
            <div className="flex justify-center gap-4">
              <button className="text-gray-400 hover:text-blue-600 transition-colors">
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button className="text-gray-400 hover:text-red-600 transition-colors">
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
