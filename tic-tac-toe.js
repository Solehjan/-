import { TicTacToe } from "./src/components/TicTacToe.js";

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
} else {
    init()
}

function init() {    
    const moveEl = document.getElementById('move-value')
    
    // Функция, которая обновляет текст "Сейчас ходит: X/O"
    const onMove = (isXTurn) => {
        let currentMove = isXTurn ? 'X' : 'O';
        moveEl.innerText = currentMove;
    }

    // Инициализируем игру
    const game = TicTacToe.init({
        el: document.getElementById('tic-tac-toe'),
        onMove,
    })
    
    // Запускаем
    game.startGame()
    
    // Кнопка рестарт
    const restartBtn = document.getElementById('restart-btn')
    restartBtn.addEventListener('click', () => {
        game.restartGame()
    })
}