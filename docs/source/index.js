
exports['index.jade'] = require('./home')
exports['docs/api.jade'] = require('./api')
exports['docs/index.jade'] = {}; //require('./gettingstarted')
exports['docs/prior.jade'] = require('./prior')
exports['docs/guide.jade'] = require('./guide')
exports['docs/schematypes.jade'] = require('./guide')
exports['docs/middleware.jade'] = require('./middleware')
exports['docs/plugins.jade'] = require('./plugins')
exports['docs/embedded.jade'] = { guide: true }
exports['docs/models.jade'] = { guide: true }
exports['docs/queries.jade'] = { guide: true }
exports['docs/documents.jade'] = { guide: true }