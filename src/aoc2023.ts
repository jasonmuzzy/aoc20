import { run } from 'aoc-copilot';

// Linked list
async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let answer: number | string = 0;
    let current = 0, next0 = 0, next1 = 0, next2 = 0, destination = 0, temp = 0;
    const ll = inputs[0].split('').reduce((p, c, i, a) => {
        if (i === 0) current = parseInt(a[i]);
        p[parseInt(c)] = i < a.length - 1 ? parseInt(a[i + 1]) : current;
        return p;
    }, [] as number[]);
    if (part === 2) {
        ll[ll.indexOf(current)] = 10;
        for (let i = 10; i <= 1000000; i++) ll[i] = i + 1;
        ll[1000000] = current;
    }
    for (let move = 0; move < (part === 1 ? 100 : 10000000); move++) {
        next0 = ll[current];
        next1 = ll[next0];
        next2 = ll[next1];
        destination = current;
        do {
            destination--;
            if (destination < 1) destination = (part === 1 ? 9 : 1000000);
        } while (destination === next0 || destination === next1 || destination === next2)
        temp = ll[next2];
        ll[next2] = ll[destination];
        ll[destination] = ll[current];
        ll[current] = temp;
        current = ll[current];
    }
    if (part === 1) {
        answer = '';
        let next = ll[1];
        do {
            answer += next.toString();
            next = ll[next];
        } while (next != 1);
    } else answer = ll[1] * ll[ll[1]];
    return answer;
}

run(__filename, solve);