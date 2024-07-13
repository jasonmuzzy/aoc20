import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let answer = 0;
    let kvs: string[][] = [];
    for (const kv of inputs.map(e => e.split(' ')).flatMap(e => e.map(e => e.split(':'))).concat([''])) {
        if (kv.length === 2) {
            kvs.push([...kv]);
        } else {
            if (['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'].every(e => kvs.map(e => e[0]).includes(e))) {
                if (part === 1) answer++;
                else {
                    if (kvs.every(e => {
                        switch (e[0]) {
                            case 'byr':
                                return e[1].length === 4 && parseInt(e[1]) >= 1920 && parseInt(e[1]) <= 2002;
                            case 'iyr':
                                return e[1].length === 4 && parseInt(e[1]) >= 2010 && parseInt(e[1]) <= 2020;
                            case 'eyr':
                                return e[1].length === 4 && parseInt(e[1]) >= 2020 && parseInt(e[1]) <= 2030;
                            case 'hgt':
                                if (e[1].endsWith('cm')) {
                                    return parseInt(e[1].slice(0, -2)) >= 150 && parseInt(e[1].slice(0, -2)) <= 193;
                                } else if (e[1].endsWith('in')) {
                                    return parseInt(e[1].slice(0, -2)) >= 59 && parseInt(e[1].slice(0, -2)) <= 76;
                                } else {
                                    return false;
                                }
                            case 'hcl':
                                return /^#[0-9a-f]{6}$/.test(e[1]);
                            case 'ecl':
                                return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(e[1]);
                            case 'pid':
                                return /^[0-9]{9}$/.test(e[1]);
                            case 'cid':
                                return true;
                            default:
                                return false;
                        }
                    })) {
                        answer++;
                    }
                
                }
            }
            kvs = [];
        }
    }
    return answer;
}

run(__filename, solve);