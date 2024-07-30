import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let answer = 0;
    const lasts: Map<number, number> = new Map();
    let last: number | undefined;
    let say = 0;
    let said = 0;
    let count = 0;
    inputs[0].split(',').map(e => parseInt(e)).forEach(starter => {
        said = say;
        if (count > 0) lasts.set(said, count);
        say = starter;
        // part === 1 && console.info(`${count.toString().padStart(4, ' ')}: ${say} (starter)`);
        count++
    })
    while (count < (part === 1 ? 2020 : 30_000_000)) {
        said = say;
        last = lasts.get(said);
        if (last === undefined) say = 0;
        else say = count - last;
        // part === 1 && console.info(`${count.toString().padStart(4, ' ')}: ${say}`);
        lasts.set(said, count);
        count++;
        if (count === 1000) {
            if (1 === 1) {}
        }
    }
    answer = say;
    return answer;
}

run(__filename, solve);