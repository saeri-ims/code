var fs = require('fs');
var turf = require('@turf/turf');

var photos = {
  'original':  '1956_Aerial_Photos_original_tif',
  'resampled':  '1956_Aerial_Photos_resampled_jpg',
  'thumbnail':  '1956_Aerial_Photos_thumbnail'
}
var media_path = '/media/pb/DATA/1956_Aerial_Photos_data/';
var deliver_path = '/media/pb/DATA/Requested_data/PortHoward/';
var data_path = '/home/pb/Sites/data/';

var requested_area  = JSON.parse(fs.readFileSync(data_path+'requested_area_PortHoward.geojson'));
var images  = JSON.parse(fs.readFileSync(data_path+'1956_Aerial_Imagery.geojson'));

var imgsCollection = turf.featureCollection([]);

// try {fs.mkdirSync(deliver_path);} catch(err) {};
// try {fs.mkdirSync(deliver_path+photos.original);} catch(err) {};
// try {fs.mkdirSync(deliver_path+photos.resampled);} catch(err) {};
// try {fs.mkdirSync(deliver_path+photos.thumbnail);} catch(err) {};

turf.featureEach(images, function (currentFeature, featureIndex) {
  var intersect = turf.intersect(requested_area.features[0].geometry, currentFeature.geometry);
  if (intersect !=  null && currentFeature.properties.present == 1) {
    var name = currentFeature.properties.name;
    console.log(name);
    // try {fs.copyFileSync(media_path+photos.original+'/'+name+'.tif', deliver_path+photos.original+'/'+name+'.tif');} catch(err) {};
    // try {fs.copyFileSync(media_path+photos.resampled+'/'+name+'.jpg', deliver_path+photos.resampled+'/'+name+'.jpg');} catch(err) {};
    // try {fs.copyFileSync(media_path+photos.thumbnail+'/'+name+'.jpg', deliver_path+photos.thumbnail+'/'+name+'.jpg');} catch(err) {};
    imgsCollection.features.push(currentFeature);
  }
});
console.log(imgsCollection.features);
fs.writeFileSync(data_path+'images_PortHoward.geojson',JSON.stringify(imgsCollection));
// console.log(images.features[0].geometry.coordinates[0]);
// console.log(requested_area.features[0].geometry.coordinates[0]);


// Move all files, but not folders:

// find path_to_the_top_folder_containing_images_and_forms -type f -exec mv --backup=numbered -t path_to_the_destination_folder {} +
