let picture;
let mobileNet;
let classifier;


function modelReady(err,res){
  console.group();
  console.log('Model Ready');
}


function imageReady(err,res){
  if(err == null){
    console.log('Image Ready');
    console.groupEnd();
    image(picture,0,0,width,height);
  }
}


function setup(){
  createCanvas(640,480);
  picture=createImg("images/digitalEyes.jfif",imageReady);
  picture.hide();
  background(0);
  mobileNet=ml5.featureExtractor('MobileNet',modelReady);
  classifier=mobileNet.classification(picture);
}
