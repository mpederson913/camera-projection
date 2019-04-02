let socket = io.connect();

// Set constraints for the video stream
var constraints = { video: { facingMode: "environment" }, audio: false };
// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger")
// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
    })
    .catch(function(error) {
        console.error("Oops. Something is broken.", error);
    });
}
// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {

    //show indetermanite loader
    $('.loader').show();

    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("overlay");


    var formData = new FormData();
    formData.append('imageBlob', cameraSensor.toDataURL()) ; // append the sound blob and the name of the file. third argument will show up on the server as req.file.originalname

    // formData.append('hello', 'there')

    // console.log(formData.get('imageBlob'))
    // console.log(formData.get('hello'))

    jQuery.ajax({
    url: '/upload',
    data: formData,
    cache: false,
    contentType: false,
    processData: false,
    method: 'POST',
    type: 'POST', // For jQuery < 1.9
    success: function(data){
        // alert(data);
        console.log('image uploaded successfully')
        //This is where you can wipe the screen and do something else, or re-route to another page...
        window.location = "thank/"

      }
    });



};
// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);
