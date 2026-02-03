import { useState } from "react";
import MenuItem from "./MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesRight,
  faMoneyCheckDollar
} from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <div
      className={`flex flex-col min-h-full px-3 pt-1 pb-6 bg-white border-r border-r-gray-200 transition-all duration-300 ${
        isOpen ? "w-56" : "w-16"
      }`}
    >

      <div className="flex flex-col justify-between flex-1">
        <nav className="space-y-3">
          {/* Header Sidebar */}
          <div className="px-3 flex items-center justify-between py-2 text-gray-600 border-b border-b-gray-200">
            {isOpen && (
              <div className="flex items-center justify-center transition-opacity duration-300">
                <span className="font-bold text-xl">Dashboard</span>
              </div>
            )}

            <button onClick={toggleSidebar}>
              <FontAwesomeIcon
                icon={faAnglesRight}
                className={`transition-transform duration-300 cursor-pointer ${
                  !isOpen ? "rotate-180 py-1" : ""
                }`}
              />
            </button>
          </div>

          <div>
            <MenuItem
              icon={faMoneyCheckDollar}
              label="Produk"
              isOpen={isOpen}
              to="/products"
            />
          </div>

          <div>
            <MenuItem
              icon={faMoneyCheckDollar}
              label="Category"
              isOpen={isOpen}
              to="/category"
            />
          </div>
        </nav>
      </div>
    </div>
  );
}
