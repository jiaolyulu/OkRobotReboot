// required to run Child Process Applications
var exec = require("child_process").execSync;
// required to access utility functions such as "format"
var util = require("util");
var prompt = require("prompt-sync")(); // "npm install prompt-sync"

//Speaking function
function say(something) {
  var APIkey = "[your Watson APIKey]";
  var url =
    "[your Watson URL]";
  var data = encodeURIComponent(something);
  command = util.format(
    'curl -X GET -u "apikey:%s" --output say.mp3 "%s/v1/synthesize?accept=audio/mp3&text="%s"&%s" && afplay say.mp3 ',
    APIkey,
    url,
    data,
    voice
  );
  exec(command);
}


//Voice Script
var voice = "voice=en-US_AllisonVoice";
class Customer {
    constructor(name, gender, genderInto) {
      this.name = name;
      this.gender = gender;
      this.genderInto = genderInto;
      if (this.gender == this.genderInto){
          this.orientation = "gay";
      } else {
          this.orientation = "straight";
      }
    }
}

//Checking eligibility and asking for gender
console.log("Are you a man or woman? Entering means you are over 18 years old.")
var gender = prompt("xoxo>>: ");
//Requesting name
say("Hello, welcome to E Z, I am your private assistant Molly. Could I know your name? No data will be shared or stored.")
var name = prompt("xoxo>>: ");
if (gender =="man"){
    say("Hi! handsome " + name);
} else{
    say ("Hey, Beautiful " + name);
}
//Checking sexual orientation
say("Before I can help you with your needs. What gender are you into? Enter man or woman"); //I understand there should be more eg Trans, Bi etc. but for this assignment I'm doing this to keep it short
var genderInto = prompt("xoxo>>: ");
//Creating customer profile
var customer = new Customer(name, gender, genderInto);

//Changing voice assitand voice if neccessary
if (customer.genderInto =="man"){
    voice = "voice=en-US_HenryV3Voice";
    say("Hi, " +customer.name+ "I'm Molly's partner, Adam. I will take over and help you from now on.")
    say ("Now ," + customer.name + ", tell me what are you looking for today? Right now I can help you with Lube ,or toys");
    console.log("Please choose from: lube / toy");
} else{
    say ("Fabulous! Now " + customer.name + "What are you looking for today? Right now I can help you with Lube ,or toys");
    console.log("Please choose from: lube / toy");
}

//Checking for which category the customer wants to shop
var category = prompt("xoxo>>: ");
say ("You are gonna love our " + category + " selections!");

//lube
if (category =="lube"){
    var recommendedLubeType;
    var theOtherLubeType;
    if (customer.orientation == "gay"){
        recommendedLubeType = "silicon";
        theOtherLubeType ="water";
    } else {
        recommendedLubeType = "water";
        theOtherLubeType ="silicon";
    }
    say (customer.name + ", most of our ," + customer.orientation + " lovers enjoy our " + recommendedLubeType + " based " + category + " and I would highly recommended this type of lube as well. Would you like to learn our best selling " + recommendedLubeType + " based product?");    
    console.log("Would you love to learn our best selling" + recommendedLubeType + " based lube? ( yes / no )")
    var lubeq1 = prompt("xoxo>>: ");
    if (lubeq1 =="yes"){
        say ("Great! I will send you the link to your email. Thank you for shopping with us. Looking forward to assisting you soon! Goodbye " + customer.name);
    } else {
        say ("I understand you are looking for something else. Would you like to check out our best selling, " + theOtherLubeType + " based lube?");
        console.log("Would you love to learn our best selling" + theOtherLubeType + " based lube? ( yes / no )")
        var lubeq2 = prompt("xoxo>>: ");
        if (lubeq2 == "yes"){
            say ("Great! I will send you the link to your email. Thank you for shopping with us. Looking forward to assisting you soon! Goodbye " + customer.name);
        } else{
            say("I am so sorry we are currently not offering what you are looking for. I can send you a copy of our catalog and a 20% off coupon to your email for your furture shopping with us. Hope I can help you find what you are looking for next time. Bye bye now, " + customer.name);
        }

    }
}


//Toys
if (category == "toy"){
    say (customer.name + ", I can definetly help you explore our toy selections. Are you shopping for yourself or for your partner?")
    console.log("myself / partner");
    var toyFor = prompt("xoxo>>: ");
    var toyCategory = "null";

    if (customer.gender == "man"){
        if (customer.orientation == "gay"){
            //for gay man
            say("Wonderful! I can help you choosing masturbators, dildos and vibrators. What are you looking for today?")
            console.log("masturbators / dildos / vibrators / something else");
            toyCategory = prompt("xoxo>>: ");
        }else{
            if( toyFor =="myself"){
                //for straight man
                say("Wonderful! I can help you choosing masturbators. Is that what you are looking for?")
                console.log("yes / no");
                var toyq1 = prompt("xoxo>>: ");
                if (toyq1 =="yes"){
                    toyCategory = "masturbators"
                }else{
                    say("I am so sorry we are currently not offering what you are looking for. I can send you a copy of our catalog and a 20% off coupon to your email for your furture shopping with us. Hope I can help you find what you are looking for next time. Bye bye now, " + customer.name);
                }
            }else{
                //for straight woman
                say("Wonderful! I can help you choosing dildos and vibrators. What are you looking for today?");
                console.log("dildos / vibrators / something else");
                toyCategory = prompt("xoxo>>: ");
            }
        }
    }else{
        if (customer.orientation == "gay"){
            //for gay woman
            say("Wonderful! I can help you choosing double ended dildos and vibrators. What are you looking for today?")
            console.log("dildos / vibrators / something else");
            toyCategory = prompt("xoxo>>: ");
        }else{
            if (toyFor == "myself"){
                //for straight woman
                say("Wonderful! I can help you choosing dildos and vibrators. What are you looking for today?");
                console.log("dildos / vibrators / something else");
                toyCategory = prompt("xoxo>>: ");
            }else {
                //for straight man
                say("Wonderful! I can help you choosing masturbators. Is that what you are looking for?")
                console.log("yes / no");
                var toyq1 = prompt("xoxo>>: ");
                if (toyq1 =="yes"){
                    toyCategory = "masturbators"
                }else{
                    say("I am so sorry we are currently not offering what you are looking for. I can send you a copy of our catalog and a 20% off coupon to your email for your furture shopping with us. Hope I can help you find what you are looking for next time. Bye bye now, " + customer.name);
                }
            }
        }
    }

    if (toyCategory == "masturbators" || toyCategory == "dildos" || toyCategory =="vibrators"){
        say("We have a great selection of " + toyCategory +". Would love to check out our most loved best-selling " +toyCategory+ " by " + customer.orientation + "  "+ customer.gender+" ?" );
        console.log("yes / no");
        var toyq2 = prompt("xoxo>>: ");
        if (toyq2 =="yes"){
            say ("Great! I will send you the link to your email. Thank you for shopping with us. Looking forward to assisting you soon! Goodbye " + customer.name);
        }else{
            say("I am so sorry we are currently not offering what you are looking for. I can send you a copy of our catalog and a 20% off coupon to your email for your furture shopping with us. Hope I can help you find what you are looking for next time. Bye bye now, " + customer.name);
        }
    }else{
        say("I am so sorry we are currently not offering what you are looking for. I can send you a copy of our catalog and a 20% off coupon to your email for your furture shopping with us. Hope I can help you find what you are looking for next time. Bye bye now, " + customer.name);
    }


}