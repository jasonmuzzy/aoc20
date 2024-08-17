import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let answer: number | string = 0;
    let tiles: Set<string> = new Set();
    inputs.forEach(input => {
        let y = 0, x = 0, offset = 0;
        while (offset < input.length) {
            if (input.substring(offset).startsWith('e')) (x += 2, offset += 1);
            else if (input.substring(offset).startsWith('w')) (x -= 2, offset += 1);
            else if (input.substring(offset).startsWith('ne')) (y -= 1, x += 1, offset += 2);
            else if (input.substring(offset).startsWith('nw')) (y -= 1, x -= 1, offset += 2);
            else if (input.substring(offset).startsWith('se')) (y += 1, x += 1, offset += 2);
            else if (input.substring(offset).startsWith('sw')) (y += 1, x -= 1, offset += 2);
        }
        if (tiles.has(`${y},${x}`)) tiles.delete(`${y},${x}`);
        else tiles.add(`${y},${x}`);
    });
    if (part === 2) {
        let x = 0, y = 0, coords = '', count = 0;
        let neighbors: Map<string, number> = new Map();
        const nextTiles: Set<string> = new Set();
        for (let day = 0; day < 100; day++) {
            neighbors.clear();
            tiles.forEach(tile => {
                ([y, x] = tile.split(',').map(e => parseInt(e)));
                [
                    [y - 1, x - 1],
                    [y - 1, x + 1],
                    [y, x - 2],
                    [y, x + 2],
                    [y + 1, x - 1],
                    [y + 1, x + 1]
                ].forEach(([ny, nx]) => {
                    coords = `${ny},${nx}`;
                    count = neighbors.get(coords) || 0;
                    neighbors.set(coords, count + 1);
                });
            });
            nextTiles.clear();
            neighbors.forEach((count, neighbor) => {
                if ((tiles.has(neighbor) && count >= 1 && count <= 2) || (!tiles.has(neighbor) && count === 2)) nextTiles.add(neighbor);
            });
            tiles = new Set([...nextTiles]);
        }
    }
    answer = tiles.size;
    return answer;
}

run(__filename, solve);