import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FormModal({ open, onClose, title, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">

        <div className="flex justify-between items-center mb-3">
          <h2 className="text-sm font-semibold text-gray-700">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-500 text-xl font-bold cursor-pointer"
          >
            <FontAwesomeIcon icon={faXmark} size="sm" />
          </button>
        </div>

        <div className="border-t border-blue-100 mb-2 -mt-2"></div>

        {children}
      </div>
    </div>
  );
}
