// import React from "react";
import { useParams } from "react-router-dom";

const Profiles = () => {
  let params=useParams()
  return (
    <div>
      <h1>Profile for User</h1>
      <p> id utilizator :{params.userId}  </p>
      {
        //   contant
      }
    </div>
  );
};

export default Profiles;