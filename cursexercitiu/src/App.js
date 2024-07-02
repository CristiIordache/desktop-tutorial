import Heder from "./heder";
import Navbar from "./navbar";
import UserContext from "./content";

function App() {
  const name = "cris"
  const buttonArray = [
    { handelClick: (e) => { alert(e.target) }, text: "Home" },
  { handelClick:(e)=>{alert(e.target)},test: "Home"}
  
  ]
  return (
    <UserContext.Provaider value={"cris"}>
      <Navbar buttonArray={buttonArray} name={name}>  </Navbar>
    </UserContext.Provaider>
  );
}

export default App;
