var fs = require('fs');
var turf = require('@turf/turf');
var cmd = require('node-cmd');
var path = require('path');
var data_path = '/mnt/Data/Habitat_Surveys/data_hab_surveys/'

function walkSync(currentDirPath, callback) {
    fs.readdirSync(currentDirPath).forEach(function (name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            callback(filePath, stat);
        } else if (stat.isDirectory()) {
            walkSync(filePath, callback);
        }
    });
}

var gpxs = [];
walkSync(data_path+'gpxs/', function(filePath) {
    var name = path.basename(filePath);
    gpxs.push(name);
});

var forms = [];
walkSync(data_path+'forms/', function(filePath) {
    var name = path.basename(filePath);
    forms.push(name);
});

var geojson = [];
for (var i = 0; i < gpxs.length; i++) {
  geojson[i] = JSON.parse(fs.readFileSync(data_path+'gpxs/' + gpxs[i]));
}

var results = [];
for (var i = 0; i < forms.length; i++) {
  results[i] = JSON.parse(fs.readFileSync(data_path+'forms/' + forms[i]));
}

var count = 0;
var groundValidationPoints = turf.featureCollection([]);
for (var g = 0; g < geojson.length; g++) {
  for (var r = 0; r < results.length; r++) {
    turf.featureEach(geojson[g], function(currentFeature, featureIndex) {
      var name = currentFeature.properties.name;
      var time = new Date(currentFeature.properties.time);
      for (var i = 0; i < results[r].length; i++) {
        count++; // counting gvps
        var gvp = results[r][i];
        var waypoint = gvp.waypoint;
        var start = new Date(gvp.start);
        if (waypoint != undefined && waypoint == name && start.setHours(0,0,0,0) == time.setHours(0,0,0,0)) {
          Object.assign(currentFeature.properties, gvp);
          // console.log(gpxs[g]+' '+start+' '+waypoint+' '+forms[r]);
          // Optimize
          for (var property in currentFeature.properties) {
            if (currentFeature.properties[property] == null || currentFeature.properties[property] == undefined || currentFeature.properties[property] == '') {
              delete currentFeature.properties[property];
            };
            if (property == 'picture_ground' || property == 'picture_north' || property == 'picture_east' || property == 'picture_south' || property == 'picture_west') {
              if (currentFeature.properties[property] != undefined) currentFeature.properties[property] = currentFeature.properties[property]['url'];
            };
          };

          // Store
          groundValidationPoints.features.push(currentFeature);

          break;
        }
      }

    });
  }
}
// console.log(groundValidationPoints);
console.log(groundValidationPoints.features.length+'/'+count);

fs.writeFileSync(data_path+'Bran/GroundValidationPoints.geojson',JSON.stringify(groundValidationPoints));
