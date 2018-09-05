

var express = require('express');
var router = express.Router();
var proxy = require('express-http-proxy');

router.get('*',proxy("http://identity.hicoin.io",{
    proxyReqPathResolver: function(req) {
        return "/oauth2"+req.url;
    },
    proxyReqOptDecorator: function(proxyReqOpts, srcReq) {
        proxyReqOpts.path=srcReq.originalUrl
        return proxyReqOpts;
    }
}));

module.exports = router;