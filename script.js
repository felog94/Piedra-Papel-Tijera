// --- Referencias a elementos del DOM ---
const playerChoices = document.querySelectorAll('.choice-btn');
const playerDisplayChoice = document.getElementById('player-display-choice');
const computerDisplayChoice = document.getElementById('computer-display-choice');
const resultMessage = document.getElementById('result-message');
const playerScoreValue = document.getElementById('player-score-value');
const computerScoreValue = document.getElementById('computer-score-value');
const resetButton = document.getElementById('reset-button');

// --- Variables del juego ---
let playerScore = 0;
let computerScore = 0;
const choices = ['piedra', 'papel', 'tijera']; // Opciones de juego en español

// **Mapeo de IDs de botones a nombres de opciones en español y emojis**
const choiceMapping = {
    'piedra': { name: 'piedra', emoji: '✊' }, // Agregado para la elección de la computadora también
    'papel': { name: 'papel', emoji: '✋' },   // Agregado para la elección de la computadora también
    'tijera': { name: 'tijera', emoji: '✌️' }, // Agregado para la elección de la computadora también
    'rock': { name: 'piedra', emoji: '✊' }, // Mantiene el mapeo para IDs de botones
    'paper': { name: 'papel', emoji: '✋' },   // Mantiene el mapeo para IDs de botones
    'scissors': { name: 'tijera', emoji: '✌️' } // Mantiene el mapeo para IDs de botones
};


// --- Función para la elección de la computadora ---
function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex]; // Devuelve 'piedra', 'papel' o 'tijera'
}

// --- Función para determinar el ganador ---
function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'empate';
    } else if (
        (playerChoice === 'piedra' && computerChoice === 'tijera') ||
        (playerChoice === 'papel' && computerChoice === 'piedra') ||
        (playerChoice === 'tijera' && computerChoice === 'papel')
    ) {
        return 'ganaste';
    } else {
        return 'perdiste';
    }
}

// --- Función para actualizar el DOM con el resultado y el score ---
function updateGame(playerChoiceId, computerChoiceName, result) { // Renombrado computerChoice a computerChoiceName para claridad
    // Usamos el emoji del mapeo para la elección del jugador (ID del botón)
    playerDisplayChoice.textContent = choiceMapping[playerChoiceId].emoji;
    
    // choiceMapping con el nombre de la elección de la computadora**
    computerDisplayChoice.textContent = choiceMapping[computerChoiceName].emoji; 

    if (result === 'ganaste') {
        resultMessage.textContent = '¡GANASTE! 🎉';
        resultMessage.style.color = '#4CAF50'; // Verde
        playerScore++;
    } else if (result === 'perdiste') {
        resultMessage.textContent = 'PERDISTE... 😭';
        resultMessage.style.color = '#dc3545'; // Rojo
        computerScore++;
    } else {
        resultMessage.textContent = '¡EMPATE! 🤝';
        resultMessage.style.color = '#ffc107'; // Amarillo
    }

    playerScoreValue.textContent = playerScore;
    computerScoreValue.textContent = computerScore;
}

// --- Función para reiniciar el juego ---
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerScoreValue.textContent = '0';
    computerScoreValue.textContent = '0';
    resultMessage.textContent = '¡Elige tu jugada!';
    resultMessage.style.color = '#333';
    playerDisplayChoice.textContent = '?';
    computerDisplayChoice.textContent = '?';
}

// --- Event Listeners ---

// Añadir listener a cada botón de elección del jugador
playerChoices.forEach(button => {
    button.addEventListener('click', (e) => {
        const playerChoiceId = e.target.id;
        
        const playerChoiceName = choiceMapping[playerChoiceId].name; 
        
        const computerChoiceName = getComputerChoice(); // Esto devuelve 'piedra', 'papel', 'tijera'
        const result = determineWinner(playerChoiceName, computerChoiceName); 
        
        // Pasamos el ID del botón (para el emoji del jugador) y el nombre de la computadora (para su emoji)
        updateGame(playerChoiceId, computerChoiceName, result); 
    });
});

// Añadir listener al botón de reinicio
resetButton.addEventListener('click', resetGame);