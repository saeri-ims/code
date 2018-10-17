var fs = require('fs');
var cmd = require('node-cmd');
var _t = require('/home/pb/Work/code/_tools.js');
var Json2csvParser = require('json2csv').Parser;
var data_path = '/home/pb/Work/SAERI/BugsDatabase/biosecurity/data/'
var bugs = JSON.parse(fs.readFileSync(data_path + 'Bugs.json'));
var audit = JSON.parse(fs.readFileSync(data_path + 'bugs_audit.json'));
var clasiffication = JSON.parse(fs.readFileSync(data_path + 'Classification.json'));
var submitters = JSON.parse(fs.readFileSync(data_path + 'Submitters.json'));


// _t.print_audit (20, audit.classification, clasiffication, 'name');
//
// _t.print_audit (20, audit.classification_old);
//
// _t.print_audit (20, audit.submitter, submitters, 'name');

// _t.print_audit (20, audit.location);

// _t.print_audit (20, audit.origin);

// _t.print_audit (20, audit.vessel);

// _t.print_audit (20, audit.common_name);
//
// _t.print_audit (20, audit.latin_name);

console.log(audit.latin_name.length);

// var prxport = [];
// for (var i = 0; i < bugs.length; i++) {
//   // prxport[i] = {};
//   // string = i+' '+bugs[i].classification_old+' -- '+bugs[i].latin_name+' -- '+bugs[i].name;
//   sub = (bugs[i].submitter !== '')?submitters[bugs[i].submitter].name+' | '+submitters[bugs[i].submitter].address:'';
//   // string = i+' '+bugs[i].location+' -- '+bugs[i].name+' --> '+sub;
//   if (bugs[i].location !== '') {
//     prxport[i] = {
//       'location_old' : bugs[i].location,
//       'location_name' : '',
//       'location_Geo_URI' : '',
//       'bug_name' : bugs[i].name,
//       'description' : bugs[i].description,
//       'comments': bugs[i].comments,
//       'submitter' : sub
//     }
//   }
// }

// for (var i = 0; i < bugs.length; i++) {
//   string = i+' '+bugs[i].name+' -- '+bugs[i].latin_name;
//   if (bugs[i].endemic === 1) console.log(string);
// }

// var fields = prxport[0].keys;
// var json2csvParser = new Json2csvParser({ fields });
// var csv = json2csvParser.parse(prxport);
//
// console.log(csv);
// // fs.writeFileSync(data_path+'Bugs.json',JSON.stringify(bugs));
// fs.writeFileSync(data_path+'clasiffication.csv',csv);
// console.log(csv);

// fs.writeFileSync(data_path+'bugs_audit.json',JSON.stringify(_t.get_occurrences(bugs)));
