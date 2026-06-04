var activated = false;
const typeBar = document.getElementById("TypeBar"); 
const text = document.getElementById("Text"); 
const promptThing = document.getElementById("Prompt"); 
const Timer = document.getElementById("Timer"); 

var promptThingLast = "";
var RequiredSentence = "";
var TimeMultiplier = 0.5;
var CompletedRounds = 0;

var Music = new Audio("filler/VoidExplorer1.mp3");
Music.loop = true

const sentenceStart = 
["Robloxia","Among us","Fortnite","Hej","Type shit","Skibidi","Aura monster","Excuse me sir",
    "Keyboard", "Blender","Happy","Fountain","Earth","123456789","67"
];

var currentSentences = sentenceStart;
var MyInterval

function RoundLost(){
    typeBar.style.width = "0%";
    text.textContent = "";
    promptThing.textContent = "";
    Timer.style.visibility = "hidden";


    Music.pause()
    Music.currentTime = 0
    CompletedRounds = 0;
    activated = false;

    document.body.style.backgroundImage =
    "linear-gradient(rgba(255,255,255,1),rgba(255,255,255,1)), url('./filler/Background.png')";
}

function Events(){
    if (CompletedRounds == 10){
        Music.play()

        document.body.style.backgroundImage =
    "linear-gradient(rgba(255,255,255,0.2),rgba(255,255,255,0.2)), url('./filler/Background.png')";
    };
};

function CreateWord(forced){
    clearInterval(MyInterval);

    Events();

    text.textContent = "";
    promptThingLast = "";

    CompletedRounds += 1;

    if (forced != undefined){
        RequiredSentence = forced;
    }else{
        RequiredSentence = currentSentences[Math.floor(Math.random() * currentSentences.length)];
    };
    promptThing.textContent = RequiredSentence;

    var totaltime = RequiredSentence.length * TimeMultiplier * 1000 + 1000
    
    var GotSentence = RequiredSentence;

    MyInterval = setInterval(() => {
    totaltime-= 100;
    
    Timer.textContent = totaltime/1000;  

    if (totaltime <= 0) {
        clearInterval(MyInterval);
        RoundLost();
    }
}, 100);

};

function CheckTyping(){
    if (text.textContent == RequiredSentence){
        var audio = new Audio("filler/Ding.mp3");
        audio.play();
        
        CreateWord();
    };
};

function StartRound(){
    console.log("ITS STARTED");
    typeBar.style.width = "80%";
    typeBar.style.visibility = "visible";
    Timer.style.visibility = "visible";

    text.visibility = "visible";
    promptThing.visibility = "visible";

    CreateWord();
};

document.addEventListener("keydown", (event)=>{
    var audio = new Audio("filler/popsound.mp3");
    audio.play();

    if (!activated){
        activated = true;
        StartRound();
        return;
    };

    if ((event.code.includes("Key") || 
    event.code.includes("Digit") || 
    event.code == "Space") && 
     text.textContent.length < 36){
        text.textContent += event.key;

        if(promptThing.textContent[0] != undefined){
            promptThingLast =  promptThing.textContent[0] + promptThingLast;
        
            promptThing.textContent = promptThing.textContent.slice(1);
        }

        CheckTyping()
    }else if ((event.code === "Backspace")){
        text.textContent = text.textContent.slice(0, -1);
        
        if(promptThingLast.length > text.textContent.length){
            promptThing.textContent = promptThingLast[0] + promptThing.textContent

            promptThingLast = promptThingLast.slice(1)
        };
    };


    if(event.code == "Enter"){
        const Enters = document.getElementsByClassName("Enter")

        for (const thing of Enters) {
            thing.style.transition = "all 0s";
            thing.style.backgroundColor = "red";
        }
        
    } else{
        document.getElementById(event.code).style.backgroundColor = "red";
        document.getElementById(event.code).style.transition = "all 0s";
    }
});

document.addEventListener("keyup", (event)=>{
    if(event.code == "Enter"){
        const Enters = document.getElementsByClassName("Enter")

        for (const thing of Enters) {
            thing.style.backgroundColor = "rgb(218, 218, 218)";
            thing.style.transition = "all 0.3s";
        }
        
    } else{
        document.getElementById(event.code).style.backgroundColor = "";
        document.getElementById(event.code).style.transition = "all 0.3s";
    }
});