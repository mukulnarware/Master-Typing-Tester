const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");



let timer=[0,0,0,0];
let interval;
let timerRunning=false;
let totaltypedWords="";
let wordsPerMinute;
// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time){
    if (time<=9){
        time='0'+time;

    }
    return time;

}

// Run a standard minute/second/hundredths timer:
  function runTimer(){
      currentTimer=leadingZero(timer[0])+ ":" + leadingZero(timer[1])+ ":" +leadingZero(timer[2]);
      theTimer.innerHTML=currentTimer;
      if(timer[0]!==2){
   timer[3]++;
   }else{
       clearInterval(interval);
       
       let wordsString=testArea.value;
       totaltypedWords=wordsString.split(" ");
       wordsPerMinute=parseInt((totaltypedWords.length)/2);
       console.log(totaltypedWords); 
       document.getElementById("wordCount").innerText=`Score : ${wordsPerMinute} Per Minute`



   }

timer[0]=Math.floor((timer[3]/100)/60); //for minutes
timer[1]=Math.floor((timer[3]/100)-(timer[0]*60)); //for seconds
timer[2]=Math.floor(timer[3]-(timer[1]*100)-(timer[0]*6000)); // for mili seconds




  }

// Match the text entered with the provided text on the page:
function spellCheck(){
    let  textEntered=testArea.value;
    let  origintextMatch = originText.substring(0,textEntered.length);

    if(textEntered == originText){
        clearInterval(interval);
        testWrapper.style.borderColor= "orange";
    }
    else{
        if(textEntered==origintextMatch){
        testWrapper.style.borderColor= "green";

        
        }else{
            testWrapper.style.borderColor="red";
        }
    }
        
   
}


// Start the timer:

function start(){

let textEnteredLength=testArea.value.length;

    if(textEnteredLength===0  && !timerRunning) {  
        timerRunning=true;
       interval= setInterval(runTimer,10);
     }


    // console.log(textEnteredLength);

}
// Reset everything:
function reset(){
    clearInterval(interval);
    testArea.value="";
    interval=null;
    timerRunning=false;
    timer=[0,0,0,0];
   
   
    totaltypedWords="";
     wordsPerMinute=0;
     document.getElementById("wordCount").innerText="";

    
    theTimer.innerHTML="00:00:00";
    testWrapper.style.borderColor="grey";


}

// Event listeners for keyboard input and the reset button:


testArea.addEventListener("keypress",start);
testArea.addEventListener("keyup",spellCheck);

resetButton.addEventListener("click",reset);
