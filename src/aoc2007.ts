import { run } from 'aoc-copilot';

function recurse(bag: string, pairs: [string, number, string][]): number {
    // No memoization needed -- only improves runtime by < 0.001s for actual inputs
    let total = 1;
    total += pairs.filter(([outer, ...rest]) => outer === bag)
        .reduce((acc, [_, qty, inner]) => acc + qty * recurse(inner, pairs), 0);
    return total;
}

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let answer = 0;
    let pairs: [string, number, string][] = [];
    inputs.forEach(input => {
        const rules = input.split(/\scontain\sno\sother\sbags\.|\scontain\s|,\s|\./gm).slice(0, -1);
        const [quality, color] = rules[0].split(' ');
        for (let i = 1; i < rules.length; i++) {
            const [qty, inQuality, inColor] = rules[i].split(' ');
            pairs.push([`${quality} ${color}`, parseInt(qty), `${inQuality} ${inColor}`]);
        }
    });
    if (part === 1) {
        const outers: string[] = [];
        let added = pairs.filter(([_, qty, inner]) => inner === 'shiny gold').map(([outer, _]) => outer).filter((v, i, a) => a.indexOf(v) === i);
        while (added.length > 0) {
            outers.push(...added);
            let temp = pairs.filter(([_, qty, inner]) => added.includes(inner)).map(([outer, _]) => outer).filter((v, i, a) => a.indexOf(v) === i);
            added = temp.filter(t => !outers.includes(t));
        }
        answer = outers.length;
    } else {
        answer = recurse('shiny gold', pairs) - 1;
    }
    return answer;
}

run(__filename, solve);