import { di } from 'jsmodules';
import HicoinService from '../services/hicoin';
import { IKeyValueStorage } from '../storage/IKeyValueStorage';
import { observable } from 'mobx';
import { Events } from 'jsmodules/lib/events';

export class SessionState extends Events {

    @di.Inject() hicoinService: HicoinService

    @di.Inject() kvStorage: IKeyValueStorage;

    isAuthenticated = false;

    email: string

    private app_id: string;

    @observable isActive = false;

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

    async checkActive() {
        var response = await this.hicoinService.isActive(this.email);
        if (!!response.data) {
            await this.saveSessionState(response.data);
            this.isActive = true;
            this.trigger('Active')
        } else {
            setTimeout(() => {
                this.checkActive()
            }, 5000);
        }
    }

    async login(username, password) {
        var response = await this.hicoinService.login(username, password);
        var result = response.data;
        if (result.success) {
            this.isAuthenticated = true;
            this.email = username;
            if (!!result.key) {
                this.isActive = !!result.key;
                await this.saveSessionState(result.key);
            } else {
                this.checkActive();
            }
            return true;
        }
        return false;
    }

}