import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.css";
import Home from "./pages/home.jsx";
import Profile from "./pages/profile.jsx";
import Profiles from "./pages/profiles.jsx";
import Notfound from "./pages/notfound.jsx";

const router = createBrowserRouter([
  {
    path: `/`,
    element: <Home />,
    errorElement:<Notfound/>
  },
  {
    path: `/profile`,
    element: <Profile />,
    children: [{
      path: `:userId`,
      element: <Profiles />,

    }]
  },
  {
    path: `/profiles/:userId`,
    element: <Profiles />,
   
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
