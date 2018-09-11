import { di, HttpFactory } from 'jsmodules';
import { IKeyValueStorage } from '../storage/IKeyValueStorage';
import Logger from '../utils/logger';

const STORAGE_KEY = '__KEY_f1cac9c2-067e-48f1-ad06-daa32212111b';

export default class TokenService {
	@di.Inject() kvStorage: IKeyValueStorage;

	private target: {
		token_type: string;
		access_token: string;
	};

	/**
     * 将 access_token 保存到本地
     * @param obj
     */
	private async save(obj) {
		return this.kvStorage.setObjectAsync(STORAGE_KEY, obj);
	}

	/**
     * 读取本地保存的 access_token
     */
	private async read() {
		if (this.target) {
			return;
		}
		var token = await this.kvStorage.getObjectAsync(STORAGE_KEY);
		if (token) {
			Logger.info('取得本地保存的AccessToken');
			this.target = token;
		} else {
			this.target = null;
		}
	}

	async clear() {
		this.target = null;
		await this.kvStorage.removeAsync(STORAGE_KEY);
	}

	async getAccessToken() {
		await this.read();
		return this.target.access_token;
	}

	async getSecurityHeaders() {
		await this.read();
		if (this.target) {
			const { token_type, access_token } = this.target;
			return { Authorization: `${token_type} ${access_token}` };
		}
		return null;
	}

	async login(username, password) {}
}
