const fs = require('fs'),
      path = require('path');

var original_path = '/media/pb/BLANQUITA/DOKE_Original_Photo-ID/FocalSurveyGenetic_original/Cc_original';
var destination_path = '/media/pb/DATA/DOKE_best_marked_original/';

var catalog  = JSON.parse(fs.readFileSync('doke_catalog.json'));
// var best_marked  = JSON.parse(fs.readFileSync('doke_best_marked.json'));
var best_marked_original  = JSON.parse(fs.readFileSync('doke_best_marked_original.json'));

function walkSync(currentDirPath, callback) {
    fs.readdirSync(currentDirPath).forEach(function (name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            callback(filePath, stat);
        } else if (stat.isDirectory()) {
            walkSync(filePath, callback);
        }
    });
}

walkSync(original_path, function(filePath, stat) {
    // var parentFolder = path.basename(path.dirname(filePath));
    var name = path.basename(filePath);
    var name_shunks = name.split('_');
    name_match = name.split('.')[0];
    key = name_shunks[1]+'_'+name_shunks[2]+'_'+name_shunks[3];
    if (name.charAt(0) != '.' && best_marked_original.indexOf(name_match) > -1) {
      console.log(name);
      fs.copyFileSync(filePath, destination_path+catalog[key].code+'_'+catalog[key].side+'_'+name);
    }
});
