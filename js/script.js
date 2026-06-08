let activated = false;
const typeBar = document.getElementById("TypeBar"); 
const text = document.getElementById("Text"); 
const promptThing = document.getElementById("Prompt"); 
const Timer = document.getElementById("Timer"); 
const Score = document.getElementById("Score"); 

let promptThingLast = "";
let RequiredSentence = "";
let TimeMultiplier = 0.8;
let TimeStart = 2;
let CompletedRounds = 0;
let currentScore = 0;
let totalTime = 0;

let Music = new Audio("filler/VoidExplorer1.mp3");
Music.loop = true

let RushHour = new Audio("filler/VoidExplorer2.mp3");
RushHour.loop = true

const forcedSentances = [
    {sentence: "Are you ready?", round: 9},
    {sentence: "Good luck", round: 10}, 
    {sentence: "Hippopotomonstrosesquipedaliophobia", round: 25},
    {sentence: "Rush hour", round: 39},
];

const sentenceStart = 
["Robloxia","Among us","Fortnite","Hey","Type shit","Skibidi","Aura monster","Excuse me sir",
    "Keyboard", "Blender","Happy","Fountain","Earth","123456789","67","Low taper fade","61",
    "Null"
];

const rushHour =
["67","Hi","You?","Fast","Speed","Type","Hello","Rush","Hour","1","9","Bad","Glad","Sir"];

let currentSentences = sentenceStart;
let MyInterval

function RoundLost(){
    typeBar.style.width = "0%";
    text.textContent = "";
    promptThing.textContent = "";
    Timer.style.visibility = "hidden";

    TimeMultiplier = 0.8;

    Music.pause();
    Music.currentTime = 0;
    RushHour.pause();
    RushHour.currentTime = 0;

    currentScore = 0;
    
    CompletedRounds = 0;

    currentSentences = sentenceStart;
    activated = false;

    document.body.style.backgroundImage =
    "linear-gradient(rgba(255,255,255,1),rgba(255,255,255,1)), url('./filler/Background.png')";
}

function Events(){
    if (CompletedRounds == 10){
        Music.play()

        document.body.style.backgroundImage =
    "linear-gradient(rgba(255,255,255,0.2),rgba(255,255,255,0.2)), url('./filler/Background.png')";
    }else if(CompletedRounds == 40){
        Music.pause();
        Music.currentTime = 0;
        RushHour.play();
        
        document.body.style.backgroundImage = 
            "linear-gradient(rgba(255,255,255,0.2),rgba(255,255,255,0.2)), url('./filler/Background2.png')";

        
        currentSentences = rushHour;
    };
};

function CreateWord(forced){
    clearInterval(MyInterval);

    TimeMultiplier -= 0.01

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

    totalTime = RequiredSentence.length * TimeMultiplier * 1000 + (TimeStart*1000)
    
    MyInterval = setInterval(() => {
    totalTime-= 100;
    
    Timer.textContent = Math.floor(totalTime/100)/10;  

    if (totalTime <= 0) {
        clearInterval(MyInterval);
        RoundLost();
    }
}, 100);

};

function CheckTyping(){
    if (text.textContent == RequiredSentence){
        let audio = new Audio("filler/Ding.mp3");
        audio.play();

        currentScore += Math.ceil(totalTime/10);
        
        Score.textContent = "SCORE: " + currentScore;
        
        let createForcedWowrd = false;
        let theActualWord = undefined;

        for (let i in forcedSentances) {
            if (forcedSentances[i].round == CompletedRounds){
                createForcedWowrd = true;
                theActualWord = forcedSentances[i].sentence
            };
        };

        if (createForcedWowrd){
            CreateWord(theActualWord);
        }else{
            CreateWord();
        };
    };
};

function StartRound(){
    console.log("ITS STARTED");
    typeBar.style.width = "80%";
    typeBar.style.visibility = "visible";
    Timer.style.visibility = "visible";

    text.visibility = "visible";
    promptThing.visibility = "visible";

    Score.style.visibility = "visible";

    CreateWord();
};

document.addEventListener("keydown", (event)=>{
    let audio = new Audio("filler/popsound.mp3");
    audio.play();

    if (!activated){
        activated = true;
        StartRound();
        return;
    };

    if ((event.code.includes("Key") || 
    event.code.includes("Digit") || 
    event.code == "Space" ||
    event.key == "?") && 
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