//Import Matter.js library
const { Engine, Render, Runner, World, Bodies } = Matter;

//Canvas dimensions
const width = 600;
const height = 600;

//Maze dimension (rows * columns)
const cells = 3;

//Create new engine, world and renderer and specify their properties
const engine = Engine.create();
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
    Bodies.rectangle(width / 2, 0, width, 40, { isStatic: true }),
    Bodies.rectangle(width / 2, height, width, 40, { isStatic: true }),
    Bodies.rectangle(0, height / 2, 40, height, { isStatic: true }),
    Bodies.rectangle(width, height / 2, 40, height, { isStatic: true })
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
const grid = Array(cells).fill(null).map(() => Array(cells).fill(false));

//Walls
const verticals = Array(cells).fill(null).map(() => Array(cells - 1).fill(false));
const horizontals = Array(cells - 1).fill(null).map(() => Array(cells).fill(false));

//Generate random starting position
const startRow = Math.floor(Math.random() * cells);
const startColumn = Math.floor(Math.random() * cells);

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
        if (nextRow < 0 || nextRow >= cells || nextColumn < 0 || nextColumn >= cells) {
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
    }
}

move(startRow, startColumn);