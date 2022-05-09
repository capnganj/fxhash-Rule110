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
  let feet = {};

  //sketch setup
  sk.setup = () => {
    sk.createCanvas(sk.windowWidth, sk.windowHeight);
    

    //new featuresClass
    feet = new Features();

    //CA 
    oneTen = new CA(sk, feet);
   
    // FX Features
    window.$fxhashFeatures = {
      "Palette" : feet.color.name,
      "Cell Size": feet.cellWidth.tag,
      "CA Rule": feet.rule.toString()
    };
    console.log("fxhashFeatures", window.$fxhashFeatures);
    //console.log("HashSmokeFeatures", feet);

    //set the background color 
    let col = feet.color.cero;
    sk.background(col.r, col.g, col.b);
  };


  //sketch draw function 
  sk.draw = () => {
    oneTen.draw();
    if (oneTen.generation < sk.height/oneTen.w) {
      oneTen.generate()
    }
  };

  

  //handle window resize
  sk.windowResized = () => {
    sk.resizeCanvas(sk.windowWidth, sk.windowHeight);

    //redraw the CA -- 0 out the object's state and let it rip again
    oneTen.populateCellsUsingSeed();
    //console.log("windowWidth", sk.windowWidth);
    //console.log("width", sk.width);
  };
};

//pass our sketch to p5js
let myp5 = new p5(s);