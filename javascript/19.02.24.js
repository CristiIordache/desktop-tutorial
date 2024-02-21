// let people = {
//   names: [
//     ["a", "b", "c", "d"],
//     ["e", "f", "g", "h"],
//   ],
// };
// let [a, b] = [...people1.name];
// console.log(a);
// console.log(b);
// const allPeople = [...a, ...b];

// for (let person of allPeople) {
//     console.log(person);
//   }

// cu acesta putem sa inlocuiem for veci si entries intoarce aray  si [] declara un aray
//nu se poate parcurce invers
// for (let[indexperson] of allPeople.entries) {
//     console.log(person);
//     console.log(index)
//   }

// let people2 = {
//     name: "cristi",
//     city: " w " ,

// };
// const proertise = Object.keys(people2)
// console.log(proertise)
// const values = Object.values(people2)
// console.log(values)

// let set1 = new Set();
// set1.add(1)
// set1.add(10)
//has este daca are , size cate obiecte are in ele , delete ca sa putem sterge
// set1.has(set1.has(1))

// map

// const map1 = new Map()
// map1.set(`name`, `cristi`)
// map1.set(`name`, `cris`)

// let arr = [4, 5, 8, 6,13,100,57,88];
// let arr2 = arr.map((x) => x * 2);
// let arr3 = arr.map((x) => {
//   x = x * 2;
//   x = x + 1;
//   return x;
// });
// console.log(arr2);
// console.log(arr3);

// let resultat = arr.filter((x) =>  x % 3 == 0);
// console.log(resultat)

// let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
// let resultat = arr.filter(isPrime);
// function isPrime(x) {
//   for (let i = 2; i < x; i++) {
//     if (x % i == 0) {
//       return false;
//     }
//   }
//   return x>=1;
// }
// console.log(resultat)

// let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,Infinity,"cris"];
// let rezultat = arr.reduce((a, b) => a + b);
// console.log(rezultat);
// let getmax=(a,b)=>Math.max(a,b)
// let rezultat2 = arr.reduce(getmax, 5)
// console.log(rezultat2)

// let rezultat = arr.find(x => x =="cris" )
// console.log(rezultat)

// let arr = [{ name: "Cris" }, { name: "Cris2" }];
// let arrt = [1, 2, 3, 4, 5, 6, 7];
// let test = arrt.findIndex((x) => x == 2);
// console.log(test);

// let name = arr.findIndex((x) => x.name == "Cris2");
// console.log(name);

//some


// let some = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,Infinity].some(x => x == 44)
// console.log(some)
// let arr = [{ name: "Cris" }, { name: "Cris2" }].some(x => x.name == "Cris")
// console.log(arr)


//evry


// let arry = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, Infinity]
// let every = arry.every(x => x >= 0)

// console.log(every)











