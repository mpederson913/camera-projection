let socket = io.connect();

// you're going to need to do this every time someone take a picture or on a timer for update.
socket.emit('getTotalFiles')

//iif you want to do this everytime someone takes a pic, you'll need to make some new socket messages to do it. check out this file and the class example.


socket.on('newPic', function(fileName){

  $('.imageGrid').append('<img src="uploads/' + fileName + '">')

})

socket.on('queryFiles', function(files){

  console.log(files);


  ///look at the files list (array) and loop through is one by one, getting the index for each file.
  for( index in files){

    //if(){then} conditional logic in JS

    //how many files are there?
    // console.log(files.length)

    // then, use the index of this file, to get out the filename from the list
    // console.log( files[index] )

    //another idea if you want more flexibility in jquery before appending it to the page, to add custom CSS or something.
    // $(`<img src="uploads/${files[index]}">`).appendTo('.imageGrid')

    //this is a template literal way of doing things, look up template literals!
    // $('.imageGrid').append(`<img src="uploads/${files[index]}">`)

    //concating a string
    $('.imageGrid').append('<img src="uploads/' + files[index] + '">')


  }




})
