import axios from "axios";
const API_BASE = import.meta.env.VITE_API_BASE;

export const productService = {
  getProducts: async () => {
    const res = await axios.get(`${API_BASE}/products/list`);
    return res.data.data;
  },
  createProduct: async (payload) => {
    const res = await axios.post(`${API_BASE}/products/create/`, payload);
    return res.data.data;
  },
  updateProduct: async (id, payload) => {
    const res = await axios.put(`${API_BASE}/products/${id}/update/`, payload);
    return res.data.data;
  },
  deleteProduct: async (id) => {
    await axios.delete(`${API_BASE}/products/${id}/delete/`);
  }
};
