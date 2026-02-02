import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

export const productService = {
  getProducts: async () => {
    const res = await axios.get(`${API_BASE}/products/list`);
    return res.data.data;
  },
};
