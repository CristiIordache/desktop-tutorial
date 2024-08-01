import React, { useEffect, useState } from "react";
import axios from 'axios'
function Http() {
  const [data, setDate] = useState(null);
  useEffect(() => {
    // fetch("https://restcountries.com/v3.1/name/Romania")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setDate(data[0]);
    //   })
    //     .catch((error) => {
    //     console.log(error);
      //   });
      axios.get('https://restcountries.com/v3.1/name/Romania')
          .then(response =>{
          setDate(response.data[0])
          })
          .catch(error => {
          console.log(error)
      })
  })
      
  return (
    <>
      <h1>helo</h1>
      {data?data.capital[0]:"data hasn "}
    </>
  );
}

export default Http;
