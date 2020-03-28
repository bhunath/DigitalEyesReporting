let timer = 5

function addImage(){
  while (timer >=0) {
    if (true || video.loadedmetadata) {
      hrithik="hrithik"+timer+'.jfif';
      dog="dog"+timer+'.jfif';
      console.log(hrithik);
      if(timer >= 0){
        hrithikImage=createImg('images/hrithik/'+hrithik);
        hrithikImage.hide();
        console.log("OpenEye",hrithikImage);
        classifier.addImage(hrithikImage,'OpenEye',imageAdded);

        dogImage=createImg('images/dog/'+dog);
        dogImage.hide();
        console.log('CloseEye',dogImage)
        classifier.addImage(dogImage,'CloseEye',imageAdded);
      }
    }
    timer--;
  }
}

function recordEyeImages(label){
  classifier.addImage(label);
}

function imageAdded(err,res){
  if(err !=null){
      console.log('Error');
  }else{
    console.log('Image Added',res);
  }
}

function testFunction(){
  console.log("Inside Timer Js");
}

// let capture;
//
// function setup() {
//   createCanvas(640, 480);
//   capture = createCapture(VIDEO);
// }
// function draw() {
//   background(0);
//   if (capture.loadedmetadata) {
//     let c = capture.get(0, 0, width, height);
//     image(c, 0, 0);
//   }
// }
