import http from "./http";
export const loginApi = (username, password) => http.post("/auth/login", { username, password });
