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
