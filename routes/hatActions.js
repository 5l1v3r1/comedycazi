var util = require('util'),
    exec = require('child_process').exec,
    child;


exports.home = function(req, res) {
    res.render('home', { title: 'Techno Dildo Hat Controller'})
};


exports.home_post_handler = function(req, res) {
    var words = req.body.tts;
    words.replace(/\W/g, '')
    child = exec('echo ' +'"' + words + '"' + ' | festival --tts', // command line argument directly in string
        function (error, stdout, stderr) {      // one easy function to capture data/errors
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });
};

