import * as Realm from 'realm';


export class KeyValues{
    
    static schema= {
        name: "appStorage",
        primaryKey:"key",
        properties: {
            key: 'string',
            value: 'string'
        }
    }
}
