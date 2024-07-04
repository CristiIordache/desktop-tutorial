// import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  let nav = useNavigate(); // Call useNavigate() correctly inside the component

  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => { nav(`/profile`) }}>Go to Profile</button>
    </div>
  );
};

export default Home;
