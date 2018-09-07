var fs = require('fs');
var turf = require('@turf/turf');

// var now = new Date(dateString).toString();
// var now = new Date(dateString);
// var jsonDate = now.toJSON();

var DOKE_data_path = '/media/pb/DATA/DOKE_data/';
var log  = JSON.parse(fs.readFileSync(DOKE_data_path+'doke_log.json'));

// 925.0000 7  UWND 108  VWND 236  HGTS 230  TEMP 123  WWND 82  RELH 20  TKEN  47
// https://en.wikipedia.org/wiki/METAR

var logsCollection = turf.featureCollection([]);

var index_a = 0;
var y = -1;
for (var i = 0; i < log.length; i++) {
  index_b = log[i].Index
  if (index_a != index_b) {
    index_a = index_b
    y++
    var lineString =  turf.lineString([[log[i].LondecS,log[i].LatdecS],[log[i].LondecE,log[i].LatdecE]],{
      s_e: log[i].S_E,
      project: log[i].Project,
      area: log[i].Area,
      survey: log[i].Survey,
      effort: log[i].Effort,
      eff_kind: log[i].Eff_kind,
      winddir: log[i].WindDir,
      beaufort: log[i].Beaufort,
      douglas: log[i].Douglas,
      swell: log[i].Swell,
      cloudcover: log[i].CloudCover,
      rain: log[i].Rain,
      glare: log[i].Glare,
      glaresector: log[i].GlareSector,
      sighthability: log[i].Sighthability,
      sighbno: log[i].SighbNo,
      sighloc: log[i].SighLoc,
      preeff: log[i].PreEff,
      sightno: log[i].SightNo,
      sp: log[i].Sp,
      date: log[i].Yeara+'/'+log[i].Montha+'/'+(log[i].Date_num).slice(-2),
      notes: log[i].Notes
    });
    logsCollection.features.push(lineString);
  }
  else {
    logsCollection.features[y].geometry.coordinates.push([log[i].LondecE,log[i].LatdecE]);
  }
}
fs.writeFileSync(DOKE_data_path+'doke_log.geojson',JSON.stringify(logsCollection));
// console.log(logsCollection.features[0]);
