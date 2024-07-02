import UserContext from "./content"
import { useContext } from "react"


function Button(props) {
  let user=useContext(UserContext)
  return (
    <button onClick={() => { }}>{ user}</button>
      // <button className="button" onClick={props.handelClick}>{props.text}</button>
    )
  }
  
  export default Button