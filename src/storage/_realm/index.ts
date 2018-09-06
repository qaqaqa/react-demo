import * as Realm from 'realm';

import { v1 } from './migrations/v1';
import { Logger } from '../../utils/logger';

var schemas = [
    v1
]
//数据库升级
// let nextSchemaIndex = Realm.schemaVersion(Realm.defaultPath);

//  while (nextSchemaIndex < schemas.length-1) {
//      const migratedRealm = new Realm(schemas[nextSchemaIndex++]);
//      migratedRealm.close();
//  }

// var lastSchema=schemas[schemas.length-1];
var realm = new Realm(v1);

Logger.info("数据库路径：",realm.path);

export default realm;