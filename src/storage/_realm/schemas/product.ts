import * as Realm from 'realm';


export class Products{
    
    static schema= {
        name: "productStorage",
        primaryKey:"key",
        properties: {
            key: 'string',
            value: 'string'
        }
    }
}
