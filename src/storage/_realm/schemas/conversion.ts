import * as Realm from 'realm';


export class Conversions{
    
    static schema= {
        name: "conversionStorage",
        primaryKey:"key",
        properties: {
            key: 'string',
            value: 'string'
        }
    }
}
