$(document).ready(function() {

	// variables to set the range of our random numbers.
    var goalMinNumber = 19;
    var goalMaxNumber = 120;
    var gemMinNumber = 1;
    var gemMaxNumber = 12;
    var randomGemNumberSet = new Array();

    // call a function and insert a random 'goal' number into variable
    var randomGoalNumber = randomNumberFromRange(goalMinNumber, goalMaxNumber);

    // function that picks a random number from a range
    function randomNumberFromRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // for loop which inserts four random numbers into an array
    for (let i = 0; i < 4; i++) {
    	    var randomGemNumber = randomNumberFromRange(gemMinNumber, gemMaxNumber);
    	    // insert numbers into array
    	    randomGemNumberSet.push(randomGemNumber);
    }

    // Just checking
    console.log(randomGoalNumber);
    console.log(randomGemNumberSet);

    // print our random goal number to page
  $("#number-goal").text(randomGoalNumber);

  // to iterate the collective total of our gem-clicks
  var counter = 0;
    $("#personal-num").text(counter);

  // somewhat needless array to produce individual images

      const gemPics = [
        "blu",
        "purp",
        "red",
        "yel"
      ];

  // Create multiple crystals each with their own unique number value.

  // Next we create a for loop to create crystals for every numberOption.
  for (var i = 0; i < randomGemNumberSet.length; i++) {

    // For each iteration, we will create an imageCrystal
    var imageCrystal = $("<img>");

    // First each crystal will be given the class ".crystal-image".
    // This will allow the CSS to take effect.
    imageCrystal.addClass("crystal-image");

    // Each imageCrystal will be given a src link to the crystal image
    imageCrystal.attr("src", "assets/images/gem_" + gemPics[i] + ".jpg");

    // Each imageCrystal will be given a data attribute called data-crystalValue.
    // This data attribute will be set equal to the array value.
    imageCrystal.attr("data-crystalvalue", randomGemNumberSet[i]);

    // Lastly, each crystal image (with all it classes and attributes) will get added to the page.
    $("#crystals").append(imageCrystal);
  }

  // Scorekeeping
  let wins = 0;
  let losses = 0;


  // This time, our click event applies to every single crystal on the page. Not just one.
  $(".crystal-image").on("click", function() {

    // Determining the crystal's value requires us to extract the value from the data attribute.
    // Using the $(this) keyword specifies that we should be extracting the crystal value of the clicked crystal.
    // Using the .attr("data-crystalvalue") allows us to grab the value out of the "data-crystalvalue" attribute.
    // Since attributes on HTML elements are strings, we must convert it to an integer before adding to the counter
    
    var crystalValue = ($(this).attr("data-crystalvalue"));
    crystalValue = parseInt(crystalValue);
    // We then add the crystalValue to the user's "counter" which is a global variable.
    // Every click, from every crystal adds to the global counter.
    counter += crystalValue;

    // All of the same game win-lose logic applies. So the rest remains unchanged.

      $("#personal-num").text(counter);


    if (counter === randomGoalNumber) {
      alert("You win, you crafty old dog!");
      wins++;
      $("#winner").text(wins);
      counter = 0;
      randomGoalNumber = randomNumberFromRange(goalMinNumber, goalMaxNumber);
      $("#personal-num").text(counter);
      $("#number-goal").text(randomGoalNumber);
    }

    else if (counter >= randomGoalNumber) {
      alert("You lose!!");
      losses++;
      $("#loser").text(losses);
      counter = 0;
      randomGoalNumber = randomNumberFromRange(goalMinNumber, goalMaxNumber);
      $("#personal-num").text(counter);
      $("#number-goal").text(randomGoalNumber);
    }

    });

});

 