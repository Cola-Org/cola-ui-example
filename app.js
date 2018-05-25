var express = require('express');
var os = require('os');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var lessMiddleware = require('less-middleware');
// var index = require('./routes/index');
var wizard = require('./routes/wizard');
var service = require('./routes/service');


var configure = require('./init');

var app = express();

// view engine setup
app.set('views', configure.dynaPaths);
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// app.use(express.json({limit: '5mb'}));
// app.use(express.urlencoded({limit: '5mb'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

var tempStaticDir = path.join(os.tmpDir(), 'css-cache');

configure.staticPaths.forEach(function (staticPath) {
	app.use("/resources", express.static(staticPath));
});

app.use(function (req, res, next) {
	if (req.url.match(/\.less/) && 'GET' === req.method.toUpperCase() || 'HEAD' === req.method.toUpperCase()) {
		req.url = req.url.replace(/\.less/, ".css");
	}
	return next();
});

configure.dynaPaths.forEach(function (dynaPath) {
	app.use(lessMiddleware(dynaPath, {
		dest: tempStaticDir,
		render: {
			paths: configure.dynaPaths
		}
	}));
	app.use(express.static(dynaPath));
});
app.use(express.static(tempStaticDir));

// app.use('/', index);
app.use('/wizard', wizard);
app.use('/service', service);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
