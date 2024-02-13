// Funksjon for å legge til en "separator i lister".
// interpose([1,2,3], 4)
// => [1,4,2,4,3]
// https://stackoverflow.com/questions/37128624/terse-way-to-intersperse-element-between-all-elements-in-javascript-array#comment125426690_37129103
export function interpose<T>(arr: T[], sep: T): T[] {
    return arr.reduce((a: T[], v: T) => [...a, v, sep], []).slice(0, -1);
}

// Funksjon for å slå sammen flere lister
// interleave([1,2,3], [4,5,6], [7,8,9])
// => [1,4,7,2,5,8,3,6,9]
export function interleave<T>(...arrays: T[][]): T[] {
    let acc: T[] = [];
    for (let i = 0; i < Math.min(...arrays.map((arr) => arr.length)); i++) {
        acc = acc.concat(arrays.flatMap((arr) => arr[i]));
    }
    return acc;
}
