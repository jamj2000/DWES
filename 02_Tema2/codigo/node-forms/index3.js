//  enctype="application/json"  
const express = require('express');
const app = express();

/** Decode JSON data */
app.use(express.json());

/** Show page with a input field, button and javascript */
app.get('/', (req, res, next) => {
  res.send(`
<script>
var send = function() {
  var username = document.getElementById('username').value;
  
  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify( { username: username } )
  })
    .then(response => response.json())
    .then(data => console.log(data) )
    .catch(console.error);
}   
</script>

<input type="text" name="username" placeholder="username" id="username">
<button onclick="send()">Send</button>`);
});

/** Process POST request */
app.post('/', function (req, res, next) {
  res.send(JSON.stringify(req.body));
});

/** Run the app */
app.listen(3000);