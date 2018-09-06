import { di, HttpFactory } from 'jsmodules';
import TokenService from './token';

export default class HicoinService {
	@di.Inject() hicoin_api_v1: HttpFactory;
	@di.Inject() tokenService: TokenService;
	getSignature() {}
}
