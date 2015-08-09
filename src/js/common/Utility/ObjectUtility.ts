module Extropy {
    export class ObjectUtility {
        
        public static getAllPropertyInfo(object: any): IPropertyInfo[] {

            var ret: IPropertyInfo[] = [];

            for (var o = object; o !== null; o = Object.getPrototypeOf(o)) {

                var properties = Object.getOwnPropertyNames(o);

                for (var i = 0; i < properties.length; i++) {
                    var p = properties[i];
                    var propertyInfo = Object.getOwnPropertyDescriptor(o, p);

                    if (propertyInfo && propertyInfo.get && propertyInfo.set) {
                        var pi = { name: p, gettable: !isNullOrUndefined(propertyInfo.get), settable: !isNullOrUndefined(propertyInfo.set) };
                        ret.push(pi);
                    }
                    else if (propertyInfo && propertyInfo.writable && propertyInfo.configurable && propertyInfo.enumerable &&
                        typeof o[p] !== "function" && p.indexOf("_") === -1) {
                        console.log("Adding property: " + p);
                        var pi = { name: p, gettable: true, settable: true };
                        ret.push(pi);
                    }

                }

            }

            return ret;
        }

    }

    export interface IPropertyInfo {
        name: string;
        gettable: boolean;
        settable: boolean;
    }
}