import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ProductPage from "../pages/Product";
import IndexPage from "../pages";
import CategoryPage from "../pages/Category";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<IndexPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/category" element={<CategoryPage />} />
      </Route>
    </Routes>
  );
}
