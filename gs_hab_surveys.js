var fs = require('fs');
var turf = require('@turf/turf');
var cmd = require('node-cmd');

var data_path = '/mnt/Data/Habitat_Surveys/data/'

var geojson = JSON.parse(fs.readFileSync(data_path + '2019_SouthGeorgia_Ground_Validation.geojson'));
var results = JSON.parse(fs.readFileSync(data_path + 'gs_hab_survey_results.json'));
var count = 0;

turf.featureEach(geojson, function(currentFeature, featureIndex) {
  name = currentFeature.properties.name;

  for (var i = 0; i < results.length; i++) {
    if (results[i].waypoint != undefined && results[i].waypoint == name) {
      Object.assign(currentFeature.properties, results[i]);
      count++;
    }
  }

  for (var property in currentFeature.properties) {

    if (currentFeature.properties[property] === null || currentFeature.properties[property] === undefined || currentFeature.properties[property] === '') {
      delete currentFeature.properties[property];
    };
    if (property == 'picture_ground' || property == 'picture_north' || property == 'picture_east' || property == 'picture_south' || property == 'picture_west') {
      currentFeature.properties[property] = currentFeature.properties[property]['url'];
    };
    console.log (currentFeature.properties);

  };

});

fs.writeFileSync(data_path+'gs_Ground_Validation.geojson',JSON.stringify(geojson));
