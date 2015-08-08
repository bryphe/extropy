module HashTable {
    
    export function create<T>(): HashTable<T> {
        return Object.create(null);
    }

}