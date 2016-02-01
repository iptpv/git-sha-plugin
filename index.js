var GITSHA_REGEXP = /\[gitsha\]/gi;
var exec = require('child_process').execSync;

function GitSHAPlugin(options) {
  var opts = options || {};
  this.shaLength = opts.shaLength || 7;
}

GitSHAPlugin.prototype.apply = function(compiler) {
  var sha = exec('git log -1 --format=%H', {encoding: 'utf-8'}).slice(0, this.shaLength);

  compiler.options.devServer.publicPath = compiler.options.devServer.publicPath.replace(GITSHA_REGEXP, sha);

  compiler.plugin('emit', function(compilation, callback) {
    compilation.mainTemplate.plugin('asset-path', function(p) {
      return p.replace(GITSHA_REGEXP, sha);
    });
    callback();
  });
};

module.exports = GitSHAPlugin;
