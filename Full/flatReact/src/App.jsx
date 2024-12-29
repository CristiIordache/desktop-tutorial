import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Profile from "./components/Profile/Profile";
import ProfileUpdate from "./components/Profile/ProfileUpdate";
import FlatView from "./components/Flats/FlatView";
import NewFlat from "./components/Flats/NewFlat";
import EditFlat from "./components/Flats/EditFlat";
import FavoriteFlats from "./components/Flats/FavoriteFlats";
import PrivateRoute from "./components/Routes/PrivateRoute";
import Header from "../Header";
import ExampleGrid from "./components/ExampleGrid";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/update"
          element={
            <PrivateRoute>
              <ProfileUpdate />
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
        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <FavoriteFlats />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;