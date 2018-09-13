import { di, HttpFactory } from 'jsmodules';
import TokenService from './token';
import { __BITMEX_SEC__ } from '../config/bitmex';

export default class HicoinService {
	@di.Inject() hicoin_api_v1: HttpFactory;
	@di.Inject() tokenService: TokenService;
	getSignature(apiPath, httpMethod, postData) {
		var postParams: any = {
			postData: JSON.stringify(postData)
		};
		if (httpMethod == 'GET') {
			postParams = {};
		}
		return this.hicoin_api_v1.url('/Signature').get({
			sec: __BITMEX_SEC__,
			httpMethod,
			apiPath,
			...postParams
		});
	}
}
