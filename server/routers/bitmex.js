var express = require('express');
var router = express.Router();
var proxy = require('express-http-proxy');

router.get(
	'*',
	proxy('https://testnet.bitmex.com', {
		proxyReqPathResolver: function(req) {
			console.log(req.url);
			return req.url;
		},
		proxyReqOptDecorator: function(proxyReqOpts, srcReq) {
			proxyReqOpts.path = srcReq.originalUrl;
			return proxyReqOpts;
		}
	})
);
module.exports = router;
