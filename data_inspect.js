var fs = require('fs');
var _t = require('/home/pb/Work/code/_tools.js');

var data_path = '/home/pb/Work/SAERI/BugsDatabase/biosecurity/data/'
var bugs = JSON.parse(fs.readFileSync(data_path + 'Bugs.json'));
// var submitters = JSON.parse(fs.readFileSync(data_path + 'Submitters.json'));

// for (var i = 0; i < bugs.length; i++) {

// }
// fs.writeFileSync(data_path+'Bugs.json',JSON.stringify(bugs));
fs.writeFileSync(data_path+'bugs_audit.json',JSON.stringify(_t.get_occurrences(bugs)));
