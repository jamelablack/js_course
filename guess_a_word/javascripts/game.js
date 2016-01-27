var $message = $("#message"),
    $letters = $("#spaces"),
    $guesses = $("#guesses"),
    $apples = $("#apples"),
    $replay = $("#replay");

var randomWord = (function() {
  var words = ["abacus", "quotient", "octothorpe", "proselytize", "stipend"];

  function without() {
    var new_arr = [],
        args = Array.prototype.slice.call(arguments);

    words.forEach(function(el) {
      if (args.indexOf(el) === -1) {
        new_arr.push(el);
      }
    });

    return new_arr;
  }

  return function() {
    var word = words[Math.floor(Math.random() * words.length)];

    words = without(word);

    return word;
  };
})();

function Game() {
  this.incorrect = 0;
  this.letters_guessed = [];
  this.correct_spaces = 0;
  this.word = randomWord();
  if (!this.word) {
    this.displayMessage("Sorry, I've run out of words!");
    this.toggleReplayLink(false);
    return this;
  }
  this.word = this.word.split("");
  this.init();
}

Game.prototype = {
  guesses: 6,
  createBlanks: function() {
    var spaces = (new Array(this.word.length + 1)).join("<span></span>");

    $letters.find("span").remove();
    $letters.append(spaces);
    this.$spaces = $("#spaces span");
  },
  fillBlanksFor: function(letter) {
    var self = this;

    self.word.forEach(function(l, i) {
      if (letter === l) {
        self.$spaces.eq(i).text(letter);
        self.correct_spaces++;
      }
    });
  },
  processGuess: function(e) {
    var letter = String.fromCharCode(e.which);

    if (notALetter(e.which)) { return; }
    if (this.duplicateGuess(letter)) { return; }

    if ($.inArray(letter, this.word) !== -1) {
      this.fillBlanksFor(letter);
      this.renderGuess(letter);

      if (this.correct_spaces === this.$spaces.length) {
        this.win();
      }
    }
    else {
      this.renderIncorrectGuess(letter);
    }
    if (this.incorrect === this.guesses) {
      this.lose();
    }
  },
  win: function() {
    this.unbind();
    this.displayMessage("You win!");
    this.toggleReplayLink(true);
    this.setGameStatus("win");
  },
  lose: function() {
    this.unbind();
    this.displayMessage("Sorry! You're out of guesses");
    this.toggleReplayLink(true);
    this.setGameStatus("lose");
  },
  duplicateGuess: function(letter) {
    var duplicate = this.letters_guessed.indexOf(letter) !== -1;

    if (!duplicate) { this.letters_guessed.push(letter); }

    return duplicate;
  },
  renderIncorrectGuess: function(letter) {
    this.incorrect++;
    this.renderGuess(letter);
    this.setClass();
  },
  setClass: function() {
    $apples.removeClass().addClass("guess_" + this.incorrect);
  },
  renderGuess: function(letter) {
    $("<span />", {
      text: letter
    }).appendTo($guesses);
  },
  displayMessage: function(text) {
    $message.text(text);
  },
  toggleReplayLink: function(which) {
    $replay.toggle(which);
  },
  emptyGuesses: function() {
    $guesses.find("span").remove();
  },
  unbind: function() {
    $(document).unbind(".game");
  },
  bind: function() {
    $(document).on("keypress.game", this.processGuess.bind(this));
  },
  setGameStatus: function(status) {
    $(document.body).removeClass();
    if (status) {
      $(document.body).addClass(status);
    }
  },
  init: function() {
    this.bind();
    this.setClass();
    this.toggleReplayLink(false);
    this.emptyGuesses();
    this.createBlanks();
    this.setGameStatus();
    this.displayMessage("");
  }
};

function notALetter(code) {
  var a_code = 97,
      z_code = 122;

  return code < a_code || code > z_code;
}

new Game();

$replay.on("click", function(e) {
  e.preventDefault();
  new Game();
});

