var take_snapshot_interval;
let captureBlink = false;
let captureTouch = false;

const modelParams = {
  flipHorizontal: true,   // flip e.g for video
  imageScaleFactor: 0.5,  // reduce input image size for gains in speed.
  maxNumBoxes: 20,        // maximum number of boxes to detect
  iouThreshold: 0.5,      // ioU threshold for non-max suppression
  scoreThreshold: 0.50,    // confidence threshold for predictions.
};

let model;

var audio = document.getElementById('audio');
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
console.log(audio,canvas,context);

loadedHandtrack = handTrack.load(modelParams).then(lmodel=>{
  console.log('Model Loaded');
  model = lmodel;
});


function take_snapshot() {
 // take snapshot and get image data
 Webcam.snap( function(data_uri) {
  if(captureBlink){
    console.debug("Running Blink Monitor");
    sendImagetoServer(data_uri);
  }
  // display results in page
  document.getElementById('results').innerHTML =
  '<img id=\'img\' style="display:NONE" src="'+data_uri+'" width=\'400px\' height=\'350px\'/>';
  // Load the model.
  const img = document.getElementById('img');
  console.debug("Running Predictions",img,model)
  if(model && captureTouch){
    if(img){
        console.debug("Running Predictions")
        model.detect(img).then(predictions => {
            if(predictions){
              console.debug('Predictions: ', predictions);
              if(predictions.length > 0){
                model.renderPredictions(predictions,canvas,context,img);
                audio.play();
              }else{
                audio.pause();
              }
            }
          });
        }
      }
  });
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

function hideWebCam(){
  result = document.getElementById('results');
  result.style.display='NONE';
  console.log(result);
}

function showWebCam(){
  result = document.getElementById('results');
  result.style.display='block';
  console.log(result);
}

function monitorBlink(){
  if(!take_snapshot_interval){
    take_snapshot_interval = setInterval(take_snapshot,100);
  }
  var monitorBlinkButton = document.getElementById('btnBlinkDetector');
  var monitorBlinkLabel = monitorBlinkButton.innerHTML;
  if(!captureBlink){
    captureBlink = true;
    //showWebCam();
    monitorBlinkButton.innerHTML = 'Stop';
    captureBlink = true;
  }else if(captureBlink){
    //hideWebCam();
    captureBlink = false;
    console.log('Stop is Called')
    monitorBlinkButton.innerHTML = 'Start';
    //clearInterval(take_snapshot_interval);
    // Creating a XHR object
  }
 }

 function monitorTouch(){
   if(!take_snapshot_interval){
     take_snapshot_interval = setInterval(take_snapshot,100);
   }
   var monitorTouchButton = document.getElementById('btnMonitorTouch');
   var monitorTouchStatus = document.getElementById('touchMonitorStatus');
   var touchStatus = '';
   if(!captureTouch){
     //showWebCam();
     monitorTouchButton.innerHTML = 'Stop';
     monitorTouchStatus.innerHTML = 'Started';
     captureTouch = true;
   }else if(captureTouch){
     //hideWebCam();
     captureTouch = false;
     console.log('Stop is Called')
     monitorTouchButton.innerHTML = 'Start';
     monitorTouchStatus.innerHTML = 'Stopped'
     //clearInterval(take_snapshot_interval);
     // Creating a XHR object
   }
 }
