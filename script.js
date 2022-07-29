//shows the game status 
const statusDisplay = document.querySelector('.game--status');

//When the game ends we can track it using this
let gameActive = true;

//Store the current player here so we know whos turn
let currentPlayer = 'X';

//Stores the current game state empty array of strings will allow us to track the played cells and validate the game state later on
let gameState = ["", "", "", "", "", "", "", "", ""];

//declared messages that are displyed to the user during the game. since some factors are dynamic mainly current player, we will use a function so it is current data is used when needed
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

//initial message to let players know whos turn it is
statusDisplay.innerHTML = currentPlayerTurn();

function handleCellPlayed(clickedCell, clickedCellIndex) {
    //update the internal game state to refelect the played move and update the user interface
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;

}
//change the current player and update the game status message
function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}
const winningConditions =[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++){
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if ( a === b && b === c){
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
    // will check wether there area any values in our game stae array that are still not populated
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
// if this still executes we know that no one has won the game yet so we continue and change the current player
    handlePlayerChange();
}
    
function handleCellCLick(clickedCellEvent) {
//save the clicked html element in a varible
    const clickedCell = clickedCellEvent.target;

//this is grabbing the data-cell-index fromt the clicked cell so we can identify where it is. the getAttribute returns a string it needs to be parsed
    const clickedCellIndex = parseInt(
        clickedCell.getAttribute('data-cell-index')
    );

//checks to see whether the call has already been played or if the game is paused. if any are turn the click will be ignored
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
            return;
    }

//if everything is good we will proceed with the game flow
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}
function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""]
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell')
    .forEach(cell => cell.innerHTML = "")
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellCLick))
document.querySelector('.game--restart').addEventListener('click', handleRestartGame)

