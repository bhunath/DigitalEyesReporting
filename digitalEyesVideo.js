let video;
let mobileNet;
let classifier;
let openEyeHistory=[];
let openImages = 0;
let closeImages = 0;
let noEyeImages = 0;

function setup(){
  canvas=createCanvas(640,480);
  video=createCapture(VIDEO);
  video.hide();
  background(0);
  mobileNet=ml5.featureExtractor('MobileNet',modelReady);
  classifier=mobileNet.classification(video,videoReady);
  setupButtons();
}

function modelTrained(err,loss){
  if(err != null){
    console.log(err)
  }else{
    console.log(loss);
    if(loss == null){
      classifier.classify(gotResult);
    }
  }
}

function gotResult(err,result){
  if(err != null){
    console.log(err);
  }else{

    let label=result[0].label;
    fill(0);
    textSize(64);
    text(label,10,height-35);
    if("CLoseEye" == label){
      var openTime = openEyeHistory[0];
      console.log("Open Eye ",openTime);
      if(typeof openTime !== "undefined"){
        storeBlinkStat(1,openTime,Date.now());
        openEyeHistory = [];
      }
    }else{
        openEyeHistory.push(Date.now());
        if(openEyeHistory.length%50 == 0){
          //alert("Please blink");
          console.log('Open Eye for last 50 sec');
        }
    }

    classifier.classify(gotResult);
  }
}

function draw(){
  image(video,0,0,width,height-40);
}

function modelReady(err,res){
  console.group();
  if(err == null){
    console.log(' ----> Model is Ready');
    //addImage();
  }else{
    console.error(err);
  }
}

function videoReady(err,res){
  if(err == null){
    console.log('Video is Ready');
  }else{
    console.error(err);
  }
  console.groupEnd();
}


// A util function to create UI buttons
function setupButtons() {
  // When the Cat button is pressed, add the current frame
  // from the video with a label of "cat" to the classifier
  buttonA = select('#openEye');
  buttonA.mousePressed(function() {
    console.log('Open Eye Image getting captured');
    recordEyeImages('OpenEye');
    select('#amountOfOpenImages').html(++openImages);
  });

  // When the Dog button is pressed, add the current frame
  // from the video with a label of "dog" to the classifier
  buttonB = select('#closeEye');
  buttonB.mousePressed(function() {
    console.log('Close Eye Image getting captured');
    recordEyeImages('CLoseEye');
    select('#amountOfCloseImages').html(++closeImages);
  });

  buttonC = select('#noEye');
  buttonC.mousePressed(function() {
    recordEyeImages('NoEye');
    console.log('No Eye Image getting captured');
    select('#amountOfNoEyeImages').html(++noEyeImages);
  });

  // Train Button
  train = select('#train');
  train.mousePressed(function() {
    classifier.train(function(lossValue) {
      if (lossValue) {
        loss = lossValue;
        select('#loss').html('Loss: ' + loss);
      } else {
        select('#loss').html('Done Training! Final Loss: ' + loss);
        console.log('Start Application');
        classifier.classify(gotResult);
      }
    });
  });

}
