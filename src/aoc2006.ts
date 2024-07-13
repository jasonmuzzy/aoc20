import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key:string]: string }): Promise<number | string> {
    let answer = 0;
    let group: string[] = [];
    inputs.forEach((input, i) => {
        if (input != '') {
            if (part === 1) input.split('').forEach(c => group.push(c));
            else group.push(input);
        }
        if (input === '' || i === inputs.length - 1) {
            if (part === 1) answer += group.filter((v, i, a) => a.indexOf(v) === i).length;
            else {
                group.flatMap(g => g.split('')).filter((v, i, a) => a.indexOf(v) === i).forEach(u => {
                    if (group.every(g => g.includes(u))) answer++;
                });
            }
            group = [];
        }
    });
    return answer;
}

run(__filename, solve);