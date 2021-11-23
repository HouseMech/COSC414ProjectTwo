// Win conditions currently are if score is
let bacteriaWinAmount = 2;
let completeCounter = 0;
let playerKillCount =0;


let bacteriaScoreWinAmount = 100;
let bacteriaWin = false;
let bacteriaScore =0;


let playerScoreWinAmount = 60;
let playerWin = false;
let playerScore =0;



score = function(allBact, numOfBacteria) { 
    playerScoreWinAmount = numOfBacteria*10;
    bacteriaScoreWinAmount = numOfBacteria*10;
    if(playerWin&&!bacteriaWin){

        document.getElementById("playerScore").innerHTML = "Player Wins. Score: " + getPlayerScore();
      // End Game  
      return;
    }

    if(bacteriaWin){
        document.getElementById("bacteriaScore").innerHTML = "Bacteria Wins. Score: " + getBacteriaScore();
        document.getElementById("playerScore").innerHTML = "Player Loses. Score: " + getPlayerScore();
        // End Game
        return;
    }


    completeCounter = 0;
    for(let i=0; i < allBact.length; i++){

        if(allBact[i].fullyGrown){
            console.log("Bacteria "+ i + "Fully grown:" + allBact[i].fullyGrown);
        completeCounter++; 
        updateBacteriaScore(5);
        }

       if(completeCounter >= bacteriaWinAmount){
        // Bacteria Wins. Pause
        bacteriaWin = true;
      }
      
      if(playerKillCount >= numOfBacteria){
         // alert("player Wins" + playerKillCount);
        playerWin = true;
      }    
     // console.log("Complete Counter:" + completeCounter);
   }
  // document.getElementById("playerScore").innerHTML = "Score: 69";
}

updatePlayerScore = function(amount){

    playerScore += amount;
    document.getElementById("playerScore").innerHTML = "Player Score: " + getPlayerScore();

    if(playerScore >= playerScoreWinAmount){
        // Player Wins. Pause
     document.getElementById("playerScore").innerHTML = "Player Wins. Score: " + getPlayerScore();
     playerWin = true;
    }
}

updateBacteriaScore = function(amount){

    bacteriaScore += amount;
    document.getElementById("bacteriaScore").innerHTML = "Bacteria Score: " + getBacteriaScore();

    if(bacteriaScore >= bacteriaScoreWinAmount){
        // Bacteria Wins. Pause
     document.getElementById("bacteriaScore").innerHTML = "Bacteria Wins. Score: " + getBacteriaScore();
     bacteriaWin = true;
    }
}

getPlayerScore= function(){

    return Math.round(playerScore*100)/100;
}

getBacteriaScore= function(){

    return Math.round(bacteriaScore*100)/100;
}

bacteriaPopped = function(){
    playerKillCount++;
    updatePlayerScore(10);
}

bacteriaFullyGrown = function(bacteria){
    console.log(bacteria.fullyGrowth);
    if(bacteria.fullyGrowth){
        console.log("Bacteria "+ "fully grown");
         completeCounter++;
    }
}