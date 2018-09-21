import { di } from 'jsmodules';
import HicoinService from '../services/hicoin';
import { IKeyValueStorage } from '../storage/IKeyValueStorage';

export class SessionState {

    @di.Inject() hicoinService: HicoinService

    @di.Inject() kvStorage: IKeyValueStorage;

    isAuthenticated = false;

    email: string

    private app_id: string;

    async loadSessionState() {
        var str = await this.kvStorage.getAsync("__u");
        if (str && str != "") {
            this.app_id = str;
            this.isAuthenticated = true;
            return this.app_id;
        } else {
            this.isAuthenticated = false;
            return 0;
        }
    }
    async saveSessionState(obj) {
        await this.kvStorage.setAsync("__u", obj);
    }

    async getAppId() {
        if (this.app_id) {
            return this.app_id;
        }
        else {
            return await this.loadSessionState()
        }
    }

    async login(username, password) {
        var result = await this.hicoinService.login(username, password);
        if (result.data) {
            this.isAuthenticated = true;
            this.email = username;
            await this.saveSessionState(result.data);
            return true;
        }
        return false;
    }

}