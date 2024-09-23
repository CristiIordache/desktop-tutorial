// Do it yourself 1 - Build A Server Using Express
// 1
// Create a server that responds to the following requests:
// Request Response Method
// localhost:3000/api/name Your full name get
// localhost:3000/students/number Random Number
// between 0 to 100
// get
// localhost:3000/courses/n1ton2 Random Number
// between 1000 to 2000
// Post





const express = require('express');
const app = express();


app.use(express.json());


app.get('/api/name', (req, res) => {
  res.send('Your full name: John Doe');
});


app.get('/students/number', (req, res) => {
  const randomNumber = Math.floor(Math.random() * 101); 
  res.send(`Random Student Number: ${randomNumber}`);
});


app.post('/courses/n1ton2', (req, res) => {
  const randomCourseNumber = Math.floor(Math.random() * 1001) + 1000; 
  res.send(`Random Course Number: ${randomCourseNumber}`);
});


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
