//CAPNGANJ Rule 110 gets down with some d3 colors
//May, 2022

//imports
import p5 from 'p5';
import { Features } from './features';
import { CA } from './ca';

//p5 sketch instance
const s = ( sk ) => {

  //global sketch variables
  let oneTen = {};
  let col = {};
  let hyp = -1.0;
  let feet = {};

  //sketch setup
  sk.setup = () => {
    sk.createCanvas(sk.windowWidth, sk.windowHeight);
    sk.background(0);

    //new featuresClass
    feet = new Features();
    col = feet.interpolateFn(fxrand());

    //CA 
    oneTen = new CA(sk, feet);
    //color drives palette
    //depth drives number of recursive draw cloud layers
    //cough drives initial circle radius size
    //squint drives smallest circle radius size
    //laugh drives how far the could spreads out from the center 
   
    // FX Features
    window.$fxhashFeatures = {
      "Palette" : feet.color.name,
      "Cell Width": feet.cellWidth.tag,
    };
    console.log("fxhashFeatures", window.$fxhashFeatures);
    //console.log("HashSmokeFeatures", feet);
  };


  //sketch draw function 
  sk.draw = () => {

    //TO DO - set the background color.  This should be a desaturated inverse color average of the colors in the d3 color scheme
    //sk.background(0);
    //sk.noStroke();
    

    oneTen.draw();
    if (oneTen.generation < sk.height/oneTen.w) {
      oneTen.generate()
    }

  };

  

  //handle window resize
  sk.windowResized = () => {
    sk.resizeCanvas(sk.windowWidth, sk.windowHeight);
    console.log("windowWidth", sk.windowWidth);
    console.log("width", sk.width);

  };
};

//pass our sketch to p5js
let myp5 = new p5(s);