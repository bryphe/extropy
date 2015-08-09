module Extropy {
    export interface IJsonSerializer<T> {
        
        serialize(obj: T): string;
        deserialize(json: string): T;
    }
}