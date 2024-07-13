import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let answer = 0;
    const slopes = [
        { x: 3, y: 1 },
        { x: 1, y: 1 },
        { x: 5, y: 1 },
        { x: 7, y: 1 },
        { x: 1, y: 2 }
    ];
    answer = 1; // Start with 1 to avoid multiplying by 0
    for (const slope of slopes) {
        let { x, y } = slope;
        let trees = 0;
        while (y < inputs.length) {
            if (inputs[y][x] === '#') trees++;
            x = (x + slope.x) % inputs[y].length;
            y += slope.y;
        }
        answer *= trees;
        if (part === 1) break;
    }
    return answer;
}

run(__filename, solve);