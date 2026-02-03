import { Route, Routes } from "react-router-dom";
import ProductPage from "../pages/Product";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/products" element={<ProductPage />} />
    </Routes>
  );
}
