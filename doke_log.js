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
  if (log[i].PreEff == 'Pos') {

  if (index_a != index_b) {
    index_a = index_b
    y++
    // var lineString =  turf.lineString([[log[i].LondecS,log[i].LatdecS],[log[i].LondecE,log[i].LatdecE]],{
    var point =  turf.point([log[i].LondecS,log[i].LatdecS],{
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
      spotter: log[i].Spotter,
      cue: log[i].Cue,
      behasight: log[i].BehaSight,
      mingr: log[i].MinGr,
      maxmr: log[i].MaxGr,
      grsize: log[i].GrSize,
      changeofset: log[i].ChangeOfSet,
      a: log[i].A,
      j: log[i].J,
      c: log[i].C,
      n: log[i].N,
      qgr: log[i].QGr,
      photoid: log[i].PhotoID,
      video: log[i].Video,
      poo: log[i].Poo,
      genetic: log[i].Genetic,
      notes: log[i].Notes
    });
    logsCollection.features.push(point);
    // logsCollection.features.push(lineString);
  }
  else {
    // logsCollection.features[y].geometry.coordinates.push([log[i].LondecE,log[i].LatdecE]);
  }

} // if Pos

}

//fs.writeFileSync(DOKE_data_path+'doke_log_points_pos.geojson',JSON.stringify(logsCollection));

console.log(logsCollection.features[0]);
