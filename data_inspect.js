var fs = require('fs');
var request = require('request');
var _t = require('/home/pb/Work/code/_tools.js');

var data_path = '/home/pb/Work/SAERI/BugsDatabase/biosecurity/data/'
var bugs = JSON.parse(fs.readFileSync(data_path + 'Bugs.json'));
// var submitters = JSON.parse(fs.readFileSync(data_path + 'Submitters.json'));

// for (var i = 0; i < bugs.length; i++) {

// }
// fs.writeFileSync(data_path+'Bugs.json',JSON.stringify(bugs));


// fs.writeFileSync(data_path+'bugs_audit.json',JSON.stringify(_t.get_occurrences(bugs)));
var search = 'Pediculus+humanus+capitis';
var url = "http://webservice.catalogueoflife.org/col/webservice?format=json&name="+search;

request(url, function (error, response, body) {
  // console.log('error:', error);
  // console.log('statusCode:', response && response.statusCode);
  // console.log('body:', body);
  console.log (JSON.parse(body));
});
