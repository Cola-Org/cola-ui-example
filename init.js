var configure = require('./configure');
var fs = require('fs');
var p = require('path');
var jade = require('jade');

var staticPaths = configure.staticPaths = [];
var dynaPaths = configure.dynaPaths = [];

configure.resources.forEach(function(resourceRoot) {
	var staticPath = p.join(resourceRoot, "static");
	var viewPath = p.join(resourceRoot, "web");

	if (fs.existsSync(staticPath)) {
		staticPaths.push(staticPath);
	}

	if (fs.existsSync(viewPath)) {
		staticPaths.push(viewPath);
		dynaPaths.push(viewPath);
	}
});
staticPaths.push(p.join(__dirname, 'web'));
dynaPaths.push(p.join(__dirname, 'web'));

jade.Parser.prototype.resolvePath = function(path, purpose) {
	if (path[0] !== '/' && !this.filename)
		throw new Error('the "filename" option is required to use "' + purpose + '" with "relative" paths');

	var targetPath;

	targetPath = p.join(p.dirname(this.filename), path);
	if (p.basename(path).indexOf('.') === -1) targetPath += '.jade';
	if (fs.existsSync(targetPath)) return targetPath;

	if (path[0] === '/' && this.options.basedir) {
		targetPath = p.join(this.options.basedir, path);
		if (p.basename(path).indexOf('.') === -1) targetPath += '.jade';
	}
	else {
		for (var i = 0, len = dynaPaths.length; i < len; i++) {
			targetPath = p.join(dynaPaths[i], path);
			if (p.basename(path).indexOf('.') === -1) targetPath += '.jade';
			if (fs.existsSync(targetPath)) break;
		}
	}

	return targetPath;
};

module.exports = configure;