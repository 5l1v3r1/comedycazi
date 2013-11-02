var fs = require('fs');
var lame = require('lame');
var Speaker = require('speaker');

var activeSounds = {}

exports.upload = function(req, res) {

    fs.readdir(__dirname + "/uploads", function(err, files){
        var items = []
        for (var i in files){
            if(files[i].slice(-3) == 'mp3'){
                items.push(files[i]);
            }
        };
        res.render('upload', { sounds: items});
    });
};

exports.upload_post_handler = function(req, res){

    if (req.files && req.files.sound && req.files.sound.name.slice(-3) == 'mp3'){
        fs.readFile(req.files.sound.path, function (err, data) {
                var fileName = req.files.sound.name;
                var newPath = __dirname + "/uploads/" + fileName;
                fs.writeFile(newPath, data, function (err) {
                    res.redirect('/upload');
                });

        });
    }
    else{
        for(var name in req.body){
            var existingPath = __dirname + "/uploads/" + name;
            if(req.body[name] == 'Play'){
                var stream = fs.createReadStream(existingPath).pipe(new lame.Decoder).pipe(new Speaker);
                if(activeSounds[name]){
                    activeSounds[name].end();
                }
                activeSounds[name] = stream;
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

        res.redirect('/upload');
    };

};