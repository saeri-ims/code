var fs = require('fs');
var turf = require('@turf/turf');
var cmd = require('node-cmd');

var data_path = '/home/pb/Work/SAERI/Habitat_Surveys/data/'
var gpx = JSON.parse(fs.readFileSync(data_path + 'gpx.geojson'));
var results = JSON.parse(fs.readFileSync(data_path + 'results.json'));

turf.featureEach(gpx, function(currentFeature, featureIndex) {
  name = currentFeature.properties.name;
  for (var i = 0; i < results.length; i++) {
    if ( results[i].waypoint != undefined && results[i].waypoint == name) {
      Object.assign(currentFeature.properties,results[i])
    }
  }
  for (var property in currentFeature.properties) {
    if (currentFeature.properties[property] === null || currentFeature.properties[property] === undefined || currentFeature.properties[property] === '') {
      delete currentFeature.properties[property];
    };
  };
});

fs.writeFileSync(data_path+'hab_survey_opt.geojson',JSON.stringify(gpx));
