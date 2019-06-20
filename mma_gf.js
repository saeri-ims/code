var fs = require('fs');
var turf = require('@turf/turf');
var cmd = require('node-cmd');

var data_path = '/mnt/Data/MMA_Project/data/';
var analysis = 'benthos';
// var analysis = 'species';
var combined = JSON.parse(fs.readFileSync(data_path+'mma_gf_'+analysis+'_combined.json'));
var all_R = JSON.parse(fs.readFileSync(data_path+'mma_gf_'+analysis+'_all_R.json'));

var images = [];
var result = [];
var count = 0;

for (var i = 0; i < combined.length; i++) {
  image = combined[i]['image'];
  console.log(image);
  if (analysis == 'benthos') {
    var spp_name = combined[i]['spp_name'];
  }
  if (!images.includes(image)) {
    var trans = all_R[0];
    images.push(image);
    trans['image'] = image;
    trans['date'] = combined[i]['date'];
    trans['site_number'] = combined[i]['site_number'];
    trans['site_name'] = combined[i]['site_name'];
    trans['lat'] = combined[i]['lat'];
    trans['lon'] = combined[i]['lon'];
    trans['depth'] = combined[i]['depth'];
    trans['transect'] = combined[i]['transect'];
    if (analysis == 'benthos') {
      // trans['quadrat'] = combined[i]['quadrat'];
      trans[spp_name] = combined[i]['n_points_per_spp'];
    }
    console.log(trans);

    result.push(trans);
    // all_R.push.apply(all_R, trans);
  }
}
// console.log(result);
// fs.writeFileSync(data_path+'mma_gf_'+analysis+'_all_R_trans.json',JSON.stringify(result));
