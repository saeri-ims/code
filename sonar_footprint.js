var fs = require('fs');
var turf = require('@turf/turf');

var data_path = '/home/pb/Sites/data/';

var bathymt = JSON.parse(fs.readFileSync(data_path + 'Bathymetry_4326.geojson'));
var southbb = JSON.parse(fs.readFileSync(data_path + 'SouthBB_4326.geojson'));

var intersects = turf.lineIntersect(southbb, bathymt);

// console.log(intersects.features[0].geometry);

console.log (turf.length(southbb, {units: 'nauticalmiles'}) / 8);

var sonarFootprint = turf.featureCollection([]);
turf.featureEach(bathymt, function(currentFeature, featureIndex) {
  var intersects = turf.lineIntersect(southbb, currentFeature);
  if (intersects.features[0] != undefined) {
    // console.log(intersects.features.length + ' radius = ' + Math.abs(currentFeature.properties.Depth * 0.004) + ' km ');
    turf.featureEach(intersects, function(currentPoint, pointIndex) {
      circle = turf.circle(currentPoint.geometry.coordinates, Math.abs(currentFeature.properties.Depth * 0.004),{step:8});
      circle.properties.depth = currentFeature.properties.Depth;
      sonarFootprint.features.push(circle);
      console.log(sonarFootprint);
    });
  };
});
fs.writeFileSync(data_path+'sonarFootprint.geojson',JSON.stringify(sonarFootprint));
