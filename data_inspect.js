var fs = require('fs');
var _t = require('/home/pb/Work/code/_tools.js');

var data_path = '/home/pb/Work/SAERI/BugsDatabase/biosecurity/data/'
var bugs = JSON.parse(fs.readFileSync(data_path + 'BugsDB.json'));

fs.writeFileSync(data_path+'bugs_audit.json',JSON.stringify(_t.get_occurrences(bugs)));
// console.log(_t.get_occurrences(bugs));
