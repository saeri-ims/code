var fs = require('fs');
var turf = require('@turf/turf');
var cmd = require('node-cmd');

var data_path = '/mnt/Data/Habitat_Surveys/data/'

var geojson = JSON.parse(fs.readFileSync(data_path + 'hm_validation_points_feb_2019.geojson'));

turf.featureEach(geojson, function(currentFeature, featureIndex) {
  if (currentFeature.properties.picture_ground) currentFeature.properties.picture_ground = currentFeature.properties.picture_ground.url;
  if (currentFeature.properties.picture_north)  currentFeature.properties.picture_north = currentFeature.properties.picture_north.url;
  if (currentFeature.properties.picture_east)  currentFeature.properties.picture_east = currentFeature.properties.picture_east.url;
  if (currentFeature.properties.picture_south)  currentFeature.properties.picture_south = currentFeature.properties.picture_south.url;
  if (currentFeature.properties.picture_west)  currentFeature.properties.picture_west = currentFeature.properties.picture_west.url;

  console.log (currentFeature.properties);

});

  fs.writeFileSync(data_path+'hm_validation_points_feb_2019_fixed.geojson',JSON.stringify(geojson));
