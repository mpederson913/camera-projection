// make express available
const express = require('express');
//turn on express
const app = express();
// make a server to handle TCP connections and use the app (our express instance) to handle endpoints (/) and requests
const server = require('http').Server( app )

// make socket io available
const io = require('socket.io')(server);
const fs = require('fs'); //use the file system so we can save files
const multer  = require('multer') //use multer to upload blob data
const upload = multer(); // set multer to be the upload variable (just like express, see above ( include it, then use it/set it up))


//serve out files in our public_html folder
app.use(express.static('public_html'))


//listening for the post from the client
app.post('/upload', upload.single('imageBlob'), function (req, res, next) {
  // console.log(req.body); // see what got uploaded

  //takes the blob (all the text data) and chops the first bit off which is an indicator of the kind of data it is
  // our bata is something called base64
  var base64Data = req.body.imageBlob.replace(/^data:image\/png;base64,/, "");

//set the location and filename of our uploaded files, filename is how many milliseconds have passed since january 1 1970.
  // __dirname is the place on the server where this file (server.js) exists (helpful for relative file paths!)
  // concating a string – adding pieces of strings together to make a full piece of text
  let uploadLocation = __dirname + '/public_html/projection/uploads/' + Date.now() + '.png'  // where to save the file to. make sure the incoming name has a .wav extension
  // console.log(uploadLocation);
  // actually saves / wrutes the file to the server at our location, using our data, with a base64 ending type to covert it to a real file!
  fs.writeFile(uploadLocation, base64Data , 'base64', function(err) {
    console.error(err);
  });

  //send an all good message back to the client.
  res.sendStatus(200); //send back that everything went ok

})







// turn on our server so it can recieve requests.
server.listen(3000, function(){
  console.log('app is listening on port 3000!');
  console.log('so cool!');
})
