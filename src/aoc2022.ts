import { run } from 'aoc-copilot';

function winner(p1: number[], p2: number[], part: number) {
    const gameStates: string[] = [];
    let gameState = '';
    let player = 0;
    while (p1.length > 0 && p2.length > 0) {
        gameState = p1.join(',') + ';' + p2.join(',');
        if (gameStates.includes(gameState)) {
            player = 1;
            break;
        }
        if (part === 1 || p1[0] >= p1.length || p2[0] >= p2.length) player = p1[0] > p2[0] ? 1 : 2;
        else player = winner(p1.slice(1, p1[0] + 1), p2.slice(1, p2[0] + 1), part);
        if (player === 1) p1.push(...p1.splice(0, 1), ...p2.splice(0, 1));
        else p2.push(...p2.splice(0, 1), ...p1.splice(0, 1));
        gameStates.push(gameState);
    }
    return player;
}

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let answer: number | string = 0;
    const p1: number[] = [];
    const p2: number[] = [];
    let p = 1;
    inputs.forEach(input => {
        if (input === '') { }
        else if (input.startsWith('Player')) p = parseInt(input[7]);
        else p === 1 ? p1.push(parseInt(input)) : p2.push(parseInt(input));
    });
    winner(p1, p2, part);
    answer = [...p1, ...p2].reduce((score, card, i, a) => score + card * (a.length - i), 0);
    return answer;
}

run(__filename, solve);