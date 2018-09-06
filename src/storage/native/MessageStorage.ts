import { IMessageStorage } from '..';
import realm from '../_realm';



export class NativeMessageStorage implements IMessageStorage {
    constructor(private __OBJECT_NAME__="messageStorage"){

    }
    async getRoomMessages(room_id: any,isRead=null) {
        var filterStr=`room_id=${room_id}`;
        if(isRead!==null){
            filterStr+=` AND read=${isRead}`;
        }
        var results= realm.objects(this.__OBJECT_NAME__).filtered(filterStr);
        return await results;
    }
    async getMessage(message_id,room_id){
        var results=realm.objects(this.__OBJECT_NAME__).filtered(`id="${message_id}"`);
        return results[0];
    }
    async addMessage(data,room_id){
        realm.write(()=>{
            realm.create(this.__OBJECT_NAME__,data,true);
        });
    }
    async existsMessage(message_id,room_id){
        var result= await this.getMessage(message_id,room_id);
        return result!=null
    }
    async updateMessage(data,room_id){
        realm.write(()=>{
            realm.create(this.__OBJECT_NAME__,data,true);
        });
    }
    async removeMessage(message_id,room_id){
        realm.write(()=>{
            var deleteItems= realm.objects(this.__OBJECT_NAME__).filtered(`id="${message_id}"`);
            realm.delete(deleteItems);
        });
    }
}