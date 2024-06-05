function Button(props){
    return(
      <button className="button" onClick={props.handelClick}>{props.text}</button>
    )
  }
  
  export default Button