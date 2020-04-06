var video = document.querySelector("#videoElement");
var count = 1;

function sendImagetoServer(imageData){
  console.log("Uploading Image");
  // Creating a XHR object
  let xhr = new XMLHttpRequest();
  let url = "http://localhost:8080/uploadImage";

  // open a connection
  xhr.open("POST", url, true);

  // Set the request header i.e. which type of content you are sending
  //xhr.setRequestHeader("Content-Type", "image/png");
  //xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("enctype", "multipart/form-data");

  // Create a state change callback
  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {

          // Print received data from server
          console.log(this.responseText)

      }
  };


  // Sending data with the request
  var data = JSON.stringify({ "user_id": 1 });
  var form = document.getElementById('myForm');
  console.log(form);
  var formData = new FormData(form);
  formData.append("file", imageData);
  xhr.send(formData);
  //console.log("Uploading Image Done");
}


function captureFrame(){
  const cnv = document.createElement('canvas');
  ctx = cnv.getContext('2d');
  ctx.drawImage(video,0,0);
  let data = cnv.toDataURL('image/jpeg',1);
  var img = document.getElementById('captureImage');
  img.src = data;
  //sendImagetoServer(data);

}

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream;
      console.log('setting source');
      setInterval(captureFrame,1);
    })
    .catch(function (err0r) {
      console.log("Something went wrong!");
    });
}
