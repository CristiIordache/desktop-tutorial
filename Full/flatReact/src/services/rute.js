// Ex: Backend routes (Express.js)
app.post('/api/login', loginController);
app.post('/api/register', registerController);
app.get('/api/flats', getFlatsController);
app.post('/api/flats', createFlatController);
app.put('/api/flats/:id', updateFlatController);
app.delete('/api/flats/:id', deleteFlatController);
app.get('/api/users', getUsersController);
  