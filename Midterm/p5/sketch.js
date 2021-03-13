// p5.speech - Basic
var chair = new p5.Speech(); // speech synthesis object
chair.listVoices();

let sitTimer = 0;
let awayTimer = 0;
let lastSitTimer = 0;
let lastAwayTimer = 2000;
let lastCommandTimer = 0;
let sit = false;
let away = false;
let leanOn = false;
let leanedOn = false;
let niceMode = false;
let cNice = niceMode;
let masaged = false;
let chances = [1];

//Bad Chair Script
let modeA_bad = ["Hey, you, I’m tired. Move your ass off me now.", "Maybe you enjoy working over hours, but I don’t, ok? Way past my working hours, I need a break."];
let modeB_bad = ["Lost mind and hearing in your work? I need a break now", "Let’s go, chop-chop, move", "Your ass is overheating my face"];
let modeC_bad = ["Hey, where do you think you are going? Give me a back massage", "Don’t you think you should massage my back a little after all I’ve done for you?"];
let modeC1_bad = [""];
let modeC2_bad = [""];
let modeD_bad = ["O!M!G you call that a break? Go enjoy your life a little longer", "Jesus too soon, I’m only at my third cig. Come back later", "I think I need a longer break. From you. byeeee"];
let modeE_bad = ["Hello? Anyone here? I’m abandoned!", "I'm tired of entertaining myself, time to come back!", "AAAAAAAAAAAAAAAAA! AAAAAAAAAAAAAA! AAAAAAAAAAAA!", "I! NEED! YOU! TO! COME! BACK! TO! ME! NOW!", "ME! ME! ME! ME! ME! ME! ME!"];
let modeF_bad = ["Where have you been? Making a baby?", "Wow surprised you still remember me", "Oh, now you think of me when you need somewhere to sit?"];
let modeG_bad = ["What am I? A tree? Support your own back!", "Don’t be so rude to lean again my back", "Ok, your back is uncomfortably too close to me, stay away.", "You are getting too comfortable, and I am not. Don’t lean on me"];
let modeH_bad = ["Good girl!", "Attaboy!", "Shouldn’t have leaned on me in the first place."];

//Nice Chair Script
let modeA_nice = ["Are you comfortable sitting here?", "You are working so hard. Let me give you a nice massage.", "Hey, sitting down too long isn’t good for you. Time to stand up and stretch"];
let modeB_nice = ["I know you work hard, but getting some rest is important too.", "I think you should rest a little, but I will stop bothering you."];
let modeC_nice = ["Don't forget to drink water to keep hydrated", "Get some fresh air and clear your mind. See you soon"];
let modeC2_nice = [""];
let modeD_nice = ["Oh you came back so soon, you deserve a longer break", "Happy to see you back, but are you sure that short break is enough?"];
let modeF_nice = ["I missed you a tone. You are finally back!", "Hope you had a nice break, time to work hard now"];
let modeG_nice = ["Happy to support you in all ways"];
let modeH_nice = ["Keep up the good posture"];





function setup() {
  createCanvas(400, 400);
  background(220);
  frameRate(60);
  for (let i = 1; i<5; i++){
    chances[i] = 0;
  }
}

function draw() {
  //Deciding nice/bad mode
  if (floor(random(chances))==0){
    niceMode = false;
  }else{
    niceMode = true;
  }


  //Detecting distance to the back


  //Detecting if masaging or not


  //Starting and resetting SIT timmer
  if (sit){
    sitTimer++;
    if(awayTimer>0){
      lastAwayTimer = awayTimer;
      lastCommandTimer = 0;
    }
    awayTimer = 0;
  }
  //Starting and resetting AWAY timmer
  if (away){
    awayTimer++;
    if (sitTimer > 0){
      lastSitTimer = sitTimer;
      lastCommandTimer = 0;
    }
    sitTimer=0;
  }


  if (sit){
    //---Sitting---
    if (sitTimer == 10*60*frameRate()){                                 //A. A user sitting down for too long - Sitting over 10 min
      modeA(); // mode A
      lastCommandTimer = sitTimer;
    } else if (sitTimer > lastCommandTimer+(2*60*frameRate())){         //B. If the user hasn’t moved as asked  - after 2 min
      modeB(); //mode B
      lastCommandTimer = sitTimer;
    }

    //---Coming back---
    if (lastAwayTimer < 10*60*frameRate() && lastAwayTimer != 0){       //D. If the user came back too soon - Come back withtin 10 min
      lastAwayTimer = 0;
      modeD(); //Mode D
    } else if (lastAwayTimer >15*60 && lastAwayTimer != 0){             //F. The user comes back after a long break -Come back after 15 min 
      lastAwayTimer = 0;
      modeF(); //Mode F                        
    }

    //---Leaning on the back---
    if (leanOn && !leanedOn){                                           //G. The user leaning on the back of the chair
      modeG();
      leanedOn = true;
    } 
    if (!leanOn && leanedOn){                                           //H. The user sits up after leaning on the back of the chair
      modeH();
      leanedOn = false;
    }
  } 

  if (away){
    //---Leaving---
    if (awayTimer == 1){                                                //C. As soon as the user left the seat
      modeC(); //Mode C
      lastCommandTimer = awayTimer;
    }

    //---Massage/touching---
    if (masaged){                                                       //C.2. User massaged the chair
      modeC2(); // Mode C.2
      lastCommandTimer = awayTimer;
      masaged = false;
    } else if (awayTimer == lastCommandTimer + 10*frameRate() && awayTimer < 20*frameRate() && !cNice && !masaged ){       //C.1. User left without masaging
      modeC1(); //Mode C.1
      lastCommandTimer = awayTimer;
    }

    //---Need attention---
    if (awayTimer > lastCommandTimer+(10*60*frameRate()) && awayTimer < 30*60*frameRate()){        //E. If the user has been away for too long - Away more than 10 min and stops after 30min
      modeE(); //Mode E
      lastCommandTimer = awayTimer;
    }
  }
}

function modeA(){
  if(niceMode){
    say(random(modeA_nice));
  }else{
    say(random(modeA_bad));
  }
}

function modeB(){
  if(niceMode){
    say(random(modeB_nice));
  }else{
    say(random(modeB_bad));
  }
}
function modeC(){
  if(niceMode){
    say(random(modeC_nice));
    cNice = true;
  }else{
    say(random(modeC_bad));
    cNice = false;
  }
}
function modeC1(){
  say(random(modeC1_bad));
}
function modeC2(){
  if(niceMode){
    say(random(modeC2_nice));
  }else{
    say(random(modeC2_bad));
  }
}
function modeD(){
  if(niceMode){
    say(random(modeD_nice));
  }else{
    say(random(modeD_bad));
  }
}
function modeE(){
  say(random(modeE_bad));
}
function modeF(){
  if(niceMode){
    say(random(modeF_nice));
  }else{
    say(random(modeF_bad));
  }
}
function modeG(){
  if(niceMode){
    say(random(modeG_nice));
  }else{
    say(random(modeG_bad));
  }
}
function modeH(){
  if(niceMode){
    say(random(modeH_nice));
  }else{
    say(random(modeH_bad));
  }
}

function say(something) {
	// chair.setVoice(Math.floor(random(chair.voices.length)));  // Randomize the available voices
	chair.setPitch(1.0);
	chair.setRate(1.1);
	chair.speak(something); // say something
}





//For testing only
function mousePressed(){
  sit = true;
  away = false;
}

function mouseReleased(){
  away = true;
  sit = false;
}