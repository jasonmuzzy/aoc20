import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let answer = 0;
    if (part === 1) {
        const earliest = parseInt(inputs[0]);
        const buses = inputs[1].split(',').filter(input => input != 'x').map(input => parseInt(input));
        const next = buses.reduce((pv, bus) => {
            const time = Math.ceil(earliest / bus) * bus;
            return time < pv.time ? { bus, time } : pv;
        }, { bus: 0, time: Infinity });
        answer = next.bus * (next.time - earliest);
    } else {
        const buses = inputs[1].split(',').reduce((pv, cv, i) => {
            if (cv != 'x') pv.push([parseInt(cv), i]);
            return pv;
        }, [] as number[][]);
        if (buses.length > 0) {
            const ref = buses.pop()!;
            let base = 0;
            let [b, l] = ref;
            while (buses.length > 0) {
                const next = buses.pop()!;
                for (let t = base + b; ; t += b) {
                    if ((t - l + next[1]) % next[0] === 0) {
                        base = t;
                        b *= next[0];
                        break;
                    }
                }
            }
            answer = base - l;
        }
    }
    return answer;
}

run(__filename, solve);