import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let answer = 0;
    inputs.forEach(line => {
        const policy = [...line.matchAll(/(\d+)-(\d+) (.): (.*)/gm)].flat().reduce(
            (pv, cv, i) => {
                if (i === 1) pv.from = parseInt(cv);
                else if (i === 2) pv.to = parseInt(cv);
                else if (i === 3) pv.letter = cv;
                else if (i === 4) pv.pw = cv;
                return pv;
            }, { from: 0, to: 0, letter: '', pw: '' }
        );
        if (part == 1) {
            const n = policy.pw.match(new RegExp(policy.letter, 'g'))?.length || 0;
            if (n >= policy.from && n <= policy.to) answer++;
        } else {
            if (
                (
                    policy.pw[policy.from - 1] === policy.letter ||
                    policy.pw[policy.to - 1] === policy.letter
                ) && (
                    policy.pw[policy.from - 1] != policy.letter ||
                    policy.pw[policy.to - 1] != policy.letter
                )
            ) answer++;
        }
    });
    return answer;
}

run(__filename, solve);