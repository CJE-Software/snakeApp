import { getInputDirection } from "./input.js";


export const snakeSpeed = 3;
//the 'snakeSpeed' variable allows you to determine how fast the game updates higher means faster
const snakeBody = [
    { x: 11, y: 11 }
];
let newSegments = 0;

//coordinates for snake in x y array
export function update() {
    addSegments();
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

export function expandSnake(amount) {
    newSegments += amount
}

export function onSnake(position, { ignoreHead = false } = {}) {
    return snakeBody.some((segment, index) => {
        if (ignoreHead && index === 0) return false;
        return equalPositions(segment, position);
    })
}

export function getSnakeHead() {
    return snakeBody[0];
}

export function snakeCollision() {
    return onSnake(snakeBody[0], { ignoreHead: true })
}

function equalPositions(pos1, pos2) {
    return (pos1.x === pos2.x && pos1.y === pos2.y)
}

function addSegments() {
    for (let i = 0; i < newSegments; i++) {
        snakeBody.push({ ...snakeBody[snakeBody.length - 1] })
    }

    newSegments = 0;
}
/*
^^^NOTE that in the above function 'addSegments':
sample 1>>> snakeBody.push({ ...snakeBody[snakeBody.length - 1] })
sample 2>>> snakeBody[snakeBody.length] = { ...snakeBody[snakeBody.length - 1]}
'sample 1' && 'sample 2' will create the same result
*/
