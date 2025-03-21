   const board = document.getElementById("board");
        const status = document.getElementById("status");
        let cells = [];
        let currentPlayer = "X";
        let gameActive = true;

        function createBoard() {
            board.innerHTML = "";
            cells = [];
            for (let i = 0; i < 9; i++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.index = i;
                cell.addEventListener("click", makeMove);
                board.appendChild(cell);
                cells.push(cell);
            }
            status.textContent = `Хід гравця: ${currentPlayer}`;
        }

        function makeMove(event) {
            if (!gameActive) return;
            const cell = event.target;
            if (cell.textContent !== "") return;
            
            cell.textContent = currentPlayer;
            cell.classList.add("taken");
            cell.style.color = currentPlayer === "X" ? "#ff4757" : "#1e90ff";
            
            if (checkWinner()) {
                status.textContent = `Гравець ${currentPlayer} переміг!`;
                gameActive = false;
                return;
            }
            
            if (cells.every(cell => cell.textContent !== "")) {
                status.textContent = "Нічия!";
                gameActive = false;
                return;
            }
            
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            status.textContent = `Хід гравця: ${currentPlayer}`;
        }

        function checkWinner() {
            const winningCombinations = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];
            return winningCombinations.some(combination => {
                const [a, b, c] = combination;
                return cells[a].textContent &&
                       cells[a].textContent === cells[b].textContent &&
                       cells[a].textContent === cells[c].textContent;
            });
        }

        function restartGame() {
            currentPlayer = "X";
            gameActive = true;
            createBoard();
        }

        createBoard();