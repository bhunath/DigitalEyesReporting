var take_snapshot_interval;
var track_hand_interval;
let captureBlink = false;
let captureCloseness=false;
let captureRedEye=false;
let enableForceLock=false;
let captureTouch = false;

const modelParams = {
  flipHorizontal: true,   // flip e.g for video
  imageScaleFactor: 0.75,  // reduce input image size for gains in speed.
  maxNumBoxes: 20,        // maximum number of boxes to detect
  iouThreshold: 0.5,      // ioU threshold for non-max suppression
  scoreThreshold: 0.80,    // confidence threshold for predictions.
};

let model;
let lastNotificationDate;

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
const video = document.getElementById('my_video');
handTrack.startVideo(video).then(status => {
  if(status){
    console.log("Video is attached with HandTrack");
  }
});
loadedHandtrack = handTrack.load(modelParams).then(lmodel=>{
  //console.log('Model Loaded');
  model = lmodel;
});

function trackHand(){

  if(model && captureTouch){
    if(Webcam){
      console.debug("Running Predictions")
      model.detect(video).then(predictions => {
      if(predictions){
          if(predictions.length > 0){
            let showNotification = true;
            if(showNotification){
              console.log(predictions);
              lastNotificationDate = new Date();
              console.log('Notification : '+ 'Please avoid touching face !!')
              storeTouch();
            }
          }
        }
      });
    }
  }
}


function take_snapshot() {
 // take snapshot and get image data
 Webcam.snap( function(data_uri) {
  if(captureBlink){
    //console.debug("Running Blink Monitor");
    sendImagetoServer(data_uri);
  }
  // display results in page style="display:NONE"
  document.getElementById('results').innerHTML =
  '<img id=\'img\' style="display:NONE" src="'+data_uri+'" width=\'400px\' height=\'350px\'/>';
  // Load the model.
  const img = document.getElementById('img');
  });
}

function storeTouch() {

  let xhr = new XMLHttpRequest();
  let url = '';
  let labelToShow = ''

  url = "http://localhost:8080/store_face_touch";
  labelToShow = 'Blink Count';


  // open a connection
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        // //console.log('touch stored')
    }
  };

  var user_info = JSON.stringify({ "user_id": 1 });
  xhr.send(user_info);
}

function callForceLockApi() {

  let xhr = new XMLHttpRequest();
  let url = '';
  let labelToShow = ''

  url = "http://localhost:8080/configure_force_lock";
  labelToShow = 'Blink Count';


  // open a connection
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        if(this.responseText == 'Started'){
          enableForceLock = true;
        }else{
          enableForceLock = false;
        }
        updateUI();
    }
  };
  let action = '';
  let timeInMinute = document.getElementById('forceLockSetting').value;
  if(enableForceLock){
    action='start'
  }else{
    action='stop'
  }
  var content = JSON.stringify({ "user_id": 1 , "action":action ,"time":timeInMinute });
  xhr.send(content);
}

function sendImagetoServer(imageData){
  ////console.log("Uploading Image");
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
          let response = JSON.parse(this.responseText)
          document.getElementById('blinkCount').innerHTML = '<b>Blink Count :</b>' +response.Blink_Count;
          document.getElementById('blinkMessage').innerHTML = '<b>'+response.Blink_Message+'</b>';
          if(response.Blink_Message){
            console.log('Notification : '+response.Blink_Message)
          }
      }
  };


  // Sending data with the request
  var user_info = JSON.stringify({ "user_id": 1 });
  var form = document.getElementById('myForm');
  var formData = new FormData(form);
  formData.append("file", imageData);
  formData.append("user_info",user_info);
  formData.append("closeness",captureCloseness);
  formData.append("redness",captureRedEye);
  xhr.send(formData);
}

function hideWebCam(){
  result = document.getElementById('results');
  result.style.display='NONE';
  //console.log(result);
}

function showWebCam(){
  result = document.getElementById('results');
  result.style.display='block';
  //console.log(result);
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
    //console.log('Stop is Called')
    monitorBlinkButton.innerHTML = 'Start';
    //clearInterval(take_snapshot_interval);
    // Creating a XHR object
  }
 }

 function monitorCloseness(){
   let closenessDetectionButton = document.getElementById('closenessDetection');
   let closenessDetectionStatusButton = document.getElementById('closenessDetectionStatus');
   let closenessDetectionLabel = closenessDetectionButton.innerHTML;
   if(!captureCloseness){
     captureCloseness = true;
     closenessDetectionButton.innerHTML = 'Disable';
     closenessDetectionStatusButton.innerHTML="Enabled"
   }else if(captureCloseness){
     captureCloseness = false;
     //console.log('Stop is Called')
     closenessDetectionButton.innerHTML = 'Enable';
     closenessDetectionStatusButton.innerHTML="Disabled"
   }
 }

 function monitorRedness(){
   let rednessDetectionButton = document.getElementById('rednessDetection');
   let rednessDetectionStatusButton = document.getElementById('rednessDetectionStatus');
   let rednessDetectionLabel = rednessDetectionButton.innerHTML;
   if(!captureRedEye){
     captureRedEye = true;
     rednessDetectionButton.innerHTML = 'Disable';
     rednessDetectionStatusButton.innerHTML="Enabled"
    }else if(captureRedEye){
     captureRedEye = false;
     //console.log('Stop is Called')
     rednessDetectionButton.innerHTML = 'Enable';
     rednessDetectionStatusButton.innerHTML="Disabled"
   }
 }

 function forceLockAction(){
   let forceLockButton = document.getElementById('forceLock');
   let forceLockStatusButton = document.getElementById('forceLockStatus');
   let forceLockLabel = forceLockButton.innerHTML;
   if(!enableForceLock){
     enableForceLock = true;
     callForceLockApi();
    }else if(enableForceLock){
     enableForceLock = false;
     callForceLockApi();
   }
 }

 function updateUI(){
   let forceLockButton = document.getElementById('forceLock');
   let forceLockStatusButton = document.getElementById('forceLockStatus');
   let forceLockLabel = forceLockButton.innerHTML;
   if(enableForceLock){
     forceLockButton.innerHTML = 'Stop';
     forceLockStatusButton.innerHTML="Started"
   }else if(!enableForceLock){
     forceLockButton.innerHTML = 'Start';
     forceLockStatusButton.innerHTML="Stopped"
   }
 }

 function monitorTouch(){
   if(!track_hand_interval){
     track_hand_interval = setInterval(trackHand,1000);
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
     //console.log('Stop is Called')
     monitorTouchButton.innerHTML = 'Start';
     monitorTouchStatus.innerHTML = 'Stopped'
     clearInterval(track_hand_interval);
     // Creating a XHR object
   }
 }


 function senstivityUpdate(){
   var slider = document.getElementById("senstivity");
   precisionValue = slider.value/100;
   modelParams.scoreThreshold = precisionValue;
   loadedHandtrack = handTrack.load(modelParams).then(lmodel=>{
     //console.log('Model Loaded');
     model = lmodel;
   });
 }
