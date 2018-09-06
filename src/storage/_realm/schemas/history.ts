import * as Realm from 'realm';


export class Historys{
    
    static schema= {
        name: "historyStorage",
        primaryKey:"key",
        properties: {
            key: 'string',
            value: 'string'
        }
    }
}
