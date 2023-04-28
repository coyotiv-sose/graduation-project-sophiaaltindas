const mongoose = require('mongoose')
console.log(process.env.MONGODB_CONNECTION_STRING, 'process.env.MONGODB_CONNECTION_STRING')
mongoose
  .connect('mongodb+srv://sophiaaltindas:SpringValley@my-cluster.jzd3dmo.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('Connected to MongoDB', process.env.MONGODB_CONNECTION_STRING))
  .catch(err => console.log('Could not connect to MongoDB', err))
