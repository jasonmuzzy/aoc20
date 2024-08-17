import { run } from 'aoc-copilot';

function flip(pixels: string[], direction: 'h' | 'v') {
    return direction === 'v'
        ? pixels.toReversed()
        : pixels.map(r => r.split('').reverse().join(''));
}

function rotate(pixels: string[]) {
    return [...Array(pixels[0].length).keys()].reduce((grid, x) => {
        grid.push([...Array(pixels.length).keys()].reverse().reduce((row, y) => {
            return row + pixels[y][x];
        }, ''));
        return grid;
    }, [] as string[])
}

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let answer = 0;
    type Tile = { id: string, pixels: string[], edges: string[], reverseEdges: string[], x: number, y: number, u?: Tile, d?: Tile, l?: Tile, r?: Tile };
    const stack: Tile[] = [];
    inputs.forEach(input => {
        if (input === '') { }
        else if (/Tile \d+/.test(input)) stack.push({ id: input.match(/\d+/g)![0], pixels: [], edges: [], reverseEdges: [], x: Infinity, y: Infinity });
        else stack.at(-1)?.pixels.push(input);
    });
    Object.assign(stack.at(-1)!, { x: 0, y: 0 });
    const rightEdge = (pixels: string[]) => pixels.reduce((pv, cv) => pv + cv.substring(cv.length - 1, cv.length), '');
    const leftEdge = (pixels: string[]) => pixels.reduce((pv, cv) => pv + cv.substring(0, 1), '');
    const topEdge = (pixels: string[]) => pixels[0];
    const bottomEdge = (pixels: string[]) => pixels.at(-1)!;
    const match = (edge: string, edgeFn: (pixels: string[]) => string) => stack.findIndex(tile => {
        for (let i = 0; i < 8; i++) {
            if (edgeFn(tile.pixels) === edge) return true;
            else if (tile.x < Infinity) return false; // Don't rotate an already placed tile
            else if (i === 3) tile.pixels = flip(tile.pixels, 'v');
            else tile.pixels = rotate(tile.pixels);
        }
        return false;
    });
    const tiles: Tile[] = [];
    while (stack.length > 0) {
        const tile = stack.pop()!;
        if (tile.u === undefined) {
            const i = match(topEdge(tile.pixels), bottomEdge);
            if (i > -1) {
                tile.u = stack[i];
                Object.assign(stack[i], { x: tile.x, y: tile.y - 1, d: tile });
                stack.push(...stack.splice(i, 1)); // Sift down
            }
        }
        if (tile.d === undefined) {
            const i = match(bottomEdge(tile.pixels), topEdge);
            if (i > -1) {
                tile.d = stack[i];
                Object.assign(stack[i], { x: tile.x, y: tile.y + 1, u: tile });
                stack.push(...stack.splice(i, 1)); // Sift down
            }
        }
        if (tile.l === undefined) {
            const i = match(leftEdge(tile.pixels), rightEdge);
            if (i > -1) {
                tile.l = stack[i];
                Object.assign(stack[i], { x: tile.x - 1, y: tile.y, r: tile });
                stack.push(...stack.splice(i, 1)); // Sift down
            }
        }
        if (tile.r === undefined) {
            const i = match(rightEdge(tile.pixels), leftEdge);
            if (i > -1) {
                tile.r = stack[i];
                Object.assign(stack[i], { x: tile.x + 1, y: tile.y, l: tile });
                stack.push(...stack.splice(i, 1)); // Sift down
            }
        }
        tiles.push(tile);
    }
    if (part === 1) {
        answer = tiles.reduce((product, tile) => product * ((!tile.l && !tile.u) || (!tile.r && !tile.u) || (!tile.l && !tile.d) || (!tile.r && !tile.d) ? parseInt(tile.id) : 1), 1);
    } else {
        let minx = Math.min(...tiles.map(tile => tile.x));
        let miny = Math.min(...tiles.map(tile => tile.y));
        tiles.forEach(tile => (tile.x -= minx, tile.y -= miny)); // Rebase
        tiles.sort((a, b) => a.y === b.y ? a.x - b.x : a.y - b.y);
        let image = [...Array(Math.sqrt(tiles.length)).keys()].reduce((img, imgy) => {
            img.push(...tiles.filter(d => d.y === imgy).reduce((imgblock, tile) => {
                if (imgblock.length === 0) {
                    imgblock.push(...tile.pixels
                        .filter((row, i) => i > 0 && i < tile.pixels.length - 1) // Exclude top and bottom edges
                        .map(row => row.substring(1, row.length - 1)) // Exclude left and right edges
                    );
                } else {
                    for (let i = 0; i < imgblock.length; i++) {
                        imgblock[i] += tile.pixels[i + 1].substring(1, tile.pixels[i + 1].length - 1);
                    };
                }
                return imgblock;
            }, [] as string[]));
            return img;
        }, [] as string[]);
        // Use lookahead (?=) to avoid consuming matches for cases where there are more than one sea monster on a line
        const regex = new RegExp(`(?=..................#..[.|#|\n]{${test ? 4 : 76}}#....##....##....###.[.|#|\n]{${test ? 4 : 76}}.#..#..#..#..#..#...)`, "g");
        const totalHashes = image.join('').split('.').join('').length;
        let seaMonsters = 0; 
        for (let i = 0; i < 8; i++) {
            seaMonsters = image.join('\n').match(regex)?.length || 0;
            if (seaMonsters > 0) {
                answer = totalHashes - (seaMonsters * 15); // 15 hashes in sea monster
            };
            if (i === 3) image = flip(image, 'v');
            else image = rotate(image);
        }
    }
    return answer;
}

run(__filename, solve);