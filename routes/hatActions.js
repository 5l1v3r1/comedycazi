var util = require('util'),
    spawn = require('child_process').spawn,
    mary = spawn('java', ['-cp','./lib/*:./bin', "MaryTTSTest"],  {cwd :'/Users/dayrey/Downloads/MaryTTSTest'});

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

mary.stdout.on('data', function (data) {
    console.log('stdout: ' + data);
});

mary.stderr.setEncoding('utf8');
mary.stderr.on('data', function (data) {
    console.log("THERE WAS AN ERROR")
    console.log(data)

});

exports.home_post_handler = function(req, res) {
    var words = req.body.tts;
    words.replace(/\W/g, '');
    if (words == "safe shutdown" ){
        spawn('sudo', ['shutdown','-h', "now"]);
    }
    else{

        console.log(words)
        mary.stdin.setEncoding = 'utf-8';
        mary.stdin.write(words + ".\n")


    }
    res.redirect('/');
};