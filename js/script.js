var activated = false;
const typeBar = document.getElementById("TypeBar"); 
const text = document.getElementById("Text"); 
const promptThing = document.getElementById("Prompt"); 

var promptThingLast = "";

function StartRound(){
    console.log("ITS STARTED");
    text.textContent = "";
    typeBar.style.transition = "all 1s ease";
    typeBar.style.width = "80%";
    typeBar.style.visibility = "visible";

    promptThing.textContent = "Robloxia";

}

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