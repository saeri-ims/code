var fs = require('fs');
var turf = require('@turf/turf');
var cmd = require('node-cmd');
var path = require('path');
var data_path = '/mnt/Data/Habitat_Surveys/data_hab_surveys/'
var base_url = 'https://ims.saeri.org/psm4cm/';
var data = JSON.parse(fs.readFileSync(data_path + 'manually/dsm4cm.geojson'));

var count = 0;
var groundValidationPoints = turf.featureCollection([]);
turf.featureEach(data, function(currentFeature, featureIndex) {
  count++; // counting gvps
  var point = currentFeature.properties.Point_Number;
  currentFeature.properties.Photo_N = base_url+point+'/N.jpg';
  currentFeature.properties.Photo_E = base_url+point+'/E.jpg';
  currentFeature.properties.Photo_S = base_url+point+'/S.jpg';
  currentFeature.properties.Photo_W = base_url+point+'/W.jpg';
  // Optimize
  for (var property in currentFeature.properties) {
    if (currentFeature.properties[property] == null || currentFeature.properties[property] == undefined || currentFeature.properties[property] == '') {
      delete currentFeature.properties[property];
    };
    if (property == 'picture_ground' || property == 'picture_north' || property == 'picture_east' || property == 'picture_south' || property == 'picture_west') {
      if (currentFeature.properties[property] != undefined) currentFeature.properties[property] = currentFeature.properties[property]['url'];
    };
  };

  // Store
  groundValidationPoints.features.push(currentFeature);

});
// console.log(groundValidationPoints);
console.log(groundValidationPoints);

fs.writeFileSync(data_path + 'Bran/' + (new Date()).toISOString().replace(/-/g, '').split('T')[0] + '_Soil4Coastal_Mapping.geojson', JSON.stringify(groundValidationPoints));
