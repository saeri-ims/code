var fs = require('fs');
var turf = require('@turf/turf');
var cmd = require('node-cmd');

var data_path = '/home/pb/Work/SAERI/Habitat_Surveys/2019_02_14_primo_waypoints/'

var gpx = JSON.parse(fs.readFileSync(data_path + '2019_02_14_primo_waypoints.geojson'));
var count = 0;
var results = [
  JSON.parse(fs.readFileSync(data_path + 'fi_hab_survey_results.json')),
  JSON.parse(fs.readFileSync(data_path + 'fi_hab_survey1_results.json')),
  JSON.parse(fs.readFileSync(data_path + 'fi_hab_survey_mod3_results.json'))
]


turf.featureEach(gpx, function(currentFeature, featureIndex) {
  name = currentFeature.properties.name;

  for (var h = 0; h < results.length; h++) {

    for (var i = 0; i < results[h].length; i++) {
      if ( results[h][i].waypoint != undefined && results[h][i].waypoint == name) {
        Object.assign(currentFeature.properties,results[h][i]);
        count++;
      }
    }

  }
  for (var property in currentFeature.properties) {
    if (currentFeature.properties[property] === null || currentFeature.properties[property] === undefined || currentFeature.properties[property] === '') {
      delete currentFeature.properties[property];
    };
  };
});

// fs.writeFileSync(data_path+'primo_wr.geojson',JSON.stringify(gpx));
console.log (count + ' / ' + gpx['features'].length );
