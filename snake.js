import { getInputDirection } from "./input.js";

export const snakeSpeed = 1;
//the 'snakeSpeed' variable allows you to determine how fast the game updates higher means faster
const snakeBody = [
    { x: 11, y: 11 }
]
//coordinates for snake in x y array
export function update() {
    const inputDirection = getInputDirection();
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] }
    }

   snakeBody[0].x += inputDirection.x;
   snakeBody[0].y += inputDirection.y;
}

export function draw(gameBoard) {
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add('snake');
        gameBoard.appendChild(snakeElement);
    })
}
