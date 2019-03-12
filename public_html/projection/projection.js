var fs = require('fs');
var files = fs.readdirSync('/public_html/projection/uploads/')
/* now files is an Array of the name of the files in the folder and you can pick a random name inside of that array */
let chosenFile = files[Math.floor(Math.random() * files.length)] 
