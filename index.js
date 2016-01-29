var gitsha = require('git-bundle-sha');
var GITSHA_REGEXP = /\[gitsha\]/gi;

function GitSHAPlugin(options) {
  var opts = options || {};
  this.shaLength = opts.shaLength || 7;
}

GitSHAPlugin.prototype.apply = function(compiler) {
  var _this = this;

  compiler.plugin('emit', function(compilation, callback) {
    gitsha([], {
      length: _this.shaLength
    }, function(err, sha) {
      if (err) throw err;
      compilation.mainTemplate.plugin('asset-path', function(p) {
        return p.replace(GITSHA_REGEXP, sha);
      });
      callback();
    });
  });
};

module.exports = GitSHAPlugin;
