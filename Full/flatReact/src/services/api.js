//C:\Users\Cristian Iordache\Desktop\Teme.html\githab\desktop-tutorial\Full\flatReact\src\services\api.js

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Interceptor pentru a adăuga token-ul JWT în header-ul cererii
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
