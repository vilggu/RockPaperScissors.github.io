
$(document).ready( function() {


  function prepare(){
    readyToChoose = false;
    setTimeout(
      function(){
        readyToChoose = true;
        $("#commandText").text("Choose your hand:");
        $("#paper").css("border","4px solid white");
        $("#rock").css("border","4px solid white");
        $("#scissors").css("border","4px solid white");
      },1000);
  }

  function getComputerHand(){
    var randomNumber = Math.floor(Math.random()*3);
    var computerHand = "";
    if(randomNumber == 0){
        computerHand = "rock";
    }
    if(randomNumber == 1){
        computerHand = "paper";
    }
    if(randomNumber == 2){
        computerHand = "scissors";
    }
    return computerHand;
  }

  function gameOver(){
    readyToChoose = false;
    $("#commandText").text("Game Over!");
    var msg = {
      "messageType": "SCORE",
      "score": parseFloat($("#points").text())
    };
    points = 0;
    $("#points").text(points);
    window.parent.postMessage(msg, "*");

  }

  "use strict";
  var points = 0;
  var readyToChoose = true;
  

  $("#save").click(function(){
    var msg = {
      messageType: "SAVE",
      gameState: {
          score: parseFloat($("#points").text())
      }
      
    };
    window.parent.postMessage(msg, "*");
   
  });

  $("#load").click(function(){
    var msg = {
      "messageType": "LOAD_REQUEST",
    };
    window.parent.postMessage(msg, "*");
  });


  $("#newgame").click(function(){
    readyToChoose = true;
    points = 0;
    $("#commandText").text("Choose your hand:");
    $("#paper").css("border","4px solid white");
    $("#rock").css("border","4px solid white");
    $("#scissors").css("border","4px solid white");
    $("#points").text(points);
  });

  $("#rock").click(function(){
    if(readyToChoose===true){
      $("#rock").css("border","4px solid yellow");
      var computerHand = getComputerHand();
      var tulosTeksti = "";
      if(computerHand == "paper"){
        $("#paper").css("border","4px solid red");
        tulosTeksti = "You lost!";
        gameOver();
      }
      if(computerHand == "rock"){
        $("#rock").css("border","4px solid red");
        tulosTeksti = "Draw!";
        $("#commandText").text(tulosTeksti);
        $("#points").text(points);
        prepare();
      }
      if(computerHand == "scissors"){
        $("#scissors").css("border","4px solid red");
        tulosTeksti = "You win!";
        points = points+1;
        $("#commandText").text(tulosTeksti);
        $("#points").text(points);
        prepare();
      }
    }
  });

  $("#paper").click(function(){
    if(readyToChoose === true){
      var computerHand = getComputerHand();
      $("#paper").css("border","4px solid yellow");
      var tulosTeksti = "";
      if(computerHand == "paper"){
        $("#paper").css("border","4px solid red");
        tulosTeksti = "Draw!";
        $("#commandText").text(tulosTeksti);
        $("#points").text(points);
        prepare();
      }
      if(computerHand == "rock"){
        $("#rock").css("border","4px solid red");
        tulosTeksti = "You win!";
        points = points+1;
        $("#commandText").text(tulosTeksti);
        $("#points").text(points);
        prepare();
      }
      if(computerHand == "scissors"){
        $("#scissors").css("border","4px solid red");
        tulosTeksti = "You lost!";
        gameOver();
      }
    }
  });

  $("#scissors").click(function(){
    if(readyToChoose === true){
      $("#scissors").css("border","4px solid yellow");
      var computerHand = getComputerHand();
      var tulosTeksti = "";
      if(computerHand == "paper"){
        $("#paper").css("border","4px solid red");
        tulosTeksti = "You win!";
        points = points+1;
        $("#commandText").text(tulosTeksti);
        $("#points").text(points);
        prepare();
      }
      if(computerHand == "rock"){
        $("#rock").css("border","4px solid red");
        tulosTeksti = "You lost!";
        gameOver();
      }
      if(computerHand == "scissors"){
        $("#scissors").css("border","4px solid red");
        tulosTeksti = "Draw!";
        $("#commandText").text(tulosTeksti);
        $("#points").text(points);
        prepare();
      }
    }
  });

  function loadState(state){
    
    $("#points").text(state.score);
  }

  // Listener for getting the saved state back to game
    window.addEventListener("message", receiveMessage);

    // Function for setting the saved data
    function receiveMessage(event){
        if(event.data.messageType == "ERROR"){
          alert(event.data.info);
        }else{
          loadState(event.data.gameState);
          alert("Game loaded!");
        }
        
        
    }


});
