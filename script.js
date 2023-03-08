// Define variables
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameFinished = false;

// Define DOM elements
const boardEl = document.querySelector('.board');
const turnEl = document.querySelector('#turn');
const restartBtn = document.querySelector('#restart');

// Add event listeners
boardEl.addEventListener('click', handleCellClick);
restartBtn.addEventListener('click', restartGame);

// Function to handle cell click
function handleCellClick(event) {
	// Get the clicked cell and its index
	const cell = event.target;
	const index = cell.id;

	// Check if the game has finished or if the cell is already taken
	if (gameFinished || board[index]) return;

	// Update the board and the cell content
	board[index] = currentPlayer;
	cell.classList.add(currentPlayer.toLowerCase());
	cell.textContent = currentPlayer;

	// Check for a winner or a tie
	const winner = checkForWinner();
	if (winner) {
		gameFinished = true;
		showGameOver(`Player ${currentPlayer} won!`);
		return;
	}

	if (checkForTie()) {
		gameFinished = true;
		showGameOver('It\'s a tie!');
		return;
	}

	// Switch to the next player
	currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
	turnEl.textContent = `It's ${currentPlayer}'s turn`;
}

// Function to check for a winner
function checkForWinner() {
	const possibleWinningMoves = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];

	for (let i = 0; i < possibleWinningMoves.length; i++) {
		const [a, b, c] = possibleWinningMoves[i];
		if (board[a] && board[a] === board[b] && board[a] === board[c]) {
			return true;
		}
	}

	return false;
}

// Function to check for a tie
function checkForTie() {
	return board.every(cell => cell !== '');
}

// Function to show the game over message
function showGameOver(message) {
	turnEl.textContent = message;
}

// Function to restart the game
function restartGame() {
	board = ['', '', '', '', '', '', '', '', ''];
	currentPlayer = 'X';
	gameFinished = false;
	turnEl.textContent = `It's ${currentPlayer}'s turn`;
	boardEl.querySelectorAll('.cell').forEach(cell => {
		cell.classList.remove('x', 'o');
		cell.textContent = '';
	});
}