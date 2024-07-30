import { run } from 'aoc-copilot';

type Field = {
    id: string,
    f1: number,
    t1: number,
    f2: number,
    t2: number,
    i: number
}

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let answer = 0;
    let section = 'fields';
    const fields: Field[] = [];
    let mine: number[] = [];
    const tickets: number[][] = [];
    inputs.forEach(input => {
        if (input === '' || input === 'your ticket:' || input === 'nearby tickets:') {
            section = input;
        } else if (section === 'fields') {
            const { id, f1, t1, f2, t2 } = /(?<id>.+): (?<f1>\d+)-(?<t1>\d+) or (?<f2>\d+)-(?<t2>\d+)/gm.exec(input)!.groups as { id: string, f1: string, t1: string, f2: string, t2: string };
            fields.push({ id, f1: parseInt(f1), t1: parseInt(t1), f2: parseInt(f2), t2: parseInt(t2), i: -1 });
        } else if (section === 'your ticket:') {
            mine = input.split(',').map(e => parseInt(e));
        } else if (section === 'nearby tickets:') {
            tickets.push(input.split(',').map(e => parseInt(e)));
        }
    });
    if (part === 1) {
        answer = tickets.flat().reduce((sum, v) => {
            sum += fields.findIndex(field => (v >= field.f1 && v <= field.t1) || (v >= field.f2 && v <= field.t2)) === -1 ? v : 0;
            return sum;
        }, 0);
    } else {
        // Process of elimination to match up valid ticket values with possible fields
        const valids = tickets.filter(ticket => ticket.every(v => fields.findIndex(field => (v >= field.f1 && v <= field.t1) || (v >= field.f2 && v <= field.t2)) != -1));
        const positions = [...Array(valids[0].length).keys()];
        while (positions.length > 0) {
            const [pos] = positions.splice(0, 1);
            const possFields = fields.filter(f => f.i === -1 && valids.every(v => (v[pos] >= f.f1 && v[pos] <= f.t1) || (v[pos] >= f.f2 && v[pos] <= f.t2)));
            if (possFields.length === 1) possFields[0].i = pos; // Found the only possible match
            else positions.push(pos); // Put it back at the end
        }
        answer = fields.filter(f => f.id.startsWith('departure')).reduce((product, field) => product *= mine[field.i], 1);
    }
    return answer;
}

run(__filename, solve);