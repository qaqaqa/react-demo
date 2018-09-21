import * as Realm from 'realm';


export class KeyValues{
    
    static schema= {
        name: "kvStorage",
        primaryKey:"key",
        properties: {
            key: 'string',
            value: 'string'
        }
    }
}
