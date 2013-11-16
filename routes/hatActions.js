var util = require('util'),
    spawn = require('child_process').spawn,
    mary = spawn('java', ['-cp','./lib/*:./bin', "MaryTTSTest"],  {cwd :'/Users/dayrey/Downloads/MaryTTSTest'}),
    fs = require('fs');

var fs = require('fs');
var lame = require('lame');
var Speaker = require('speaker');
var wav = require('wav');

var activeSounds = {}

// var gpio = require("pi-gpio"),

//var pin12_state = true
//var pin11_state = true

exports.home = function(req, res) {

    fs.readdir(__dirname + "/uploads", function(err, files){
        var sound_effects = []
        for (var i in files){
            if(files[i].slice(-3) == 'mp3'){
                sound_effects.push(files[i]);
            }
        };
        fs.readdir(__dirname + "/sounds", function(err, files){
            var voice_sounds = []
            for (var i in files){
                if(files[i].slice(-3) == 'wav'){
                    voice_sounds.push(files[i]);
                }
            };
            res.render('home', { title: 'Techno Dildo Hat Controller', sounds: sound_effects, voice_sounds: voice_sounds});
        });
    });

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
    if (req.files && req.files.sound){
        handle_upload(req, res);
    }
    else if (req.body.tts) {
        handle_tts(req, res);
    }
    else{
        handle_player(req, res);
    }
};

var handle_tts = function(req, res){
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

}
var handle_upload = function(req, res){
    if (req.files.sound.name.slice(-3) == 'mp3' || req.files.sound.name.slice(-3) == 'wav'){
        fs.readFile(req.files.sound.path, function (err, data) {
            var fileName = req.files.sound.name;
            var newPath = __dirname + "/uploads/" + fileName;
            fs.writeFile(newPath, data, function (err) {
                res.redirect('/');
            });

        });
    }
    else{
        res.redirect('/');
    }
}

var handle_player = function(req, res){
    for(var name in req.body){
        var existingPath = __dirname + "/uploads/" + name;
        if(req.body[name] == 'Play'){
            if (name.slice(-3) == 'mp3'){
                var stream = fs.createReadStream(existingPath).pipe(new lame.Decoder).pipe(new Speaker);
                if(activeSounds[name]){
                    activeSounds[name].end();
                }
                activeSounds[name] = stream;
            }
            else{
                var file = fs.createReadStream(__dirname + "/sounds/" + name);
                var reader = new wav.Reader();

                reader.on('format', function (format) {

                    // the WAVE header is stripped from the output of the reader
                    reader.pipe(new Speaker(format));
                });

                file.pipe(reader);

            }

        }
        else if (req.body[name] == 'Delete'){
            fs.unlink(existingPath, function(){
                console.log('Deleted!')
            })
        }
        else if (req.body[name] == 'Stop' && activeSounds[name]){
            activeSounds[name].end();
            delete activeSounds[name];
        }
    }

    res.redirect('/');

}