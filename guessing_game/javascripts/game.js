$(document).ready(function() {

  var answer = Math.floor(Math.random() * 100) + 1;
    guesses = 0;

    $("form").on("submit", function(e) {
      e.preventDefault();

      var guess = +$("#guess").val(),
       message;

      guesses++;

      if (guess === answer) {
        message = "You guessed it! It only took you " + guesses + " guesses. ";
       }
       else if (guess > answer) {
        message = "My number is less than " + guess;
       }
       else {
        message = "My number is higher than " + guess;
       }
     $("p").text(message);
  });
  $("a").on("click", function(e) {
    e.preventDefault();

    answer = Math.floor(MAth.random() * 100) + 1;
    guesses = 0;
    $("p").text( "Guess a number from 1 to 100");
  });
});
