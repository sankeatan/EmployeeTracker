// Query database
conection.query('SELECT * FROM students', function (err, results) {
  console.log(results);
});