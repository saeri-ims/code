const fs = require('fs');
      path = require('path');

var original_path = '/media/pb/DRAATSY/DOKE_Matched_Photo-ID/FocalSurveyGenetic_matched/Cc_Matched';
var destination_path = '/media/pb/DATA/DOKE_best_marked_jpg/';
var selectdFolder = 'best_marked';

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

var images = [];
var original = [];
var catalog = {};

walkSync(destination_path, function(filePath, stat) {
    // var parentFolder = path.basename(path.dirname(filePath));
    var name = path.basename(filePath, '.jpg');
    var name_shunks = name.split('_');
    // if (parentFolder == selectdFolder && name.charAt(0) != '.') {
    if (name.charAt(0) != '.') {
      // console.log(name_shunks[2]+'_'+name_shunks[3]+'_'+name_shunks[4]+'_'+name_shunks[5]+'_'+name_shunks[6]+'_'+name_shunks[7]);
      images.push(name);
      original.push(name_shunks[2]+'_'+name_shunks[3]+'_'+name_shunks[4]+'_'+name_shunks[5]+'_'+name_shunks[6]+'_'+name_shunks[7]);
      // fs.copyFileSync(filePath, destination_path+name);
      key = name_shunks[3]+'_'+name_shunks[4]+'_'+name_shunks[5];
      // if (name_shunks[0].length>6){
      //   code = name_shunks[0].slice(0,6);
      //   x = 1;
      //   console.log(code);
      // } else {
      //   code = name_shunks[0];
      //   x = 0;
      // };
      catalog[key] = {
        'code': name_shunks[0].slice(0,6),
        'side': name_shunks[1],
        'project': name_shunks[2],
        'date': name_shunks[3],
        'sighting': name_shunks[4],
        'picture': name_shunks[5],
        'specie': name_shunks[6],
        'photo_by': name_shunks[7],
        'x': (name_shunks[0].length>6)?1:0
      }
    }
});
// console.log(catalog.length);
console.log(catalog);
// fs.writeFileSync('doke_'+selectdFolder+'.json',JSON.stringify(images));
// fs.writeFileSync('doke_'+selectdFolder+'_original.json',JSON.stringify(original));
fs.writeFileSync('doke_catalog.json',JSON.stringify(catalog));
