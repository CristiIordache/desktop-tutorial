import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./componets/login.jsx";
import Register from "./componets/register.jsx";
import Header from "./componets/header.jsx";
import Home from "./componets/home.jsx";
import { AuthProvider } from "./contexts/authContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },

  {
    path: "login",
    element: <Login />,
  },

  {
    path: "register",
    element: <Register />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
