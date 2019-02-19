var fs = require('fs');
var turf = require('@turf/turf');

var data_path = '/home/pb/Sites/data/';

var stationData = JSON.parse(fs.readFileSync(data_path + 'station_data_sexy_map.geojson'));

var sexyBuffer = turf.featureCollection([]);
// turf.featureEach(stationData, function(currentFeature, featureIndex) {
//   var center = currentFeature.geometry;
//   circle = turf.circle(center, 35, { units: 'kilometers'});
//   sexyBuffer.features.push(circle);
// });
var sexyBuffer = turf.buffer(stationData, 85, {units: 'kilometers'});
fs.writeFileSync(data_path+'sexyBuffer.geojson',JSON.stringify(sexyBuffer));
console.log('done!');

// var clustered = turf.clustersDbscan(points, maxDistance);
// turf.getCluster(clustered, {'marker-symbol': 'circle'}).length;
