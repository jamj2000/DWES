// enctype="multipart/form-data"
const express = require('express');
const multer  = require('multer');
const path = require('path');
const upload = multer({ dest: 'uploads/' });
const app = express();

app.use(express.static( path.join( __dirname, 'uploads') ));

/** Show page with a form with a specific enctype */
app.get('/', (req, res, next) => {
  res.send(`<form method="POST" action="/" enctype="multipart/form-data">
  <input type="text" name="username" placeholder="username">
  <input type="file" name="archivo">
  <input type="submit">
</form>`);
});

/** Process POST request with a mutter's middleware */
app.post('/', upload.single('archivo'), function (req, res, next) {
  console.log(req.file);
  res.send(`<img src=${JSON.stringify(req.file.filename)} >`);
});

/** Run the app */
app.listen(3000);