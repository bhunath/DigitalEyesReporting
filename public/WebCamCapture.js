var take_snapshot_interval;
function take_snapshot() {

 // take snapshot and get image data
 Webcam.snap( function(data_uri) {
  sendImagetoServer(data_uri);
  // display results in page
  document.getElementById('results').innerHTML =
  '<img src="'+data_uri+'"/>';
  } );
}


function sendImagetoServer(imageData){
  //console.log("Uploading Image");
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

          document.getElementById('blinkCount').innerHTML = this.responseText;

      }
  };


  // Sending data with the request
  var user_info = JSON.stringify({ "user_id": 1 });
  var form = document.getElementById('myForm');
  var formData = new FormData(form);
  formData.append("file", imageData);
  formData.append("user_info",user_info);
  xhr.send(formData);
}

function monitorBlink(){
  var monitorBlinkButton = document.getElementById('monitorBlink');
  var monitorBlinkLabel = monitorBlinkButton.innerHTML;
  if('Capture Blink' == monitorBlinkLabel){
    monitorBlinkButton.innerHTML = 'Stop Monitor';
    take_snapshot_interval = setInterval(take_snapshot,100);
  }else if('Stop Monitor' == monitorBlinkLabel){
    console.log('Stop is Called',take_snapshot_interval)
    monitorBlinkButton.innerHTML = 'Capture Blink';
    clearInterval(take_snapshot_interval);
    // Creating a XHR object
    let xhr = new XMLHttpRequest();
    let url = "http://localhost:8080/stop_capturing";
    // open a connection
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          console.log("Python Writer is close")
        }
      };
    xhr.send();
  }

}
