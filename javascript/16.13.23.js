// let text = "Text";
// a = 30;
// b = 20;

// console.log(a * b)

// function (clic)
// {

//     let div1 = document.getElementById("div1")
//     let div2 = document.getElementById("div2")
//     let div3 = document.getElementById("div3")

// if(div1.style.backgroundColor=="aqua" && div2.style.backgroundColor=="red" ||  div3.style.backgroundColor=="gold" )
// {
//  div1.innerText=div3.style.backgroundColor
//  div2.innerText=div2.style.backgroundColor
//  div3.innerText=div3.style.backgroundColor

//     }

//  }

// let numer = 4;

// if (number > 3 && numer < 5) {
//     console.log("heloo");
//     return
// }

// // else if (number > 5) {
//   console.log("bye");

//const firstNumber="hai"
///const secondNumber=100
//function addSome(num1, num2) {
////if(typeof num1 !== "number" || typeof num2 !=="number" )  //cu if typof putem schimba din numar in scri
//{
   // console.log("error");
   // return 0;
// }
//     console.log(num1,num2)
//     console.log(num1+,num2)  //ce scri in conslo.log trebuie scrisa si in return
//     return num1 + num2;
// }
// //addSome(firstNumber+secondNumber ) //num1+num2 )

// const result = addSome(firstNumber + secondNumber);
// console.log(result)


// function cantitate(cantitate, crescut) {
//     return cantitate+crescut
// }
// console.loc(cantitate(1,3))  4

const produs = {
    greutate : 10,
    dimensiuni: 'mic'
}
function calcularetaxe(pret, tara, livrare, produs){

//daca este in exterior +10%
//daca livfare normal 0 expre +25$
//penreu fiecare kg +10$
//dimensiune obiect mic 0 mediu 10 mare 20
//pret mai mare de 1000 nu calculam tara si livrare
let pretfinal =pret 
    if (pret < 1000){
        
        if (tara !== "romania")
        {
            pretfinal=pretfinal=pretfinal/10
        }
        if (livrare == "expres") {
            pretfinal=pretfinal+25
        }
    
    }
    pretfinal = pretfinal + produs.greutate * 10
    if (produs.dimensiune == "mediu") {
        pretfinal=pretfinal+10
    }
    else if (produs.dimensiune == "mare"){
        pretfinal=pretfinal+20
    }

    return  pretfinal
}

console.log(calcularetaxe(7700, "italia", "regulat", produs))
//functie completa de refacut exemplu de mai mjulte ori 