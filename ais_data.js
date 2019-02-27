const fs = require('fs');
var turf = require('@turf/turf');
var cmd = require('node-cmd');

var dataPath = '/home/pb/Work/SAERI/ais_data/';

var searchWithin  = JSON.parse(fs.readFileSync(dataPath+'ukho_ficz_focz_limits_noland.geojson'));
var points  = JSON.parse(fs.readFileSync(dataPath+'all_ais_14_19.geojson'));

var ptsWithin = turf.pointsWithinPolygon(points, searchWithin);
console.log('done!');

fs.writeFileSync(dataPath+'ptsWithinPolygon.geojson',JSON.stringify(ptsWithin));
