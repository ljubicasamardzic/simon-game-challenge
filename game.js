var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];


// Make sure the game cannot be restarted while it's still ongoing
var level = 0;

var started = false;

// Detects any keyboard presses
document.addEventListener("keydown", function() {
  if (!started) {

    // Change the h1 when the game starts
    document.querySelector("#level-title").innerHTML = "Level " + level;

    // Run the game
    nextSequence();

    // Make this step only once
    started = true;
  }
});


var numberOfButtons = document.querySelectorAll(".btn").length;

// Iterate over all the buttons and add event listeners
for (i = 0; i < numberOfButtons; i++) {

  document.querySelectorAll(".btn")[i].addEventListener("click", function() {
    // Save button id
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);

    // Play the adequate sound
    playSound(userChosenColor);
    // Make the animation
    animatePress(userChosenColor);

    // Check if the user has played the correct moves
    checkAnswer(userClickedPattern.length - 1);
  });
}


// Create the next step for the computer and place it into the gamePattern array
function nextSequence() {
  // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level
  userClickedPattern = [];

  // Update level each time the nextSequence() is called
  level++;

  // Update the heading for each new level
  document.querySelector("#level-title").innerHTML = "Level " + level;

  // Make a random move
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // Add effects to mark the game pattern
  document.querySelector("#" + randomChosenColor).classList.add("fadeOut");

  setTimeout(function() {
    document.querySelector("#" + randomChosenColor).classList.remove("fadeOut");
  }, 100);

  playSound(randomChosenColor);

}


function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

    // If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement
    if (userClickedPattern.length === gamePattern.length) {

      // Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }
  } else {
    // Play the sound
    playSound("wrong");

    // Flash red to mark the end of game for 200 milliseconds
    document.querySelector("body").classList.add("game-over");
    setTimeout(function() {
      document.querySelector("body").classList.remove("game-over");
    }, 200);

    // Change heading
    document.querySelector("#level-title").innerHTML = "Game Over, Press Any Key to Restart";

    // Reset game values - then the first press activates the event listener which restarts the game
    startOver();

  }

}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Animates the pressed button by adding, then removing a class
function animatePress(currentColor) {
  // Detect the pressed button
  var pressedButton = document.querySelector("." + currentColor);

  // Add an effect to it
  pressedButton.classList.add("pressed");

  // After 100 miliseconds, remove that effect
  setTimeout(function() {
    pressedButton.classList.remove("pressed");
  }, 100);

}

// To start again from scratch
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
