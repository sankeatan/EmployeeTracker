const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Query database
conection.query('SELECT * FROM students', function (err, results) {
  console.log(results);
});