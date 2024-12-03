// Full\flatReact\src\App.jsx
import React from "react";
import './components/Css/Global.css';
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import NewFlat from "./components/Flats/NewFlat";
import EditFlat from "./components/Flats/EditFlat";
import FlatView from "./components/Flats/FlatView";
import PrivateRoute from "./components/Routes/PrivateRoute";
import Header from "../Header";


const App = () => {
  return (
    <>
      <Header /> {/* Header-ul aplicației */}
      <Routes>
        {/* Rute publice */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rute protejate */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/flats"
          element={
            <PrivateRoute>
              <FlatView />
            </PrivateRoute>
          }
        />
        <Route
          path="/flats/new"
          element={
            <PrivateRoute>
              <NewFlat />
            </PrivateRoute>
          }
        />
        <Route
          path="/flats/:id/edit"
          element={
            <PrivateRoute>
              <EditFlat />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
