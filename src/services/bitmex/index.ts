import { di, HttpFactory } from 'jsmodules';
import HicoinService from '../hicoin';
import { SessionState } from '../../stores/session';

export default class BitmexService {

    @di.Inject() private session: SessionState;

    @di.Inject() private bitmex_api_v1: HttpFactory;

    @di.Inject() private hicoinService: HicoinService;

    constructor() {
        window['bitmex'] = this;
    }

    private async getSignatureHeader(api, method, data) {
        var url = '/api/v1' + api;
        var __BITMEX_APIKEY__ = await this.session.getAppId()
        var response = await this.hicoinService.getSignature(url, method, data);
        return {
            'api-key': __BITMEX_APIKEY__,
            'api-expires': response.data.expires,
            'api-signature': response.data.sig
        };
    }

    async getUser() {
        var api = '/user';
        var headers = await this.getSignatureHeader(api, 'GET', null);
        return this.bitmex_api_v1.url('/user').headers(headers).get();
    }

	/**
     * 做多
     * @param price 价格
     * @param orderQty 合约数量
     * @param symbol
     */
    async buyLimit(price, orderQty, symbol = 'XBTUSD') {
        var api = '/order';
        var data = {
            ordType: 'Limit',
            price: parseFloat(price),
            orderQty,
            side: 'Buy',
            symbol,
            text: 'Submission from testnet.bitmex.com'
        };
        var headers = await this.getSignatureHeader(api, 'POST', data);
        return this.bitmex_api_v1.url('/order').headers(headers).post(data);
    }

	/**
     * 做空
     * @param price 价格
     * @param orderQty 合约数量
     * @param symbol
     */
    async sellLimit(price, orderQty, symbol = 'XBTUSD') {
        var api = '/order';
        var data = {
            ordType: 'Limit',
            price: parseFloat(price),
            orderQty,
            side: 'Sell',
            symbol,
            text: 'Submission from testnet.bitmex.com'
        };
        var headers = await this.getSignatureHeader(api, 'POST', data);
        return this.bitmex_api_v1.url('/order').headers(headers).post(data);
    }

	/**
     * 市场价格平仓
     */
    async closeMarket(symbol = 'XBTUSD') {
        //{ "symbol": "XBTUSD", "ordType": "Market", "execInst": "Close", "text": "Position Close from testnet.bitmex.com" }
        var api = '/order';
        var data = {
            symbol,
            ordType: 'Market',
            execInst: 'Close',
            text: 'Position Close from testnet.bitmex.com'
        };
        var headers = await this.getSignatureHeader(api, 'POST', data);
        return this.bitmex_api_v1.url('/order').headers(headers).post(data);
    }

	/**
     * 平仓
     * @param price
     */
    async closeLimit(price, symbol = 'XBTUSD') {
        //{ "symbol": "XBTUSD", "ordType": "Market", "execInst": "Close", "text": "Position Close from testnet.bitmex.com" }
        var api = '/order';
        var data = {
            symbol,
            price: parseFloat(price),
            ordType: 'Limit',
            execInst: 'Close',
            text: 'Position Close from testnet.bitmex.com'
        };
        var headers = await this.getSignatureHeader(api, 'POST', data);
        return this.bitmex_api_v1.url('/order').headers(headers).post(data);
    }

	/**
     * 取消订单
     * @param orderID
     */
    async cancelOrder(orderID) {
        //    { "orderID": "40ad9937-a5d4-11ed-25c1-55ebf7b397db", "text": "Cancel from testnet.bitmex.com" }

        var api = '/order';
        var data = {
            orderID,
            text: 'Cancel from testnet.bitmex.com'
        };
        var headers = await this.getSignatureHeader(api, 'DELETE', data);
        return this.bitmex_api_v1.url('/order').headers(headers).remove(data);
    }

	/**
     * 设置杠杆
     * @param leverage 杠杆倍数 0-200
     * @param symbol
     */
    async setLeverage(leverage, symbol = 'XBTUSD') {
        var api = '/position/leverage';
        var data = {
            symbol,
            leverage
        };
        var headers = await this.getSignatureHeader(api, 'POST', data);
        return this.bitmex_api_v1.url('/position/leverage').headers(headers).post(data);
    }

    async depositAddress() {
        var api = '/user/depositAddress';
        var headers = await this.getSignatureHeader(api, 'GET', null);
        return this.bitmex_api_v1.url(api).headers(headers).get();
    }
}
