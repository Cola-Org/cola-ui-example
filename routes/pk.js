var express = require('express');
var router = express.Router();

router.get('/*', function (req, res, next) {
	var templatePath = req.path.length === 1 ? "pk" : ("pk" + req.path);
	res.render(templatePath, {
		viewPath: templatePath
	});
});

module.exports = router;
