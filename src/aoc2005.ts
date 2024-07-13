import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key:string]: string }): Promise<number | string> {
    let answer = 0;
    const ids: number[] = [];
    inputs.forEach(input => {
        const id = parseInt(input.split('').map(c => c === 'B' || c === 'R' ? '1' : '0').join(''), 2);
        if (part === 1) answer = Math.max(answer, id);
        else ids.push(id);
    });
    if (part === 2) {
        ids.sort((a, b) => a - b);
        for (let i = 1; i < ids.length; i++) {
            if (ids[i] - ids[i - 1] > 1) {
                answer = ids[i] - 1;
                break;
            }
        }
    }
    return answer;
}

run(__filename, solve);