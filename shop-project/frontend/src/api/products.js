import http from "./http";
export const getProducts = () => http.get("/products");
export const getProduct = (id) => http.get(`/products/${id}`);
