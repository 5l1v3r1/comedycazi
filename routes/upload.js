var fs = require('fs');
var lame = require('lame');
var Speaker = require('speaker');



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
    console.log(req.body)
    if (req.files && req.files.sound && typeof req.files.sound.name == 'string' && req.files.sound.name.fileName.slice(-3) == 'mp3'){
        fs.readFile(req.files.sound.path, function (err, data) {
            // ...
                var newPath = __dirname + "/uploads/" + fileName;
                fs.writeFile(newPath, data, function (err) {
                    res.redirect('/upload');
                });

        });
    }
    else{
        for(var name in req.body){
            var existingPath = __dirname + "/uploads/" + name;
            fs.createReadStream(existingPath).pipe(new lame.Decoder).pipe(new Speaker);
        }
    };

};