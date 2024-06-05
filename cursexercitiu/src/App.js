import Heder from "./heder";
import Navbar from "./navbar";

function App() {
  const name = "cris"
  const buttonArray = [
    { handelClick: (e) => { alert(e.target) }, text: "Home" },
  { handelClick:(e)=>{alert(e.target)},test: "Home"}
  
  ]
  return (
    <Navbar  buttonArray={buttonArray} name={name}>  </Navbar>
  );
}

export default App;
