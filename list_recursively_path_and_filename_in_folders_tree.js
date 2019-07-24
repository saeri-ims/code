/*
This script recusrsively walks trhough a directory tree and generates a .csv "starting_folder.csv" and also a .json "starting_folder.json"  with 2 columns/keys "file_path" and "file_name"
The resulting file is written in "metadata_path"
*/

const fs = require('fs');
const path = require('path');
const converter = require('json-2-csv');

var original_path = '/mnt/';
var starting_folder = 'Work'

var metadata_path = '/mnt/Data/CKAN_Metadata/data/';

function walkSync(currentDirPath, callback) {
  fs.readdirSync(currentDirPath).forEach(function(name) {
    var filePath = path.join(currentDirPath, name);
    var stat = fs.statSync(filePath);
    if (stat.isFile()) {
      callback(filePath, stat);
    } else if (stat.isDirectory()) {
      walkSync(filePath, callback);
    }
  });
}

var list_paths_names = [];
walkSync(original_path + starting_folder, function(filePath, stat) {
  var file_path = path.dirname(filePath);
  var file_name = path.basename(filePath);
  list_paths_names.push({
    'file_path': file_path,
    'file_name': file_name
  });
  // console.log(file_path+' ---- '+file_name);
});
converter.json2csv(list_paths_names, function(err, csv) {
  if (err) throw err;
  fs.writeFileSync(metadata_path + starting_folder +'.csv', csv);
});

fs.writeFileSync(metadata_path + starting_folder + '.json', JSON.stringify(list_paths_names));

console.log('Done!');
