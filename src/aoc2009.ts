import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key:string]: string }): Promise<number | string> {
    let answer = 0;
    const window = test ? 5 : 25;
    const nums = inputs.map(n => parseInt(n));
    let i = window;
    for (; i < nums.length; i++) {
        answer = nums[i];
        let valid = false;
        for (let j = i - window; j < i - 1; j++) {
            for (let k = j + 1; k < i; k++) {
                if (nums[j] + nums[k] === answer) {
                    valid = true;
                    break;
                }
                if (valid) break;
            }
        }
        if (!valid) break;
    }
    if (part === 2) {
        for (let j = 0; j < i - 1; j++) {
            let sum = nums[j];
            let min = sum;
            let max = sum;
            for (let k = j + 1; k < i; k++) {
                min = Math.min(min, nums[k]);
                max = Math.max(max, nums[k]);
                sum += nums[k];
                if (sum >= answer) break;
            }
            if (sum === answer) {
                answer = min + max;
                break;
            }
        }
    }
    return answer;
}

run(__filename, solve);