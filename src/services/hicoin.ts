import { di, HttpFactory } from 'jsmodules';
import TokenService from './token';
import { SessionState } from '../stores/session';

export default class HicoinService {
    @di.Inject() hicoin_api_v1: HttpFactory;
    @di.Inject() tokenService: TokenService;
    @di.Inject() session: SessionState;

    getSignature(apiPath, httpMethod, postData) {
        var postParams: any = {
            postData: JSON.stringify(postData)
        };
        if (httpMethod == 'GET') {
            postParams = {};
        }
        return this.hicoin_api_v1.url('/Signature').get({
            email: this.session.email,
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

    isActive(email) {
        return this.hicoin_api_v1.url("/user/key").get({
            email
        });
    }
}
