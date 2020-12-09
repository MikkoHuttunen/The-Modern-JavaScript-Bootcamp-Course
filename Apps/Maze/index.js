//Import Matter.js library
const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;

//Canvas dimensions
const width = window.innerWidth;
const height = window.innerHeight;

//Maze dimensions
const cellsHorizontal = 14;
const cellsVertical = 10;

//Cell dimensions
const unitLengthX = width / cellsHorizontal;
const unitLengthY = height / cellsVertical;

//Create new engine, world and renderer and specify their properties
const engine = Engine.create();
engine.world.gravity.y = 0;
const { world } = engine;
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        wireframes: false,
        width,
        height
    }
});

//Render and run the engine
Render.run(render);
Runner.run(Runner.create(), engine);

//Boundaries
const walls = [
    Bodies.rectangle(width / 2, 0, width, 8,
    {
        isStatic: true,
        render: {
            fillStyle: 'red'
        }
    }),
    Bodies.rectangle(width / 2, height, width, 8,
    {
        isStatic: true,
        render: {
            fillStyle: 'red'
        }
    }),
    Bodies.rectangle(0, height / 2, 8, height,
    {
        isStatic: true,
        render: {
            fillStyle: 'red'
        }
    }),
    Bodies.rectangle(width, height / 2, 8, height,
    {
        isStatic: true,
        render: {
            fillStyle: 'red'
        }
    })
];
World.add(world, walls);

//Maze generation

//Shuffle items inside array
const shuffle = (arr) => {
    let counter = arr.length;

    while (counter > 0) {
        const index = Math.floor(Math.random() * counter);

        counter--;

        const temp = arr[counter];
        arr[counter] = arr[index];
        arr[index] = temp;
    }

    return arr;
}

//Grid
const grid = Array(cellsVertical).fill(null).map(() => Array(cellsHorizontal).fill(false));

//Walls
const verticals = Array(cellsVertical).fill(null).map(() => Array(cellsHorizontal - 1).fill(false));
const horizontals = Array(cellsVertical - 1).fill(null).map(() => Array(cellsHorizontal).fill(false));

//Generate random starting position
const startRow = Math.floor(Math.random() * cellsVertical);
const startColumn = Math.floor(Math.random() * cellsHorizontal);

const move = (row, column) => {
    //If I have visited the cell at [row, column], then return
    if (grid[row][column]) {
        return;
    }

    //Mark this cell as being visited
    grid[row][column] = true;

    //Assemble randomly-ordered list of neighbors
    const neighbors = shuffle([
        [row - 1, column, 'up'],
        [row, column + 1, 'right'],
        [row + 1, column, 'down'],
        [row, column - 1, 'left']
    ]);

    //For each neighbor...
    for (let neighbor of neighbors) {
        const [nextRow, nextColumn, direction] = neighbor;

        //See if that neighbor is out of bounds
        if (nextRow < 0 || nextRow >= cellsVertical || nextColumn < 0 || nextColumn >= cellsHorizontal) {
            continue;
        }

        //If we have visited that neighbor, continue to next neighbor
        if (grid[nextRow][nextColumn]) {
            continue;
        }

        //Remove a wall from either horizontals or verticals
        if (direction === 'left') {
            verticals[row][column - 1] = true;
        } else if (direction === 'right') {
            verticals[row][column] = true;
        } else if (direction === 'up') {
            horizontals[row - 1][column] = true;
        } else if (direction === 'down') {
            horizontals[row][column] = true;
        }

        move(nextRow, nextColumn);
    }
}

//Start position
move(startRow, startColumn);

//Draw horizontal walls
horizontals.forEach((row, rowIndex) => {
    row.forEach((open, columnIndex) => {
        if (open) {
            return;
        }

        const wall = Bodies.rectangle(
            columnIndex * unitLengthX + unitLengthX / 2,
            rowIndex * unitLengthY + unitLengthY,
            unitLengthX,
            5,
            {
                label: 'wall',
                isStatic: true,
                render: {
                    fillStyle: 'red'
                }
            }
        );
        World.add(world, wall);
    });
});

//Draw vertical walls
verticals.forEach((row, rowIndex) => {
    row.forEach((open, columnIndex) => {
        if (open) {
            return;
        }

        const wall = Bodies.rectangle(
            columnIndex * unitLengthX + unitLengthX,
            rowIndex * unitLengthY + unitLengthY / 2,
            5,
            unitLengthY,
            {
                label: 'wall',
                isStatic: true,
                render: {
                    fillStyle: 'red'
                }
            }
        );
        World.add(world, wall);
    });
});

//Draw the goal
const goal = Bodies.rectangle(
    width - unitLengthX / 2,
    height - unitLengthY / 2,
    unitLengthX * 0.7,
    unitLengthY * 0.7,
    {
        label: 'goal',
        isStatic: true,
        render: {
            fillStyle: 'green'
        }
    }
);
World.add(world, goal);

//Draw the player
const ballRadius = Math.min(unitLengthX, unitLengthY) / 4;
const ball = Bodies.circle(
    unitLengthX / 2,
    unitLengthY / 2,
    ballRadius,
    {
        label: 'player'
    }
);
World.add(world, ball);

//Controls
document.addEventListener('keydown', event => {
    const { x, y } = ball.velocity;

    if (event.keyCode === 87) {
        Body.setVelocity(ball, { x, y: y - 5 });
    }

    if (event.keyCode === 68) {
        Body.setVelocity(ball, { x: x + 5, y });
    }

    if (event.keyCode === 83) {
        Body.setVelocity(ball, { x, y: y + 5 });
    }

    if (event.keyCode === 65) {
        Body.setVelocity(ball, { x: x - 5, y });
    }
})

//Win condition
Events.on(engine, 'collisionStart', event => {
    event.pairs.forEach((collision) => {
        const labels = ['player', 'goal'];

        if (labels.includes(collision.bodyA.label) &&
            labels.includes(collision.bodyB.label)) {
                document.querySelector('.winner').classList.remove('hidden');
                world.gravity.y = 1;
                world.bodies.forEach(body => {
                    if (body.label === 'wall') {
                        Body.setStatic(body, false);
                    }
                });
        }
    });
});