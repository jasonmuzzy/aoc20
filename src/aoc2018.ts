import { run } from 'aoc-copilot';

function mathit(expression: string, part: number) {
    let answer = 0;
    let op = '+';
    let plus = -1;
    const tokens = expression.split(' ').filter(t => t != '');
    if (part === 2) { // Addition has priority
        plus = tokens.indexOf('+');
        while (plus > -1) {
            tokens.splice(plus - 1, 3, (parseInt(tokens[plus - 1]) + parseInt(tokens[plus + 1])).toString());
            plus = tokens.indexOf('+');
        }
    }
    for (let token of tokens) {
        if (['+', '*'].includes(token)) op = token;
        else if (op === '+') answer += parseInt(token);
        else answer *= parseInt(token);
    }
    return answer;
}

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let answer = 0;
    let cp = -1;
    let op = -1;
    let exp = '';
    for (let input of inputs) {
        cp = input.indexOf(')');
        while (cp > -1) {
            op = input.lastIndexOf('(', cp);
            exp = input.substring(op + 1, cp);
            input = input.slice(0, op) + mathit(exp, part).toString() + input.slice(cp + 1);
            cp = input.indexOf(')');
        }
        answer += mathit(input, part);
    }
    return answer;
}

run(__filename, solve);