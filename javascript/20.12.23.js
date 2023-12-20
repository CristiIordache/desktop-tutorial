// console.log(2)
// console.log(2)
// console.log(2)

// // for este o comanda care repeta lucrurile  se scrie ; for(let i=0;i<100;i++)
// // for se traduce pentru
// //i++ este numarator
// let text="text"
// console.log(text[0])
// console.log(text[1])
// console.log(text[2])
// console.log(text[3])

// for (let i = 0; i < text.length; i == ){
//     console.log(text[i]);
// }

// // paranteza patrate ne uitam in interiorul variabilei
// // for(let i = 0; i < 10; i++){
// //     // console.log(i) cu consol.log simplu pui toate numerele// }

function clic() {
//   let string = "";

//   for (let i = 0; i < 10; i++) {
//     for (let j = 0; j < 2; j++) {
//       string += "$";
//     }
//     string = +"\n";
//   }

    //   string += "%";
    
    let result = ""
    
       for( let i = 0; i <=10; i ++)
    
    {
        for (let j = 1; j <=10; j ++)

    {
            
        result += i * j + ","
            
        }
        
           result += "\n";
           //\n face noi lini ca sa nu mearga o singura linie 

    }

//break // este ca sa opresti for   daca ai multe numere si ai un if ==5 sau etc va opri utilizarea ca sa nu arata tot ce nu conteaza , asa se optimizeaza .

  document.body.innerText = result;
}

