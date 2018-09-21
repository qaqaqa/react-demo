import { di, HttpFactory } from 'jsmodules';
import TokenService from './token';

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
            httpMethod,
            apiPath,
            ...postParams
        });
    }

    regist(email, password) {
        return this.hicoin_api_v1.url("/user/regist").post({
            email,
            password
        });
    }

    login(email, password) {
        return this.hicoin_api_v1.url("/user/login").post({
            email,
            password
        });
    }
}
