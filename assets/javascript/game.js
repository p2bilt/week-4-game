// BACKUP

$(document).ready(function() {

    // variables to set the range of our random numbers.

    const goalMinNumber = 19;
    const goalMaxNumber = 120;

    // array to hold our gem values

    var randomGemNumberSet = new Array();

    // call a function and insert a random 'goal' number into variable

    var randomGoalNumber = randomNumberFromRange(goalMinNumber, goalMaxNumber);

    // function that picks a random number from a range

    function randomNumberFromRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // function with a for loop which inserts four random numbers into an array

    function gemNumberMaker() {

        for (let i = 0; i < 4; i++) {
            var randomGemNumber = randomNumberFromRange(1, 12);

            // insert numbers into array

            randomGemNumberSet.push(randomGemNumber);
        }
    }

    // call that function to get gem numbers

    gemNumberMaker();

    // Just checking

    console.log(randomGoalNumber);
    console.log(randomGemNumberSet);

    // print our random goal number to page

    $("#number-goal").text(randomGoalNumber);

    // to iterate the collective total of our gem-clicks

    var counter = 0;
    $("#personal-num").text(counter);

    // array to store individual image tags, which generate

    const gemPics = [
        "blu",
        "purp",
        "red",
        "yel",
        "ltpurp",
        "pearl",
        "gold"
    ];

    // Create multiple crystals each with their own unique number value, 
    // tucked inside a function for reset purposes.
    function generateCrystals() {
        for (let i = 0; i < randomGemNumberSet.length; i++) {

            // For each iteration, we will create an imageCrystal
            var imageCrystal = $("<img>");

            // each crystal be given the class ".crystal-image". (onclick targets this)
            imageCrystal.addClass("crystal-image");

            // a random number from zero-six to shuffle our gem images
            var x = randomNumberFromRange(0, 6);

            // a random src link to the crystal image
            imageCrystal.attr("src", "assets/images/gem_" + gemPics[x] + ".png");

            // Each imageCrystal will be given a data attribute called data-crystalValue.
            // This data attribute will be set equal to the array value.
            imageCrystal.attr("data-crystalvalue", randomGemNumberSet[i]);

            // Lastly, each crystal image (with all it classes and attributes) will get added to the page.
            $("#crystals").append(imageCrystal);
        }
    }

    generateCrystals();

    // Scorekeeping
    var wins = 0;
    var losses = 0;


    // capture click event, and specifically target the document so the buttons work! Thanks Noah!
    $(document).on("click", ".crystal-image", function() {

        // grab value from clicked crystal, convert string to integer 

        var crystalValue = ($(this).attr("data-crystalvalue"));
        crystalValue = parseInt(crystalValue);

        // Add the clicked-crystal's value to the global counter

        counter += crystalValue;

        // Update the dom with the newly calculated total of all clicked crystals

        $("#personal-num").text(counter);

        // test if our personal score equals - or exceeds! -  the goal number

        if (counter === randomGoalNumber) {
            $.alert({
                title: 'Congratulations!',
                content: "<br><strong>Alignment achieved!</strong><br><br>Try again to increase your astral harmonic.<br><br>Here's some new crystals for you.",
                type: 'green',
                typeAnimated: true,
            });
            wins++;
            $("#winner").text(wins);
            gameReset();

        } else if (counter >= randomGoalNumber) {
            $.alert({
                title: 'Uhhh...',
                content: "<br>What's the frequency, Kenneth??<br><br><strong>Well, you've lost this time–-<br>But why not try again?</strong><br><br>Here's some new crystals for you.",
                type: 'red',
                typeAnimated: true,
            });
            losses++;
            $("#loser").text(losses);
            gameReset();

        }

    });

    // function to reset the game

    function gameReset() {
        counter = 0;
        $("#personal-num").text(counter);
        randomGoalNumber = randomNumberFromRange(goalMinNumber, goalMaxNumber);
        $("#number-goal").text(randomGoalNumber);
        randomGemNumberSet = [];
        gemNumberMaker();
        console.log(randomGoalNumber);
        console.log(randomGemNumberSet);
        $("#crystals").empty();
        generateCrystals();
    }


});
