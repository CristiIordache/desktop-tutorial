// Do it yourself 1
// Create a program in node that writes synchronously to a file named
// test.txt with your city and country name

let fs = require('fs');


let city = 'Paris';
let country = 'France';


try {
  fs.writeFileSync('test.txt', `City: ${city}\nCountry: ${country}`);
  console.log('Data written to test.txt');
} catch (err) {
  console.error('Error writing to file:', err);
}




