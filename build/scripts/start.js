const logger = require('../lib/logger');
const opn = require('opn');

logger.info('Starting server...');
var port = 3002;
if (process.env.NODE_ENV == 'production') {
	port = 3001;
}
var sPort = process.env.PORT || port;
require('../../server/main').listen(sPort, () => {
	logger.success('Server is running at http://localhost:' + sPort);
	if (process.env.NODE_ENV != 'production') {
		opn('http://localhost:' + sPort);
	}
});
