import * as Realm from 'realm';


export class Messages{
    
    static schema= {
        name: "messagesStorage",
        primaryKey:"key",
        properties: {
            key: 'string',
            value: 'string'
        }
    }
}
