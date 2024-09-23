

// Do it yourself 2
// Create a program in node that writes asynchronously to a file named
// test.txt with your city and country .
// 1






let fs = require('fs');


let city = 'Paris';
let country = 'France';


fs.writeFile('test.txt', `City: ${city}\nCountry: ${country}`, (err) => {
  if (err) {
    return console.error('Error writing to file:', err);
  }
  console.log('Data written to test.txt asynchronously');
});
