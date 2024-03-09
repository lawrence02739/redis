const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/user.route');
const connectDB = require('./src/config/mongoDb');

const app = express();

app.use(bodyParser.json());
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => console.log(err));

