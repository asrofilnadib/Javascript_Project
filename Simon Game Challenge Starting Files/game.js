
let buttonColors = ['red', 'blue', 'green', 'yellow']

let gamePattern = []
let userClickedPattern = []

started = false
level = 0

$(document).keypress(function () {
  if (!started) {
    $('#level-title').text("level "+level);
    nextSequence()
    started = true
  }
});

$('h1').click(function () {
  if (!started) {
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
  }
});

$('.btn').click(function () { 
  
  var userChosenColour = $(this).attr('id')
  userClickedPattern.push(userChosenColour)
  
  playSound(userChosenColour);
  animatePress(userChosenColour)

  checkAnswer(userClickedPattern.length-1)
});

function nextSequence() {
  userClickedPattern = []

  level++
  $('h1').text('level '+level)

  var randomNumber = Math.floor(Math.random() * 4)
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor)

  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100)
  playSound(randomChosenColor);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(curentColor) {
  $("#" + curentColor).addClass('pressed');

  setTimeout(function () {
    $("#" + curentColor).removeClass("pressed");
  }, 100)
}

function checkAnswer(curentLevel) {
  if (gamePattern[curentLevel] === userClickedPattern[curentLevel]){
    console.log("success")
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence()
      }, 1000);
    }
  } else {
    var audio = new Audio("sounds/wrong.mp3")
    audio.play()

    $('body').addClass('game-over');

    setTimeout(() => {
      $('body').removeClass('game-over')
    }, 500);
    $("h1").text("Game Over, Press Any Key or This Title to Restart");
    $("h1").css("font-size", 45);
    console.log('failed')
    startOver()
  }
}

function startOver() {
  level = 0
  gamePattern = []
  started = false
}