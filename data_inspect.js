var fs = require('fs');
var request = require('sync-request');
var _t = require('/home/pb/Work/code/_tools.js');
var data_path = '/home/pb/Work/SAERI/BugsDatabase/biosecurity/data/';
var bugs = JSON.parse(fs.readFileSync(data_path + 'Bugs.json'));
var audit = JSON.parse(fs.readFileSync(data_path + 'bugs_audit.json'));
// var names = JSON.parse(fs.readFileSync(data_path + 'names.json'));
// var submitters = JSON.parse(fs.readFileSync(data_path + 'Submitters.json'));



var expected = ['Class', 'Order', 'Family', 'Genus', 'Species'];
var col_names = {};
var names = [];
var class_ification = audit.classification_old;
var url = "http://webservice.catalogueoflife.org/col/webservice?format=json&name=";

/*
for (var i = 0; i < class_ification.length; i++) {
  var chunks = class_ification[i][1].split(' | ');
  for (var y = 0; y < chunks.length; y++) {
    if (names.indexOf(chunks[y]) < 0 && chunks[y] != '' && chunks[y] != ' ') {
      var res = request('GET', url + chunks[y].replace(' ', '+'));
      var col_result = JSON.parse(res.getBody('utf8'));
      names.push(chunks[y]);
      if (col_result.number_of_results_returned > 0) {
        if (col_result.number_of_results_returned == 1) {
          col_names[chunks[y]] = col_result.results[0]; // -------------------> match
        } else {
          if (chunks[y] == col_result.results[0].name) {
            col_names[chunks[y]] = col_result.results[0]; // -------------------> match
          } else {
            if (y > 0 && chunks[y].indexOf(' ') < 0) {
              chunk_n = chunks[y - 1] + ' ' + chunks[y];
              res = request('GET', url + chunk_n.replace(' ', '+'));
              col_result = JSON.parse(res.getBody('utf8'));
              if (col_result.number_of_results_returned == 1) {
                col_names[chunks[y]] = col_result.results[0]; // -------------------> match
              }
            }
          }
        }
      }
      console.log(i + ' ' + expected[y] + ' --- ' + chunks[y] + ' -> ' + col_result.number_of_results_returned + ((col_result.number_of_results_returned > 0) ? (' -> ' + col_result.results[0].name + ' ---- ' + col_result.results[0].rank) : ''));
    }
  }
}
fs.writeFileSync(data_path + 'names_01.json', JSON.stringify(names));
fs.writeFileSync(data_path + 'col_names.json', JSON.stringify(col_names));


var col_names = JSON.parse(fs.readFileSync(data_path + 'col_names.json'));
var col_names_1_result = [];
var classification = [];

for (var name in col_names) {
  col_names_1_result.push(name);
  classification.push(col_names[name]);
}
fs.writeFileSync(data_path+'col_names_1_result.json',JSON.stringify(col_names_1_result));
fs.writeFileSync(data_path+'Classification.json',JSON.stringify(classification));

*/

var col_names_1_result = JSON.parse(fs.readFileSync(data_path + 'col_names_1_result.json'));
var classification_json = JSON.parse(fs.readFileSync(data_path + 'Classification.json'));
var clasif = 0;
for (var i = 0; i < bugs.length; i++) {
  bugs[i].name = '';
  bugs[i].classification = '';
  var chunks = bugs[i].classification_old.split(' | ');
  name = chunks[chunks.length-1];
  index = col_names_1_result.indexOf(name);
  if (index > -1) {
    bugs[i].classification = index;
    bugs[i].name = classification_json[index].name;
    console.log(index+ ' ---> ' +bugs[i].classification_old+' -- '+name+' --> '+classification_json[index].name+' -->> '+classification_json[index].rank);
    clasif++;
  }
}

fs.writeFileSync(data_path+'Bugs.json',JSON.stringify(bugs));
console.log('sorted '+clasif+'/'+i);

fs.writeFileSync(data_path+'bugs_audit.json',JSON.stringify(_t.get_occurrences(bugs)));

// console.log(classification);


// var search = 'Pediculus+humanus+capitis';
// var expected = [
//   'Class',
//   'Order',
//   'Family',
//   'Genus',
//   'Species'
// ];
// var col_names = {};
// var res_names = []
// var classification = [];
// var names = [];
// //
// for (var name in col_names) {
//   names.push(name);
//   classification.push(col_names[name]);
// }
// fs.writeFileSync(data_path+'col_names_1_result.json',JSON.stringify(names));
// fs.writeFileSync(data_path+'Classification.json',JSON.stringify(classification));
// console.log(bugs[0]);

// for (var i = 0; i < classification.length; i++) {
//   var chunks = classification[i][1].split(' | ');
//   for (var y = 0; y < chunks.length; y++) {
//     if (names.indexOf(chunks[y]) < 0 && chunks[y] != '' && chunks[y] != ' ') {
//       var res = request('GET', url + chunks[y].replace(' ', '+'));
//       var col_result = JSON.parse(res.getBody('utf8'));
//       names.push(chunks[y]);
//       if (col_result.number_of_results_returned > 0) {
//
//         if (col_result.number_of_results_returned == 1) {
//
//           col_names[chunks[y]] = col_result.results[0];
//         } else {
//           if (y == 4 && chunks[y].indexOf(' ') < 0) {
//             chunk_n = chunks[y - 1] + ' ' + chunks[y];
//             res = request('GET', url + chunk_n.replace(' ', '+'));
//             col_result = JSON.parse(res.getBody('utf8'));
//             if (col_result.number_of_results_returned == 1) {
//               col_names[chunks[y]] = col_result.results[0];
//             }
//           }
//         }
//       }
//       console.log(i + ' ' + expected[y] + ' --- ' + chunks[y] + ' -> ' + col_result.number_of_results_returned + ((col_result.number_of_results_returned > 0) ? (' -> ' + col_result.results[0].name + ' ---- ' + col_result.results[0].rank) : ''));
//     }
//   }
// }
// console.log(col_result)
// fs.writeFileSync(data_path + 'names_01.json', JSON.stringify(names));
// fs.writeFileSync(data_path + 'col_names.json', JSON.stringify(col_names));

// console.log(names.length);
// for (var i = 0; i < names.length; i++) {
//   var res = request('GET', url+names[i].replace(' ','+'));
//   var col_result = JSON.parse(res.getBody('utf8'));
//   if (col_result.number_of_results_returned > 0) {
//     col_names[names[i]] = col_result;
//     // if (col_result.number_of_results_returned == 1) {
//     //   col_classification[col_result.results[0].id] = col_result.results[0]
//     // }
//     console.log(i+' --> '+col_result.results[0].name);
//   }
//   else {
//     res_names.push(names[i]);
//   }
// }
// fs.writeFileSync(data_path+'res_names.json',JSON.stringify(res_names));
// console.log('res_names '+res_names.length);
