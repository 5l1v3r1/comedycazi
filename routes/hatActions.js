var util = require('util'),
    exec = require('child_process').exec,
    child;

// var gpio = require("pi-gpio"),

//var pin12_state = true
//var pin11_state = true

exports.home = function(req, res) {
    res.render('home', { title: 'Techno Dildo Hat Controller'})
};

//var setpin = function(pin, pin_state){
//    gpio.open(pin, "output", function(err) {
//        if(err){console.log(err)};
//
//        gpio.write(pin, pin_state, function() {
//            gpio.close(pin);
//        });
//    });
//}


exports.home_post_handler = function(req, res) {
    var words = req.body.tts;
    words.replace(/\W/g, '');
    if (words == "safe shutdown" ){
        child = exec('sudo shutdown -h now', // command line argument directly in string
            function (error, stdout, stderr) {      // one easy function to capture data/errors
                console.log('stdout: ' + stdout);
                console.log('stderr: ' + stderr);
                if (error !== null) {
                    console.log('exec error: ' + error);
                }
            });
    }
    else{
        child = exec('echo ' +'"' + words + '"' + ' | festival --tts', // command line argument directly in string
            function (error, stdout, stderr) {      // one easy function to capture data/errors
                console.log('stdout: ' + stdout);
                console.log('stderr: ' + stderr);
                if (error !== null) {
                    console.log('exec error: ' + error);
                }
            });
    }
    res.redirect('/');
};