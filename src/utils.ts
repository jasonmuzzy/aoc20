// Adapted from https://gist.github.com/kpman/9981f19fea2670b9d60057ce9debdfff
export function product(...args: any[]): any[][] {
    return args.reduce((pv, cv) => {
        let temp: any[] = [];
        pv.forEach((a0: any) => {
            cv.forEach((a1: any) => {
                temp.push(a0.concat(a1));
            });
        });
        return temp;
    }, [[]]);
}

// https://stackoverflow.com/questions/8273047/javascript-function-similar-to-python-range/37980601#comment79356810_37980601
export function range(n: number, offset = 0): number[] {
    return [...Array(n).keys()].map(e => e + offset);
}

export function xyArray(a: any[]): number[][] {
    return a.length == 0
        ? []
        : product(range(a[0].length), range(a.length));
}
