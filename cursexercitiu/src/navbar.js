import Button from "./buton";
import Message from "./mesaji";

function Navbar(props) {
  let buttonArray = [];
  buttonArray = props.buttonArray;
  return (
    <div>
      <Message name={props.name}></Message>
      {buttonArray.map((btn) => {
        return <Button handelClick={btn.handelClick} text={btn.text}></Button>;
      })}
    </div>
  );
}

export default Navbar;
