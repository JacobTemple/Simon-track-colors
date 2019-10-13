var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var randomColor;
var audio;
var started = false;
var level = 0;


randomColorFunction();



$(document).keypress(function() {
  if (started == false) {
    started = true;
    nextSquence();
  }
});



$(".btn").click(function() {
  var userChosenColor = this.id;
  console.log(userChosenColor);

  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern);


  makeSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length);
});









// reusable functions

function nextSquence() {


  setTimeout(function() {
    gamePattern.push(randomColorFunction());
  }, 500);


  level++;
  $("#level-title").text("Level " + level);

}



function makeSound(key) {
  audio = new Audio("sounds/" + key + ".mp3");
  audio.play();
}



function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}



function randomNumber() {
  var randomNumber = Math.floor(Math.random() * 4);
  return randomNumber;
}



function randomColorFunction() {
  randomColor = buttonColors[randomNumber()];

  // creates a "flashing" animation
  $("#" + randomColor).css({
    opacity: 0
  }).animate({
    opacity: 1
  }, 700);

  makeSound(randomColor);

  return randomColor;
}

function checkAnswer(level) {
  if (gamePattern[userClickedPattern.length - 1] == userClickedPattern[userClickedPattern.length - 1]) {
    console.log("game: " + gamePattern[gamePattern.length - 1])
    console.log("user: " + userClickedPattern[userClickedPattern.length - 1])
    console.log("success");

    if (gamePattern.length == userClickedPattern.length) {
        setTimeout(nextSquence, 1000);
        userClickedPattern = [];
    }
  } else {

    makeSound("wrong");
    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);


    $("#level-title").text("Game Over, Press Any Key to Restart");


    startOver();


    console.log("failure at life");
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}
