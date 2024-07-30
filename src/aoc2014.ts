import { run } from 'aoc-copilot';

function recurse(addr: string[], from: number, addrs: number[]) {
    let done = true;
    for (let i = from; i < addr.length; i++) {
        if (addr[i] === 'X') {
            done = false;
            const addr2 = [...addr];
            addr2.splice(i, 1, '0');
            recurse(addr2, i + 1, addrs);
            addr2.splice(i, 1, '1');
            recurse(addr2, i + 1, addrs);
            break;
        }
    }
    if (done) addrs.push(parseInt(addr.join(''), 2));
}

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let answer = 0;
    let mask: string[] = [];
    let mem: Map<number, number> = new Map();
    inputs.forEach(input => {
        if (input.substring(0, 4) === 'mask') mask = input.substring(7, 7 + 36).split('');
        else {
            const [addr, val] = input.match(/\d+/g)!.map(e => parseInt(e));
            if (part === 1) {
                let bin = val.toString(2).padStart(36, '0').split('');
                for (let [i, m] of mask.entries()) if (m != 'X') bin[i] = m;
                mem.set(addr, parseInt(bin.join(''), 2));
            } else {
                const maskAddr = addr.toString(2).padStart(36, '0').split('');
                for (let [i, bit] of mask.entries()) if (bit != '0') maskAddr[i] = bit;
                let addrs: number[] = [];
                recurse(maskAddr, 0, addrs);
                for (let addr of addrs) mem.set(addr, val);
            }
        }
    });
    answer = [...mem].reduce((pv, cv) => pv + cv[1], 0);
    return answer;
}

run(__filename, solve);