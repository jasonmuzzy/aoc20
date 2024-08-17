import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key:string]: string }): Promise<number | string> {
    let answer: number | string = 0;
    const pkc = parseInt(inputs[0]);
    const pkd = parseInt(inputs[1]);
    let v = 1;
    let ls = 0;
    while (true) {
        ls++;
        v *= 7;
        v %= 20201227;
        if (v === pkc) {
            break;
        }
    }
    answer = 1;
    for (let i = 0; i < ls; i++) {
        answer *= pkd;
        answer %= 20201227;
    }
    return answer;
}

run(__filename, solve);