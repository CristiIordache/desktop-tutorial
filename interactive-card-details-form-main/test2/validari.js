class validated{ 
    constructor(htmlElement,valid){
      this.htmlElement = htmlElement;
      this.valid = valid;
    }
  }
  
  function validation(input, output, length=3){
    if(input.value !== ""){
      if(input.getAttribute("validate")=="number"){
        if(containsOnlyNumbers(input.value)){
          if(checkLength(input.value, length)){
            input.style.border = "1px solid green";
            output.innerText = "";
            return new validated(input,true);
          } 
          else { output.innerText = "The number is too short"; 
                input.style.border = "1px solid red";
                return new validated(input,false);}
                
        } 
        else { output.innerText = "Wrong format, numbers only"; 
              input.style.border = "1px solid red";
              return new validated(input,false);}
    }
    else{
        if(!containsOnlyNumbers(input.value)){
        
            input.style.border = "1px solid green";
            output.innerText = "";
            return new validated(input,true);
        
          } 
        else { output.innerText = "Wrong format, letters only"; 
              input.style.border = "1px solid red";
              return new validated(input,false);}
      } 
  }
    else { output.innerText = "Can't be blank"; 
          input.style.border = "1px solid red";
          return new validated(input,false);}
      
  }