import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let answer = 0;
    let instructions = [...inputs];
    for (const i of instructions.reduce((pv, cv, i) => ['jmp', 'nop'].includes(cv.split(' ')[0]) ? pv.concat([i]) : pv, [] as number[])) {
        if (part === 2) {
            answer = 0;
            const [op, arg] = instructions[i].split(' ');
            instructions[i] = `${op === 'jmp' ? 'nop' : 'jmp'} ${arg}`;
        }
        const visiteds: number[] = [];
        let j = 0;
        while (j < instructions.length && visiteds.indexOf(j) === -1) {
            visiteds.push(j);
            const [op, arg] = instructions[j].split(' ');
            if (op === 'jmp') {
                j += Number(arg);
                continue;
            }
            if (op === 'acc') answer += Number(arg);
            j++;
        }
        if (part === 1 || j === instructions.length) break;
        else instructions = [...inputs];
    };
    return answer;
}

run(__filename, solve);