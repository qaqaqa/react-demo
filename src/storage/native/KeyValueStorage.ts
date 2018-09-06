import realm from '../_realm';
import { IKeyValueStorage } from '../';
import _ = require('lodash');
import { di } from '../../../node_modules/jsmodules';

type KeyValuePair = {
    key: string,
    value: string
}
export class NativeKeyValueStorage implements IKeyValueStorage {
    constructor(private __OBJECT_NAME__) {

    }

    async keys() {
        var results = realm.objects(this.__OBJECT_NAME__);
        return results.map((item: any) => {
            return item.key;
        });
    }

    async getAsync(key: string, defaultValue: any = null) {
        var result = defaultValue;
        var results = realm.objects<KeyValuePair>(this.__OBJECT_NAME__).filtered(`key="${key}"`);
        if (results.length > 0) {
            result = results[0].value;
        }
        return await result;
    }

    async setAsync(key: string, value: string) {
        realm.write(() => {
            realm.create(this.__OBJECT_NAME__, {
                key,
                value
            }, true);
        });
        return await value;
    }

    async setObjectAsync(key: string, value: Object) {
        var obj = await this.setAsync(key, JSON.stringify(value));
        return JSON.parse(obj);
    }

    private __queue__ = [];
    private __queue_data__ = {};
    private __queue_started__ = false;
    private queueWriter() {
        setTimeout(() => {
            var temp = _.uniq(this.__queue__.splice(0));
            realm.write(() => {
                for (const key of temp) {
                    var value = JSON.stringify(this.__queue_data__[key]);
                    realm.create(this.__OBJECT_NAME__, {
                        key,
                        value
                    }, true);
                    delete this.__queue_data__[key];
                }
                this.queueWriter();
            });
        }, 1000 * 5);
    }
    ququeSetObject(key: string, value: any) {
        this.__queue_data__[key] = value;
        this.__queue__.push(key);
        if (!this.__queue_started__) {
            this.__queue_started__ = true;
            this.queueWriter();
        }
    }
    async batchSetObject(obj:any|any[],keyProp:string="key",valueProp:string="value"){
        return new Promise((resolve)=>{
            realm.write(() => {
                if (_.isArray(obj)) {
                    for (var item of obj) {
                        var key = item[keyProp];
                        if (!key || key == "") {
                            continue;
                        }
                        var val=item;
                        if(valueProp){
                            val=item[valueProp];
                        }
                        var value = JSON.stringify(val)
                        realm.create(this.__OBJECT_NAME__, {
                            key,
                            value
                        }, true);
                    }
                } else {
                    for (const key in obj) {
                        var value = JSON.stringify(obj[key]);
                        realm.create(this.__OBJECT_NAME__, {
                            key,
                            value
                        }, true);
                    }
                }
                resolve();
            });
        });
    }

    async getObjectAsync(key: string) {
        var str = await this.getAsync(key);
        if (str) {
            return JSON.parse(str);
        }
        return null;
    }

    async setObjectProperty(key: string, propertyName: string, value: any) {
        var obj = await this.getObjectAsync(key);
        if (!obj) {
            obj = {};
        }
        obj[propertyName] = value;
        return await this.setObjectAsync(key, obj);
    }

    async getObjectProperties(key: string, ...propertyNames: any[]) {
        var obj = await this.getObjectAsync(key);
        var result = {};
        for (var propertyName of propertyNames) {
            result[propertyName] = obj[propertyName];
        }
        return result;
    }

    async getObjectValue(key: string, propertyName: string) {
        var obj = await this.getObjectAsync(key);
        return obj[propertyName];
    }

    async removeAsync(key: string) {
        realm.write(() => {
            var results = realm.objects<KeyValuePair>(this.__OBJECT_NAME__).filtered(`key=="${key}"`);
            realm.delete(results);
        });
    }

    async clearAsync() {
        realm.write(() => {
            var results = realm.objects<KeyValuePair>(this.__OBJECT_NAME__);
            realm.delete(results);
        });
    }
}

export default NativeKeyValueStorage;