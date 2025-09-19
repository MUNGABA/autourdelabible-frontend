import axios from "axios";
const API_URL = "DATABASE_URL=postgresql://autourdelabible_db_user:MlTFFdAxC9exThH0kCLsICb9YTO9wMez@dpg-d360a2je5dus73dp9b50-a.oregon-postgres.render.com/autourdelabible_db"; // Remplace par ton backend en ligne après déploiement
const api = axios.create({ baseURL: API_URL });
export const setAuthToken = token=>{ if(token) api.defaults.headers.common['Authorization']=`Bearer ${token}`; else delete api.defaults.headers.common['Authorization']; };
export default api;
