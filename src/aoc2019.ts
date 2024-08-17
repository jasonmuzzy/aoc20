import { run } from 'aoc-copilot';

type Rule = { id: string, fx: string, or: boolean }

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let answer = 0;
    let section = 'rules';
    const messages: string[] = [];
    const stack: [string, string][] = [];
    const rules: Rule[] = [];
    inputs.forEach(input => {
        if (input === '') section = 'messages';
        else if (section === 'messages') messages.push(input);
        else {
            const colon = input.indexOf(':');
            if (/"[ab]"/.test(input)) stack.push([
                input.substring(0, colon),
                input.substring(colon + 3, colon + 4)]);
            else rules.push({
                id: input.substring(0, colon),
                fx: input.substring(colon + 2),
                or: input.includes('|')});
        };
    });
    let rule31 = '';
    let rule42 = '';
    while (stack.length > 0 && rules.length > 0) {
        const [id, fx] = stack.pop()!;
        for (let i = rules.length - 1; i >= 0; i--) { // Backwards so we can remove items
            let fullyReplaced = true;
            rules[i].fx = rules[i].fx.split(' ').map((t, i2, a) => {
                if (t === id) {
                    if (part === 2 && id === '42' && rules[i].id === '8') return `${fx}+`;
                    else return fx;
                } else {
                    if (/\d/.test(t)) fullyReplaced = false;
                    return t;
                }
            }).join(' ');
            if (fullyReplaced) {
                rules[i].fx = rules[i].fx.replace(/ /g, '');
                if (rules[i].or) rules[i].fx = `(?:${rules[i].fx})`;
                if (rules[i].id === '31') rule31 = rules[i].fx;
                if (rules[i].id === '42') rule42 = rules[i].fx;
                if (part === 2 && rules[i].id === '11') {
                    // No regex recursion support in JavaScript, so manually add 1, 2, 3 or 4 nestings of rules 42 and 31
                    rules[i].fx = '(?:'
                        + rule42 + rule31 + '|'
                        + rule42 + rule42 + rule31 + rule31 + '|'
                        + rule42 + rule42 + rule42 + rule31 + rule31 + rule31 + '|'
                        + rule42 + rule42 + rule42 + rule42 + rule31 + rule31 + rule31 + rule31
                        + ')';
                }
                stack.push([rules[i].id, rules[i].fx]);
                rules.splice(i, 1);
            }
        }
    }
    const regex = new RegExp('^' + stack[0][1] + '$');
    answer = messages.reduce((count, m) => count + (regex.test(m) ? 1 : 0), 0);
    return answer;
}

run(__filename, solve);