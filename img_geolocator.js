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
  var distance = turf.lineDistance(line);
  var segments = distance / count;
  var strpoint = currentFeature.geometry.coordinates[0][0];
  var endpoint = currentFeature.geometry.coordinates[0][1];
  for (let i = 0; i < count; i++) {
    center = turf.along(line, segments * i);
    if (count == 1) endpoint = center;
    // rotangle = turf.rhumbBearing(strpoint,endpoint); // slope
    rotangle = turf.rhumbBearing(strpoint,endpoint,{final:true});
    strpoint = center;
    // circle radius: 5.72km / 2 = 2.86km
    circle = turf.circle(center, 2.86, {units: 'kilometers',steps: 8});
    envelopePolygon = turf.envelope(circle);
    hoffangle = (H_OFFSET < 0)?270:90;
    voffangle = (V_OFFSET < 0)?0:180;
    offsetPolygon = turf.transformTranslate(envelopePolygon, H_OFFSET, hoffangle);
    offsetPolygon = turf.transformTranslate(offsetPolygon, V_OFFSET, voffangle);
    groundFootprint = turf.transformRotate(offsetPolygon,rotangle);
    /*--------------------------------------------------*/
    var ord = (heading=='EAST')?parseInt(frm_ext[0])+i:parseInt(frm_ext[0])-i;
    var img = 'F_I_'+film.substr(3,2)+'_'+('0000' + ord).slice(-4);
    groundFootprint.properties.name = img;
    groundFootprint.properties.present = (imgsinv.indexOf(img) > -1)?1:0;
    aimgsCollection.features.push(groundFootprint);
  };
});
fs.writeFileSync(data_path+'1956_Aerial_Imagery.geojson',JSON.stringify(aimgsCollection));
console.log(aimgsCollection.features.length);
/***************************************************************************/

/**********
/  q°|°p  /
/    ~    /
**********/
