const validValues = ["rock", "paper", "scissors"];

function computerPlay() {
  //Randomly select a value and return
  return validValues[Math.floor(Math.random() * 3)];
}

function playRound(playerSelection, computerSelection) {
  //Allow player input to work with any case
  const sanitisedPlayerSelection = playerSelection.toLowerCase();

  //Assess game state, and return outcome
  if (sanitisedPlayerSelection.toLowerCase() === computerSelection) {
    return `Game ended with a Draw, you both selected ${sanitisedPlayerSelection}`;
  } else if (
    (sanitisedPlayerSelection === "rock" && computerSelection === "scissors") ||
    (sanitisedPlayerSelection === "paper" && computerSelection === "rock") ||
    (sanitisedPlayerSelection === "scissors" && computerSelection === "paper")
  ) {
    return `You win, ${sanitisedPlayerSelection} beats ${computerSelection}`;
  } else {
    return `You lose, ${computerSelection} beats ${sanitisedPlayerSelection}`;
  }
}

function game() {
  for (let i = 0; i < 5; i++) {
    let playerSelection = prompt(
      `What do you choose - rock, paper or scissors?`
    );
    if (validValues.includes(playerSelection.toLowerCase())) {
      console.log(playRound(playerSelection, computerPlay()));
    } else {
      alert("Invalid entry");
      i--;
    }
  }
}
