interface HashTable<T> {
    [idx: string]: T;
}

module HashTable {

    export function create<T>(): HashTable<T> {
        return Object.create(null);
    }

}
