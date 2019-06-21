const fs = require('fs');
const turf = require('@turf/turf');
const cmd = require('node-cmd');
const conv = require('json-2-csv');

var data_path = '/mnt/Data/MMA_Project/data/';
// var analysis = 'benthos';
var analysis = 'species';
var combined = JSON.parse(fs.readFileSync(data_path + 'mma_gf_' + analysis + '_combined.json'));
var all_R = JSON.parse(fs.readFileSync(data_path + 'mma_gf_' + analysis + '_all_R.json'));

var images = [];

for (var i = 0; i < combined.length; i++) {
  image = combined[i]['image'];
  if (analysis == 'benthos') {
    var spp_name = combined[i]['spp_name'];
    var spp_nmbr = combined[i]['n_points_per_spp'];
  } else if (analysis == 'species') {
    var spp_name = combined[i]['spp'].split('-')[1];
    var spp_nmbr = combined[i]['spp_total'];
  }
  if (!images.includes(image)) {
    var trans = {};
    trans = all_R.slice(0)[0];
    images.push(image);
    trans['image'] = image;
    trans['date'] = combined[i]['date'];
    trans['site_number'] = combined[i]['site_number'];
    trans['site_name'] = combined[i]['site_name'];
    trans['lat'] = combined[i]['lat'];
    trans['lon'] = combined[i]['lon'];
    trans['depth'] = combined[i]['depth'];
    trans['transect'] = combined[i]['transect'];
    trans[spp_name] = spp_nmbr;
    temp = JSON.parse(JSON.stringify(trans));
    all_R.push(temp);
  } else {
    all_R.map(function(e) {
      if (e['image'] == image) {
        e[spp_name] = spp_nmbr;
      }
    });
  }
}
fs.writeFileSync(data_path + 'mma_gf_' + analysis + '_all_R_filled.json', JSON.stringify(all_R));
conv.json2csv(all_R, function(err, csv) {
  if (err) throw err;
  fs.writeFileSync(data_path + 'mma_gf_' + analysis + '_all_R.csv', csv);
});
