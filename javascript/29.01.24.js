

























// varianta 1

// let car = new Object()
// car.make = `Mazda`
// car.year = 2024
// car.color = `red`


// console.log(car.make)


// varianta 2
// let car = {
//     make: `Mazda`,
//     year: 2024
//     color:red



// }console.log(car)


// let keys = Object.keys(car)
// let values = Object.values(car)

// console.log(keys)
// console.log(values)

//constructor face schema
// function Car(make.year, color)
// {
//     this.make = make
//     this.year=year
//     this.color = color
//     this.printInfi = () => {
//     console.log(`${this.make},${this.year},${this.color}`)
// }
// this.addYear = () => {
//     this.year=this.year+1
//     return this.year
// }


//     //this este denumidea functi ca sa nu scrti tot cuvantul
// }

// let Mazda = new Car(`Mazda`, 2023, `red`)
// let Dacia = new Car(`Dacia`, 2023, `white`)


// let primul={
//     price: 400
//     color`blck`
// }

// function primul2(price,color)
// {
//     this.price = price
//     this.color=color

// }
// let a = new primul(300, blue)
// let b = new primul(200, red)

// let inputName=document.getElementById('name');
// console.log(inputName);
// let inputByClass = document.getElementsByClassName('test')
// console.log(inputByClass);
// let inputByTag=document.getElementsByTagName('input');
// console.log(inputByTag);

// sa selectezi clasa este .
// select id #
// select tag  este nimic
// let element = document.querySelector(`.name`)

// selectoru de mai jos selecteaza totul
// let element = document.querySelectorAll(`input`)


// let element = document.querySelector(`#table`)


// element.value = "hello"


// console.log(element)


// let rows = table.queySelector(`td`)
// console.log(rows[0].innerText)
// console.log(rows[0].innerText)

// console.log(rows)


// let newp = document.createElement(`p`)
// newp.innerText = `text in p`
// document.body.appendChild(newp)

// appendChild este sa scrie didect in fisier la sfarsit folosind formula de sus 
// let h = document.querySelector(`h1`)
// h.appendChild(newp)



// function show() {
//     let h = document.querySelector(`h1`)
//     h.classList.remove(`hidden`)

// }
// function hidden() {
//     let h = document.querySelector(`h1`)
//     h.classList.add(`hidden`)

// }



// function h() {
//     let tabel2 = document.querySelector(`#tabe12`)
//     if (!tabel2) {
        
    
//         let people = [{
//             name: 'Tiberiu'
//         },
//         {
//             name: 'Cristian'
//         },
//         {
//             name: 'George'
//         },
//         {
//             name: 'Marina'
//         },
//         {
//             name: 'Paula'
//         }]
    
//         let tabel = document.createElement(`table`)
//         tabel2.id="h"
//         for (let i = 0; i < people.length; i++) {
//             let tr = document.createElement(`tr`)
//             let td = document.createElement(`td`)

//             td.innerText = people[i].name
//             tr.appendChild(td)
//             tabel.appendChild(tr)


//         }
 
//         document.body.appendChild(tabel)
//  }  
// }





