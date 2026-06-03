var keyDowns = 0;
var activated = false;
const typeBar = document.getElementById("TypeBar"); 

function StartRound(){
    console.log("ITS STARTED")
}

document.addEventListener("keydown", (event)=>{
    var audio = new Audio("filler/popsound.mp3");
    audio.play();

    if ((event.code.includes("Key") || 
    event.code.includes("Digit") || 
    event.code == "Space") && 
     typeBar.textContent.length < 36){
        typeBar.textContent += event.key;
    }else if ((event.code === "Backspace")){
        typeBar.textContent = typeBar.textContent.slice(0, -1);
    };


    if (!activated && keyDowns > 10){
        activated = true;
        StartRound();
    };
    
    keyDowns += 1;

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