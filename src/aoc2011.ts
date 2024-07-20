import { run } from 'aoc-copilot';

function occupied(seats: string[][], x: number, y: number, xplus: number, yplus: number, part: number) {
    let nextx = x + xplus;
    let nexty = y + yplus;
    let seat = '.';
    while (nextx >= 0 && nexty >= 0 && nextx < seats[y].length && nexty < seats.length) {
        seat = seats[nexty][nextx];
        if (part === 1 || seat != '.') break;
        nextx = nextx + xplus;
        nexty = nexty + yplus;
    }
    return seat === '#' ? 1 : 0;
}

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key:string]: string }): Promise<number | string> {
    let answer = 0;
    let seats = inputs.map(input => input.split(''));
    while (true) {
        const nextSeats = seats.map(row => [...row]);
        for (let y = 0; y < seats.length; y++) {
            for (let x = 0; x < seats[y].length; x++) {
                if (seats[y][x] === '.') continue;
                const count = [[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1]].reduce((p, c) => {
                    const [xplus, yplus] = c;
                    return p + occupied(seats, x, y, xplus, yplus, part);
                }, 0);
                if (seats[y][x] === 'L' && count === 0) nextSeats[y][x] = '#';
                else if (seats[y][x] === '#' && count >= (part === 1 ? 4 : 5)) nextSeats[y][x] = 'L';
            }
        }
        if (seats.map(row => row.join('')).join('') === nextSeats.map(row => row.join('')).join('')) break;
        seats = [...nextSeats];
    }
    answer = seats.flat().filter(e => e === '#').length;
    return answer;
}

run(__filename, solve);