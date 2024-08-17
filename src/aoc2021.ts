import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let answer: number | string = 0;
    const foods: { ingredients: string[], allergens: string[] }[] = [];
    inputs.forEach((input, food) => {
        const [lhs, rhs] = input.substring(0, input.length - 1).split(' (contains ');
        foods.push({ ingredients: lhs.split(' '), allergens: rhs.split(', ') });
    });
    const ingredients = foods.flatMap(food => food.ingredients).filter((v, i, a) => i === a.indexOf(v));
    const allergens = foods.flatMap(food => food.allergens).filter((v, i, a) => i === a.indexOf(v)).map(allergen => ({ allergen, candidates: [...ingredients], eliminateds: [] as string[], ingredient: '' }))
    foods.forEach(food => {
        const notIngredients = ingredients.filter(ingredient => !food.ingredients.includes(ingredient));
        allergens.filter(allergen => food.allergens.includes(allergen.allergen)).forEach(allergen => {
            notIngredients.forEach(notIngredient => {
                if (allergen.candidates.includes(notIngredient)) {
                    allergen.candidates.splice(allergen.candidates.indexOf(notIngredient), 1);
                    allergen.eliminateds.push(notIngredient);
                }
            })
        });
    });
    let progress = true;
    while (progress) {
        progress = false;
        for (const [i1, allergen1] of allergens.entries()) {
            if (allergen1.candidates.length === 1) {
                progress = true;
                allergen1.ingredient = allergen1.candidates[0];
                allergen1.candidates.pop();
                allergens.filter((v, i2) => i2 != i1).forEach(allergen2 => {
                    if (allergen2.candidates.includes(allergen1.ingredient)) {
                        allergen2.candidates.splice(allergen2.candidates.indexOf(allergen1.ingredient), 1);
                        allergen2.eliminateds.push(allergen1.ingredient);
                    }
                });
                break;
            }
            if (progress) break;
        };
    }
    if (part === 1) {
        const safes = ingredients.filter(ingredient => !allergens.some(allergen => allergen.ingredient === ingredient));
        answer = foods.reduce((count, food) => safes.reduce((p2, safe) => p2 + (food.ingredients.includes(safe) ? 1 : 0), count), 0);
    } else {
        answer = allergens.sort((a, b) => a.allergen < b.allergen ? -1 : 1).map(allergen => allergen.ingredient).join(',');
    }
    return answer;
}

run(__filename, solve);