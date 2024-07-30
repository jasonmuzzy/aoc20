import { run } from 'aoc-copilot';

import { product, range, xyArray } from './utils';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let answer = 0;
    let cube: Map<string, number> = new Map();
    for (let [x, y] of xyArray(inputs)) {
        if (inputs[y].substring(x, x + 1) === '#') cube.set(`${x},${y},0,0`, 1);
    }
    let minx = 0, miny = 0, minz = 0, minw = 0;
    let maxx = inputs.length - 1, maxy = maxx, maxz = 0, maxw = 0;
    let state = 0;
    let count = 0;
    let newCube: Map<string, number>;
    for (let cycle = 0; cycle < 6; cycle++) {
        newCube = new Map();
        const xyzws = product(range(maxx - minx + 3).map(x => x + minx - 1), range(maxy - miny + 3).map(y => y + miny - 1), range(maxz - minz + 3).map(z => z + minz - 1), part === 1 ? [0] : range(maxw - minw + 3).map(w => w + minw - 1)) as number[][];
        for (let [x, y, z, w] of xyzws) {
            state = cube.get(`${x},${y},${z},${w}`) || 0;
            const nxyzws = product([x - 1, x, x + 1], [y - 1, y, y + 1], [z - 1, z, z + 1], part === 1 ? [0] : [w - 1, w, w + 1]);
            count = nxyzws.reduce((active, [x1, y1, z1, w1]) => active + ((x === x1 && y === y1 && z === z1 && w === w1) ? 0 : (cube.get(`${x1},${y1},${z1},${w1}`) || 0)), 0);
            if (count === 3 || (state === 1 && count === 2)) {
                newCube.set(`${x},${y},${z},${w}`, 1);
                if (x < minx) minx = x; if (x > maxx) maxx = x;
                if (y < miny) miny = y; if (y > maxy) maxy = y;
                if (z < minz) minz = z; if (z > maxz) maxz = z;
                if (w < minw) minw = w; if (w > maxw) maxw = w;
            }
        }
        cube = newCube;
    }
    answer = cube.size;
    return answer;
}

run(__filename, solve);