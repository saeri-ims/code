var fs = require('fs');
var turf = require('@turf/turf');

var data_path = '/home/pb/Sites/data/';

var flines  = JSON.parse(fs.readFileSync(data_path+'FlightLines_4326.geojson'));
var pmatrix = JSON.parse(fs.readFileSync(data_path+'pmatrix.json'));
var imgsinv = JSON.parse(fs.readFileSync(data_path+'1956_Aerial_Imagery_inv.json'));

/***************************************************************************/

var aimgsCollection = turf.featureCollection([]);

turf.featureEach(flines, function (currentFeature, featureIndex) {
  var film = currentFeature.properties.FILM;
  var frames = (currentFeature.properties.FRAME != null)?currentFeature.properties.FRAME:currentFeature.properties.FRAMES;
  var heading = currentFeature.properties.HEADING;
  var layer = currentFeature.properties.LAYER;
  var line = turf.lineString(currentFeature.geometry.coordinates[0]);
  var cmatrix = pmatrix[film][frames];
  var frm_ext = frames.split('-');
  var count = (frm_ext[1]!=null)?(Math.abs(eval(frm_ext[0]-frm_ext[1])))+1:1;
  H_OFFSET = cmatrix.H_OFFSET;
  V_OFFSET = cmatrix.V_OFFSET;
  S_RECTFN = cmatrix.S_RECTFN;
  var offsetLine = turf.lineOffset(line, V_OFFSET); //default kilomiters
  var lineDistance = turf.lineDistance(line);
  var segments = lineDistance / count;
  for (let i = 0; i < count; i++) {
    center = turf.along(line, (segments + S_RECTFN) * i);
    // circle radius: 5.72km / 2 = 2.86km
    circle = turf.circle(center, 2.86, {
      units: 'kilometers',
      steps: 8
    });
    envelopePolygon = turf.envelope(circle);
    offsetPolygon = turf.transformTranslate(envelopePolygon, H_OFFSET, 270);
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
    offsetPolygon.properties.name = img;
    offsetPolygon.properties.present = (imgsinv.indexOf(img) > -1)?1:0;
    aimgsCollection.features.push(offsetPolygon);
  };
});
fs.writeFileSync(data_path+'1956_Aerial_Imagery.geojson',JSON.stringify(aimgsCollection));
console.log(aimgsCollection.features.length);
/***************************************************************************/

/**********
/  q°|°p  /
/    ~    /
**********/
