var dirname = __dirname;
var path = require('path');
module.exports = {
	"resources": [
		path.join(dirname, "/resources/"),
		path.join(dirname, "/web/")
	],
	"jadeContext": {
		"contextPath": ""
	}
};