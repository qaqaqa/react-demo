import {Logger} from '../utils/logger';
import {observable} from 'mobx';
import {Events} from 'jsmodules/lib/events';

export enum AppStatus {
    starting = "starting",
    error = "error",
    ready = "ready"
}

export class AppState extends Events {
    /**
     * app 状态
     */
    @observable status : AppStatus = null;

    /**
     * 启动应用
     */
    public async start() {
        Logger.info("启动应用程序");
        this.status = AppStatus.starting;

        this.status = AppStatus.ready;
        Logger.info("启动成功", this.status);
    }
}

export default AppState;