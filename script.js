var image=null;
var grayImg=null;
var redImg=null;
var sketchImg=null;
var rainImg=null;
var blurImg=null;
var grayImgCreated = false;
var redImgCreated = false;
var sketchImgCreated = false;
var rainImgCreated = false;
var blurImgCreated = false;
var canvas=document.getElementById("can1");
function upload(){
 var fileinput= document.getElementById("finput");
 image = new SimpleImage(fileinput);
 grayImg = new SimpleImage(fileinput);
 grayImgCreated=false;
 redImg = new SimpleImage(fileinput);
 redImgCreated=false;
 sketchImg = new SimpleImage(fileinput);
 sketchImgCreated=false;
 rainImg = new SimpleImage(fileinput);
 rainImgCreated=false;
 blurImg = new SimpleImage(fileinput);
 blurImgCreated=false;
 image.drawTo(canvas);
}

function makeGray(){
  if(imageIsLoaded()){
    if(!grayImgCreated){
      filterGray();
    }
    grayImg.drawTo(canvas);
  }
}
function filterGray(){
  for(var pixel of grayImg.values()){
    var avg=(pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
    pixel.setRed(avg);
    pixel.setGreen(avg);
    pixel.setBlue(avg);
  }
  grayImgCreated=true;
}

function makeRed(){
  if(imageIsLoaded()){
    if(!redImgCreated){
      filterRed();
    }
    redImg.drawTo(canvas);
  }
}
function filterRed(){
  for(var pixel of redImg.values()){
    var avg=(pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
    if(avg<128){
      pixel.setRed(2*avg);
      pixel.setGreen(0);
      pixel.setBlue(0);
    }
    else{
      pixel.setRed(255);
      pixel.setGreen((2*avg)-255);
      pixel.setBlue((2*avg)-255);
    }
  }
  redImgCreated=true;
}
function makeSketch(){
  if(imageIsLoaded()){
    if(!sketchImgCreated){
      filterSketch();
    }
    sketchImg.drawTo(canvas);
  }
}
function filterSketch(){
  for(var pixel of sketchImg.values()){
    var avg=(pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
    if(avg<128){
      pixel.setRed(avg*0.8);
      pixel.setGreen(avg*0.6);
      pixel.setBlue(avg*0.4);
    }
    else{
      pixel.setRed(avg*1.2+112);
      pixel.setGreen(avg*1.4+66);
      pixel.setBlue(avg*1.6+20);
    }
  }
  sketchImgCreated=true;
}

function makeRainbow(){
  if(imageIsLoaded()){
    if(!rainImgCreated){
      filterRainbow();
    }
    rainImg.drawTo(canvas);
  }
}
function filterRainbow(){
  var avg=0;
  var height = rainImg.getHeight();
  for (var pixel of rainImg.values()) {
    //red
    if (pixel.getY() < height / 7){
        avg=(pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
        if(avg<128){
          pixel.setRed(2*avg);
          pixel.setGreen(0);
          pixel.setBlue(0);
        }
        else{
          pixel.setRed(255);
          pixel.setGreen((2*avg)-255);
          pixel.setBlue((2*avg)-255);
        }
    }
    //orange
    else if (pixel.getY() < (height * 2) / 7){
      avg=(pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
      if (avg < 128) {
        pixel.setRed(avg * 2);
        pixel.setGreen(avg * 0.8);
        pixel.setBlue(0);
      } 
      else {
        pixel.setRed(255);
        pixel.setGreen(avg * 1.2 - 51);
        pixel.setBlue(avg * 2 - 255);
      }
    }
    //yellow
    else if (pixel.getY() < (height * 3) / 7){
     avg=(pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
     if (avg < 128) {
        pixel.setRed(avg * 2);
        pixel.setGreen(avg * 2);
        pixel.setBlue(0);
      } 
      else {
        pixel.setRed(255);
        pixel.setGreen(255);
        pixel.setBlue(avg * 2 - 255);
      }
    }
    //green
    else if (pixel.getY() < (height * 4) / 7){
      avg=(pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
      if (avg < 128) {
        pixel.setRed(0);
        pixel.setGreen(avg * 2);
        pixel.setBlue(0);
      } 
      else {
        pixel.setRed(avg*2-255);
        pixel.setGreen(255);
        pixel.setBlue(avg * 2 - 255);
      }
    }
    //blue
    else if (pixel.getY() < (height * 5) / 7){
      avg=(pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
      if (avg < 128) {
        pixel.setRed(0);
        pixel.setGreen(0);
        pixel.setBlue(avg*2);
      } 
      else {
        pixel.setRed(avg * 2 - 255);
        pixel.setGreen(avg * 2 - 255);
        pixel.setBlue(255);
      }
    }
    //indigo
    else if (pixel.getY() < (height * 6) / 7){
      avg=(pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
      if (avg < 128) {
        pixel.setRed(avg * 0.8);
        pixel.setGreen(0);
        pixel.setBlue(avg * 2);
      } 
      else {
        pixel.setRed(avg * 1.2 - 51);
        pixel.setGreen(avg * 2 - 255);
        pixel.setBlue(255);
      }
    }
    //violet
    else{
      avg=(pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
      if (avg < 128) {
        pixel.setRed(avg * 1.6);
        pixel.setGreen(0);
        pixel.setBlue(avg * 1.6);
      } 
      else {
        pixel.setRed(avg*0.4+153);
        pixel.setGreen(avg * 2 - 255);
        pixel.setBlue(avg*0.4+153);
      }
    }
  }
  rainImgCreated = true;
}

function makeBlur(){
  if(imageIsLoaded()){
    if(!blurImgCreated){
      filterBlur();
    }
    blurImg.drawTo(canvas);
  }
}
function filterBlur(){
  for(var pixel of image.values()){
    var x = pixel.getX();
    var y = pixel.getY();
    var randomX = x + Math.floor(Math.random()*11);
    var randomY = y + Math.floor(Math.random()*11);
    var w = image.getWidth();
    var h = image.getHeight();
    var randomNum = Math.random(); 
    if(randomNum < 0.5){
        blurImg.setPixel(x,y,pixel);
    }
    else{
        if(randomX >= w){
            randomX = randomX-10;
        }
        if(randomY >= h){
            randomY = randomY-10;
        }
        var randomPixel = image.getPixel(randomX,randomY);
        blurImg.setPixel(x,y,randomPixel);
    }
    
  }
  blurImgCreated = true;
}
function reset(){
  if(imageIsLoaded()){
    image.drawTo(canvas);
  }
}

function imageIsLoaded(){
  if((image==null)||(!image.complete())){
    alert("Image not uploaded!!");
    return false;
  }
  else{
    return true;
  }
}