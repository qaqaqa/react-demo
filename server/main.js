const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('../build/lib/logger');
const project = require('../project.config');
const compress = require('compression');
const fs = require('fs');

var proxy = require('express-http-proxy');

const app = express();
app.use(compress());
// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
app.disable('x-powered-by');

var root_dir = '',
	reader = fs;
if (project.env === 'development') {
	const webpack = require('webpack');
	const webpackConfig = require('../build/webpack.config');

	const compiler = webpack(webpackConfig);
	root_dir = compiler.outputPath;
	logger.info('Enabling webpack development and HMR middleware');
	app.use(
		require('webpack-dev-middleware')(compiler, {
			publicPath: webpackConfig.output.publicPath,
			contentBase: path.resolve(project.basePath, project.srcDir),
			headers: { 'Access-Control-Allow-Origin': '*' },
			hot: true,
			quiet: false,
			noInfo: false,
			lazy: false,
			stats: 'normal'
		})
	);
	app.use(
		require('webpack-hot-middleware')(compiler, {
			path: '/__webpack_hmr'
		})
	);
	app.use(express.static(path.resolve(project.basePath, 'public')));
	reader = compiler.outputFileSystem;
} else {
	root_dir = path.resolve(project.basePath, project.outDir);
	app.use(
		express.static(root_dir, {
			headers: {
				'Access-Control-Allow-Origin': '*'
			}
		})
	);
}

function readFile(res, file) {
	const filename = path.join(root_dir, file);
	reader.readFile(filename, (err, result) => {
		if (err) {
			res.send(err.message);
			return;
		}
		res.set('content-type', 'text/html');
		res.send(result);
		res.end();
	});
}

function addRoute(name, conf) {
	if (conf.server_path) {
		app.use(conf.server_path, function(req, res) {
			if (conf.before && conf.before(req, res)) {
				return;
			}
			var output = conf.output || name + '.html';
			var fileName = output;
			readFile(res, fileName);
		});
	}
}

// app.use(bodyParser.urlencoded({ extended: true }));// for parsing application/x-www-form-urlencoded
// app.use(bodyParser.json()); // for parsing application/json

app.use(
	'/bitmex_api',
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
app.use('/assets', require('./routers/assets'));

var entry = project.entry;
for (var name in entry) {
	addRoute(name, entry[name]);
}

module.exports = app;
