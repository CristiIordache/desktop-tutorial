

// crezi functi a cu butonul din  html 
//function hai() {
    //pui let si dai o denumire derivari si apoi verifici daca exista vriun ul sau ori ce element in html 
  //let cekul = document.querySelector(`ul`);
   // if (!cekul) {
      // daca nu exisa cu if poti crea un element in interiorul functiei 
    //let ul = document.createElement(`ul`);
    //let li0 = document.createElement(`li`);
    //let li1 = document.createElement(`li`);
      //  let li2 = document.createElement(`li`);
        // dupa ce ai adaugat poti pune text 
    //li0.innerText = `Text`;
    //li1.innerText = `Text`;
   // li2.innerText = `Text`;
// cu appended child poti adauga in interiorul obiectului un alt obiect sau o extensie 
   // ul.appendChild(li0);
    //ul.appendChild(li1);
   // ul.appendChild(li2);
// cu aceast add event poti adauga o animatie cu culoare cu o extentie de functie mai jos 
//     ul.addEventListener("mouseover", mouse);
//     document.body.appendChild(ul);
//     addcoler();
//   }
// }

// function mouse(e) {
//     console.log(e.target);
//     let el = e.target
//     el.style.color="green"
// }

// function remove() {
//   let ul = document.querySelector("ul");
//   if (ul) {
//     document.body.removeChild(ul);
//   }
// }

// function remove() {
//   let list = document.querySelector(`ul`);
//   if (list) {
//     let li = list.querySelector(`li`);
//     if (li) {
//       list.removeChild(li);
//     } else {
//       console.log(list);
//       document.body.removeChild(list);
//     }
//   }
// }
// function addcoler() {
//   let ul = document.querySelector(`ul`);
//   if (ul) {
    //ul.style.color = "red";
//     let li = ul.querySelectorAll(`li`);
//     for (let ele of li) {
//       ele.style.color = "red";
//     }
//   }
// }

// function removecoler() {
//   let ul = document.querySelector(`ul`);
//   if (ul) {
//     let li = ul.querySelectorAll(`li`);
    //   li.reverse()
//     let li2 = [...li];
//     li = li2;
//     li.reverse();

//     console.log(li2);
//     for (let ele of li) {
//       console.log(ele.style.color);

//         if (ele.style.color !== "blue") {
          
//         ele.style.color = "blue";
//         break;
//       }
//     }
//   }
// }

//5.02.24


let denumire = document.querySelector(selectorul)

addEventListener
alertFunction


// function alertFunction()
// {
//     localStorage.setItem(`test `,) 
    //se ataseaza la butoane petru a prelua elementetele de la utilizatoti 
    // localStorage.getItem()

    // prea elementul stocat si il arata 
// }


function alertFunction() {
    let me = new User(`cristi`, `'gmil`, `cristi`, `cristi`, `8`)
   
let savetodabase=JSON.stringify(me)   
   
    let storage = localStorage.getItem(`test`)
    storage = JSON.parse(storage)
    console.log(storage)


}

function User(username, email, firstname, lastname, age)
{
    this.username = username
    this.email = email
    this.firstname = firstname
    this.lastname = lastname
    this.age=age
}






