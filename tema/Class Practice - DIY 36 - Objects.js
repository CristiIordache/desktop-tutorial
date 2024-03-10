function Person(firstname, lastname, age) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.age = age;
}


let p1 = new Person("Michael", "Jordan", 49);
let p2 = new Person("Lara", "Bili", 74);


console.log("Instance p1:", p1);
console.log("Instance p2:", p2);