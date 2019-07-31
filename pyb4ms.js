const fs = require('fs');
const cmd = require('node-cmd');
const path = require('path');
const csv = require('csvtojson');

var data_path = '/mnt/Data/Habitat_Surveys/data_hab_surveys/'
var base_url = 'https://ims.saeri.org/pyb4cm/';

csv()
  .fromFile(data_path + 'manually/dyb4cm.csv')
  .then((jsonObj) => {
    var metadata_datasets = [];
    for (var i = 0; i < jsonObj.length; i++) {
      var waypoint = jsonObj[i]['waypoint'];
      var photos_path = '/mnt/NAS/saeridata/ground_validation_images_coastal_mapping_project/2018_09_06_YorkBay_GroundValidation_Steffi/';
      try {
        files = fs.readdirSync(photos_path + waypoint);
      } catch (err) {
        // An error occurred
        console.error(err);
      }
      jsonObj[i]['picture_g'] = base_url+waypoint+'/'+files[0];
      jsonObj[i]['picture_n'] = base_url+waypoint+'/'+files[1];
      jsonObj[i]['picture_e'] = base_url+waypoint+'/'+files[2];
      jsonObj[i]['picture_s'] = base_url+waypoint+'/'+files[3];
      jsonObj[i]['picture_w'] = base_url+waypoint+'/'+files[4];
      console.log(jsonObj[i]);
    }
    fs.writeFileSync(data_path + 'forms/2018_09_06_YorkBay.json', JSON.stringify(jsonObj));
    console.log('Done!');
  });
