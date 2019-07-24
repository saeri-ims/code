/*
This script walks the metadata csv file and tryes to find into IMS-NAS1 the dataset correspondant to the name listed in "original_name" column
need to be provided:
a metadata.csv file
a
*/

const fs = require('fs');
const csv = require('csvtojson');
const converter = require('json-2-csv');

var metadata_path = '/mnt/Data/CKAN_Metadata/data/';
var metadata_file = 'metadata_FK_export190211.csv';
var paths_names_file = 'NAS.json'

var list_paths_names = JSON.parse(fs.readFileSync(metadata_path + paths_names_file));

csv()
  .fromFile(metadata_path + metadata_file)
  .then((jsonObj) => {
    var metadata_datasets = [];
    var match = 0;
    var unknown = 0;
    var empty = 0;
    for (var i = 0; i < jsonObj.length; i++) {
      var original_title = jsonObj[i]['original_title'];
      for (var j = 0; j < list_paths_names.length; j++) {
        // var file_path = '?';
        var file_name = list_paths_names[j]['file_name'];
        if (file_name == original_title) {
          // match!
          file_path = list_paths_names[j]['file_path'];
          match++
          break;
        }
        else {
          // doesn't match!
          file_path = '';
          file_name = '';
        }
      }
      metadata_datasets.push({
        'unique_resource_id': jsonObj[i]['unique_resource_id'],
        'title': jsonObj[i]['title'],
        'original_title' : original_title,
        'topic_category': jsonObj[i]['topic_category'],
        'resource_type': jsonObj[i]['resource_type'],
        'limitations_access': jsonObj[i]['limitations_access'],
        'file_path': file_path,
        'file_name': file_name
      });
    }
    // console.log(metadata_datasets);
    console.log('matched '+match+'/'+(i+1));
    converter.json2csv(metadata_datasets, function(err, csv) {
      if (err) throw err;
      fs.writeFileSync(metadata_path + 'metadata_datasets.csv', csv);
    });
  });

console.log('Done!');
