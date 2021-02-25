//Web Speech API - SpeechRecognition
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var synth = window.speechSynthesis;

var recognition = new SpeechRecognition();
recognition.continuous = false;
recognition.interimResults = false;
recognition.lang = 'en-US';
recognition.maxAlternatives = 1;

var historyConvo = "";
var recognized = "";
var step = 0;
var userName = "";
var depositAmount = 0;

function listen(){
  recognition.start();
  document.getElementById("display").innerHTML = "I'm listening...";
  console.log("I'm listening...");
}

function say(something){
  var utterThis = new SpeechSynthesisUtterance(something);
  utterThis.voice = synth.getVoices()[0];
  utterThis.pitch = 1;
  utterThis.rate = 1;

  synth.speak(utterThis);
}

recognition.onresult = function(event) {
  for (var i = event.resultIndex; i < event.results.length; ++i) {
    //recording history
    historyConvo += event.results[i][0].transcript + "<br />";
    //document.getElementById("historyC").innerHTML = historyConvo;

    //getting current result
    recognized =event.results[i][0].transcript;
    document.getElementById("display").innerHTML = " "+event.results[i][0].transcript;

    //Restart conversation
    if (recognized == "restart"){
      step = 0;
      document.getElementById("start").style.display = "block";
      document.getElementById("name").style.display = "none";
      document.getElementById("confirmName").style.display = "none";
      document.getElementById("service").style.display = "none";
      document.getElementById("withdraw").style.display = "none";
      document.getElementById("deposit").style.display = "none";
    }

    //Asking account name
    if (step ==1){
      userName = recognized;
      say("Hello! Can you confirm that you are " + userName + "?");
      document.getElementById("name").style.display = "none";
      document.getElementById("confirmName").style.display = "block";
    } 
    //Confirm account
    else if( step ==2){
      if (recognized =="yes"){
        say("Wonderful, acount confirmed. Now " + userName + ", do you want to withdraw or deposit");
        document.getElementById("confirmName").style.display = "none";
        document.getElementById("service").style.display = "block";
      }else{
        document.getElementById("confirmName").style.display = "none";
        document.getElementById("start").style.display = "block";
        step=0;
      }
    } 
    //Choosing service
    else if ( step ==3){
      if (recognized =="deposit"){
        say(userName + ", please say much how you are depositing and insert cash.");
        document.getElementById("service").style.display = "none";
        document.getElementById("deposit").style.display = "block";
      } else if (recognized == "withdraw"){
        say(userName + ", please say money to withdraw 20 dollars each time.");
        document.getElementById("service").style.display = "none";
        document.getElementById("withdraw").style.display = "block";
      }else{
        say("sorry " + userName + ", didn't understand what you said, please repeate");
      }
      } 
      //Deposit
      else if ( step ==4){
        var thenum = recognized.replace( /^\D+/g, '');
        for (var i = 100; i<=parseInt(thenum); i+=100){
          say(i + " dollar received");
        }
        say (parseInt(thenum) + " dollars received");
      }
      //Withdraw
      else if (step ==5){
        if (recognized=="money"){
          depositAmount +=20;
          say("You've withdrew " + depositAmount + " USD.");
        }
      }
}}

recognition.onspeechend = function() {
  recognition.stop();
}

recognition.onnomatch = function() {
  document.getElementById("display").innerHTML = "Speech not recognised";
  console.log('Speech not recognised');
}

recognition.onerror = function(event) {
  console.log('Error occurred in recognition: ' + event.error);
}

//Initiate converstation 

  document.getElementById("start").style.display = "block";
  document.getElementById("name").style.display = "none";
  document.getElementById("confirmName").style.display = "none";
  document.getElementById("service").style.display = "none";
  document.getElementById("withdraw").style.display = "none";
  document.getElementById("deposit").style.display = "none";



document.getElementById("start").onclick = function(){
  // var question1=document.getElementById("question1");
  // question1.textContent="This is the ATM and I can do a lot of things. What’s the name of the account?";
  // historyConvo += question1.textContent + "<br />";
  say("This is the Smart ATM bot and I can do a lot of things. What’s the name of the account? ");
  document.getElementById("start").style.display = "none";
  document.getElementById("name").style.display = "block";
}

document.getElementById("name").onclick = function() {
  listen();
  step=1;
}

document.getElementById("confirmName").onclick = function() {
  listen();
  step=2;
}

document.getElementById("service").onclick = function() {
  listen();
  step=3;
}

document.getElementById("deposit").onclick = function() {
  listen();
  step=4;
}

document.getElementById("withdraw").onclick = function() {
  listen();
  step=5;
}






