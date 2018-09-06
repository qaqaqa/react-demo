import { KeyValues } from '../schemas/keyvalue';
import { Products } from '../schemas/product';
import { Historys } from '../schemas/history';
import { Conversions } from '../schemas/conversion';
import { Messages } from '../schemas/message';


/**
 * 数据库v1版
 */
export const v1={
    schema: [KeyValues,Products,Historys,Conversions,Messages],
    schemaVersion: 2,
    migration:(oldRealm,newRealm)=>{
        
    }
}