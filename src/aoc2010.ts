import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let answer = 0;
    const adapters = [0].concat(inputs.map(e => parseInt(e)).sort((a, b) => a - b)); // Add 0 at the start for the wall
    adapters.push(Math.max(...adapters) + 3); // Add max+3 to the end for the device
    const diffs = adapters.map((v, i) => i === 0 ? 0 : v - adapters[i - 1]);
    if (part === 1) {
        const agg = diffs.reduce((p, c) => (p[c] = (p[c] || 0) + 1, p), {} as { [key: number]: number });
        answer = agg[1] * agg[3];
    } else {
        // Input is crafted so that differences of 1 only occur in groups of 1-4, corresponding to 1, 2, 4 or 7 possible combinations in each group
        answer = diffs
            .map((v, i, a) => i > 0 && v === 1 && a[i - 1] === 1 ? 1 : 0 as number) // 2nd, 3rd or 4th 1 in group
            .reduce((p, v, i, a) => {
                if (i > 0 && v === 1 && p[i - 1] === 1) p.push(2);
                else if (i > 0 && v === 1 && p[i - 1] === 2) p.push(4);
                else if (i > 0 && v === 1 && p[i - 1] === 4) p.push(7);
                else p.push(1);
                return p;
            }, [] as number[]) // (2nd, 3rd, 4th) 1 mapped to (2, 4, 7) else 1
            .map((v, i, a) => i < a.length - 1 && v < a[i + 1] ? 1 : v) // Max of group (2, 4 or 7)
            .reduce((p, c) => p * c, 1 as number); // Multiply it out
    }
    return answer;
}

run(__filename, solve);