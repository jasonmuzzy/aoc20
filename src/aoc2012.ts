import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let answer = 0;
    let x = 0;
    let y = 0;
    let d = 0;
    let wx = 10;
    let wy = 1;
    let tempx = 0;
    let tempy = 0;
    inputs.forEach(input => {
        const [action, value] = [input.substring(0, 1), parseInt(input.substring(1))];
        if (part === 1) {
            if (action === 'N' || (action === 'F' && d === 270)) y += value;
            else if (action === 'S' || (action === 'F' && d === 90)) y -= value;
            else if (action === 'E' || (action === 'F' && d === 0)) x += value;
            else if (action === 'W' || (action === 'F' && d === 180)) x -= value;
            else if (action === 'R') d = (d + value) % 360;
            else if (action === 'L') d = (d + 360 - value) % 360;
        } else {
            if (action === 'N') wy += value;
            else if (action === 'S') wy -= value;
            else if (action === 'E') wx += value;
            else if (action === 'W') wx -= value;
            else if (action === 'R' || action === 'L') {
                for (let i = 0; i < value; i += 90) {
                    tempx = wx;
                    wx = action === 'R' ? wy : -wy;
                    wy = action === 'R' ? -tempx : tempx;
                }
            } else if (action === 'F') {
                x += wx * value;
                y += wy * value;
            }
        }
    });
    answer = Math.abs(x) + Math.abs(y);
    return answer;
}

run(__filename, solve);