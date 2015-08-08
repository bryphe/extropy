module Extropy {
    export class DefaultSerializer implements IJsonSerializer<any> {
        
        public serialize(obj: any): string {
            return JSON.stringify(obj);
        }

        public deserialize(json: string): any {
            if (!json)
                return null;

            return JSON.parse(json);
        }

    }
}