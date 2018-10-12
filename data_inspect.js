var fs = require('fs');
// var request = require('request');
var request = require('sync-request');
var _t = require('/home/pb/Work/code/_tools.js');

var data_path = '/home/pb/Work/SAERI/BugsDatabase/biosecurity/data/'
var bugs = JSON.parse(fs.readFileSync(data_path + 'Bugs.json'));
var audit = JSON.parse(fs.readFileSync(data_path + 'bugs_audit.json'));
// var submitters = JSON.parse(fs.readFileSync(data_path + 'Submitters.json'));

// for (var i = 0; i < bugs.length; i++) {

// }
// fs.writeFileSync(data_path+'Bugs.json',JSON.stringify(bugs));
var classification = audit.classification;
// console.log(classification);

// fs.writeFileSync(data_path+'bugs_audit.json',JSON.stringify(_t.get_occurrences(bugs)));
var search = 'Pediculus+humanus+capitis';
var url = "http://webservice.catalogueoflife.org/col/webservice?format=json&name=";

// request(url, function (error, response, body) {
//   // console.log('error:', error);
//   // console.log('statusCode:', response && response.statusCode);
//   // console.log('body:', body);
//   // console.log (JSON.parse(body));
// });


// var res = request('GET', url, {
//   // json: {username: 'ForbesLindesay'},
// });

var expected = [
  'Class',
  'Order',
  'Family',
  'Genus',
  'Species'
];
var names = [];
for (var i = 0; i < classification.length; i++) {
  var chunks = classification[i][1].split(' | ');
  for (var y = 0; y < chunks.length; y++) {
    if (names.indexOf(chunks[y]) < 0 && chunks[y] != '' && chunks[y] != ' ') {
      var res = request('GET', url+chunks[y].replace(' ','+'));
      var col_result = JSON.parse(res.getBody('utf8'));
      // if  (y == 4 && col_result.number_of_results_returne > 1) {
      //   chunks[y] = chunks[y-1]+'+'+chunks[y];
      //   res = request('GET', url+chunks[y].replace(' ','+'));
      //   col_result = JSON.parse(res.getBody('utf8'));
      // }
      names.push(chunks[y]);
      console.log(expected[y]+' --- '+chunks[y]+' -> '+col_result.number_of_results_returned+((col_result.number_of_results_returned > 0)?(' -> '+col_result.results[0].name+' ---- '+col_result.results[0].rank):''));
    }
    //
  }
  // console.log(chunks);
}
// console.log(col_result)
