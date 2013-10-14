var express = require('express')
    , http = require('http')
    , path = require('path');
var util = require('util'),
    exec = require('child_process').exec,
    child;

var hatActions = require('./routes/hatActions');
var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(require('stylus').middleware(__dirname + '/public'));
    app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/', hatActions.home);
app.post('/', hatActions.home_post_handler);

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
    child = exec('amixer set PCM -- 1000', // command line argument directly in string
        function (error, stdout, stderr) {      // one easy function to capture data/errors
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });

});