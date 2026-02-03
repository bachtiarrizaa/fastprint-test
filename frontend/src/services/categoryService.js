import axios from "axios";
const API_BASE = import.meta.env.VITE_API_BASE;

export const categoryService = {
  getCategories: async () => {
    const res = await axios.get(`${API_BASE}/categories/list/`);
    return res.data.data;
  },

  createCategory: async (payload) => {
    const res = await axios.post(`${API_BASE}/categories/create/`, payload );
    return res.data;
  },

  updateCategory: async (id, payload) => {
    const res = await axios.put(`${API_BASE}/categories/${id}/update/`,payload );
    return res.data;
  },

  deleteCategory: async (id) => {
    const res = await axios.delete(`${API_BASE}/categories/${id}/delete/`);
    return res.data;
  }
};
