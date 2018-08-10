var fs = require('fs');
var turf = require('@turf/turf');

var flines  = JSON.parse(fs.readFileSync('../data/FlightLines_4326.geojson'));
var pmatrix = JSON.parse(fs.readFileSync('../data/pmatrix.json'));
var imgsinv = JSON.parse(fs.readFileSync('../data/imagesinv.json'));

/***************************************************************************/

var aimgsCollection = turf.featureCollection([]);
var timgs_count = 0;
var pimgs_count = 0;
var mimgs_count = 0;

turf.featureEach(flines, function (currentFeature, featureIndex) {
  var film = currentFeature.properties.FILM;
  var frames = (currentFeature.properties.FRAME != null)?currentFeature.properties.FRAME:currentFeature.properties.FRAMES;
  var heading = currentFeature.properties.HEADING;
  var layer = currentFeature.properties.LAYER;
  var line = turf.lineString(currentFeature.geometry.coordinates[0]);
  var cmatrix = pmatrix[film][frames];
  var frm_ext = frames.split('-');
  var count = (frm_ext[1]!=null)?(Math.abs(eval(frm_ext[0]-frm_ext[1])))+1:1;
  REC_SIZE = cmatrix.REC_SIZE;
  H_OFFSET = cmatrix.H_OFFSET;
  V_OFFSET = cmatrix.V_OFFSET;
  S_RECTFN = cmatrix.S_RECTFN;
  // console.log(film.substr(3,2)+' --> '+frames+' = '+count+' '+heading);
  var offsetLine = turf.lineOffset(line, V_OFFSET); //default kilomiters
  var lineDistance = turf.lineDistance(line);
  var segments = lineDistance / count;
  for (let i = 0; i < count; i++) {
    point = turf.along(line, (segments + S_RECTFN) * i);
    buffered = turf.buffer(point, REC_SIZE, {
      steps: 8
    });
    bbox = turf.bbox(buffered);
    bboxPolygon = turf.bboxPolygon(bbox);
    offsetPolygon = turf.transformTranslate(bboxPolygon, H_OFFSET, 270);
    offsetPolygon = turf.transformTranslate(offsetPolygon, V_OFFSET, 180);
    // bboxPhoto = turf.bbox(offsetPolygon);
    // coorPhoto = [
    //   [bboxPhoto[0], bboxPhoto[3]],
    //   [bboxPhoto[2], bboxPhoto[3]],
    //   [bboxPhoto[2], bboxPhoto[1]],
    //   [bboxPhoto[0], bboxPhoto[1]]
    // ];
    /*--------------------------------------------------*/
    var ord = (heading=='EAST')?parseInt(frm_ext[0])+i:parseInt(frm_ext[0])-i;
    var img = 'F_I_'+film.substr(3,2)+'_'+('0000' + ord).slice(-4);
    timgs_count++
    offsetPolygon.properties.name = img;
    // offsetPolygon.properties.present = (imgsinv.indexOf(img) > -1)?1:0;
    if (imgsinv.indexOf(img) > -1) { presence = 1; pimgs_count++; } else { mimgs_count++; presence = 0; };
    offsetPolygon.properties.present = presence;
    aimgsCollection.features.push(offsetPolygon);
    console.log(offsetPolygon);
  };
});
console.log('total of images->' + timgs_count + ', resized & cropped->' + imgsinv.length +', placed->' + pimgs_count + ', missing->' + mimgs_count)
fs.writeFileSync('../data/images_georeference.geojson',JSON.stringify(aimgsCollection));
/***************************************************************************/

/**********
/  q°|°p  /
/    ~    /
**********/
