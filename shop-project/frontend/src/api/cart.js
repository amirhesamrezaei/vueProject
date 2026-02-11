import http from "./http";
export const getCart = () => http.get("/cart");
export const addToCart = (productId, quantity = 1) => http.post("/cart", { productId, quantity });
export const updateCartItem = (id, quantity) => http.patch(`/cart/${id}`, { quantity });
export const removeCartItem = (id) => http.delete(`/cart/${id}`);
