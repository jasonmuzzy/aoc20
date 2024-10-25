import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key:string]: string }): Promise<number | string> {
    let answer = 0;
    for (let i = 0; i < inputs.length; i++) {
        for (let j = i + 1; j < inputs.length; j++) {
            if (part == 1) {
                if (parseInt(inputs[i]) + parseInt(inputs[j]) == 2020) {
                    answer = parseInt(inputs[i]) * parseInt(inputs[j]);
                    break;
                }
            } else {
                for (let k = j + 1; k < inputs.length; k++) {
                    if (parseInt(inputs[i]) + parseInt(inputs[j]) + parseInt(inputs[k]) == 2020) {
                        answer = parseInt(inputs[i]) * parseInt(inputs[j]) * parseInt(inputs[k]);
                        break;
                    }
                }
            }
        }
        if (!!answer) break;
    }
    return answer;
}

run(__filename, solve);