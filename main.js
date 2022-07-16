function computerPlay() {
  //Return 'Rock', 'Paper or 'Scissors' randomly
  const results = ["Rock", "Paper", "Scissors"];
  return results[(Math.random() * 2).toFixed(0)];
}

function playRound(playerSelection, computerSelection) {
  const result =
    playerSelection.toLowerCase() === computerSelection.toLowerCase()
      ? "draw"
      : (playerSelection.toLowerCase() === "rock" &&
          computerSelection.toLowerCase() === "scissors") ||
        (playerSelection.toLowerCase() === "paper" &&
          computerSelection.toLowerCase() === "rock") ||
        (playerSelection.toLowerCase() === "scissors" &&
          computerSelection.toLowerCase() === "paper")
      ? "win"
      : "lose";
  return result;
}

//
function displaySelection(value) {
  return value.toLowerCase() === "rock"
    ? "✊🏻"
    : value.toLowerCase() === "paper"
    ? "✋🏻"
    : "✌️🏻";
}

function outputCurrentGameResult(result, playerSelection, computerSelection) {
  console.log(result);
  if (result === "win") {
    gamesWon.push(1);
  } else if (result === "lose") {
    gamesWon.push(0);
  }
  return `You ${result}, ${
    result === "win"
      ? playerSelection + " beats " + computerSelection
      : result === "lose"
      ? computerSelection + " beats " + playerSelection
      : "you both played " + computerSelection
  }`;
}

function showPlayerSelection(playerSelection) {
  document.querySelector("#playerSelection").innerText =
    displaySelection(playerSelection);
  document.querySelector(
    "#currentResult"
  ).innerText = `You chose ${playerSelection}...`;
}

function showComputerSelectionAndResult(
  computerSelection,
  playerSelection,
  gameResult
) {
  //Build some drama with a scrolling selection for the computer for a while
  const numberOfRandoms = 30;

  for (let i = 0; i < numberOfRandoms; i++) {
    document
      .querySelector("#buttonGroup")
      .querySelectorAll("button")
      .forEach((button) => (button.disabled = true));
    if (i < numberOfRandoms - 1) {
      //Fiddle around with what's shown for a while
      setTimeout(cycleOptionsForComputer, 100 * i);
    } else {
      setTimeout(function () {
        //Display selections and outcome
        document.querySelector("#computerSelection").innerText =
          displaySelection(computerSelection);
        //TODO - make some way of showing this is the final selection - scale? some kind of animation
        document.querySelector("#currentResult").innerText =
          outputCurrentGameResult(
            gameResult,
            playerSelection,
            computerSelection
          );
        if (gamesWon.length < numberOfGames) {
          document
            .querySelector("#buttonGroup")
            .querySelectorAll("button")
            .forEach((button) => (button.disabled = false));
          document.querySelector(
            "#overallResult"
          ).innerText = `You've won ${gamesWon.reduce(
            (sum, gameState) => sum + gameState,
            0
          )} of the ${gamesWon.length} games you've played.`;
        } else {
          document.querySelector(
            "#overallResult"
          ).innerText = `${numberOfGames} games complete. You won ${gamesWon.reduce(
            (sum, gameState) => sum + gameState,
            0
          )} of them. Overall, you ${
            gamesWon.reduce((sum, gameState) => sum + gameState, 0) >
            gamesWon.length / 2
              ? "won"
              : "lost"
          }! Play again?`;
          const resetButton = document.createElement("button");
          resetButton.setAttribute.id = "resetButton";
          resetButton.addEventListener("click", function () {
            location.reload();
          });
          resetButton.innerText = "Play again";
          document.querySelector(".app").append(resetButton);
        }
      }, 100 * i);
    }
  }
}

function cycleOptionsForComputer() {
  const options = ["✊🏻", "✋🏻", "✌️🏻"];
  document.querySelector("#computerSelection").innerText =
    options[(Math.random() * 2).toFixed(0)];
}

function checkEndGameState() {
  console.log(gamesWon);
  if (gamesWon.length === numberOfGames) {
    //Do end game things, disable buttons, display end game result
  }
}

//initialise app state
//1. Set game state
const gamesWon = [];
const numberOfGames = 5;

//2. Add button events
document.querySelectorAll(".playButton").forEach((button) => {
  button.addEventListener("click", function (e) {
    //Clear current result if there is one.
    document.querySelector("#currentResult").innerText = "";

    //Show player selection
    const playerSelection = e.target.getAttribute("data-played");
    const computerSelection = computerPlay();
    const gameResult = playRound(playerSelection, computerSelection);

    showPlayerSelection(playerSelection);
    showComputerSelectionAndResult(
      computerSelection,
      playerSelection,
      gameResult
    );
    // showOverallResult();
    //Check for end game state
    checkEndGameState();
  });
});

//2.

//Tally up 1s in array until array is 5 in length
//If array is 5 in length (meaning 5 games have been played), disable play buttons, and reveal reset button.

//Computer or person wins? highlight selection in green, remove highlight when playing again

//Emphasise the win or the loss in some way (confetti for win with trophy (or just for best of 5?), sadface emoji for lose?)
