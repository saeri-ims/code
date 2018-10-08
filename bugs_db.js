var fs = require('fs');
var cmd = require('node-cmd');

var data_path = '/home/pb/Work/SAERI/BugsDatabase/biosecurity/data'
var bugs = JSON.parse(fs.readFileSync(data_path + 'BugsDB.json'));
var submitters = [];
var names = [];
var names_count = [];
var number = 0;
for (var i = 0; i < bugs.length; i++) {
  var name = bugs[i].submitter_name;
  if (names.indexOf(name) < 0){
    var submitter = {
      id:++number,
      name:name,
      address:bugs[i].address,
      email:bugs[i].email,
      phone:bugs[i].phone
    }
    names.push(name);
    submitters.push(submitter);
    names_count[names.indexOf(name)] = 1;
  }
  else {
    names_count[names.indexOf(name)] = names_count[names.indexOf(name)] + 1;
  }
  bugs[i].submitter = names.indexOf(name)+1;
  delete bugs[i].address;
  delete bugs[i].email;
  delete bugs[i].phone;
  delete bugs[i].submitter_name;
  // console.log(bugs[i].submitter+'-'+bugs[i].submitter_name+'-'+submitters[names.indexOf(name)].name+'-'+names[names.indexOf(name)]);
  // console.log(bugs[i].location);
}
// console.log(names_count);
// fs.writeFileSync(data_path+'Submitters.json',JSON.stringify(submitters));
// fs.writeFileSync(data_path+'Bugs.json',JSON.stringify(bugs));

console.log(occurrences(bugs,{key:'submitter', value:7}));

function occurrences (array,cond,write) {
  var amnt = 0;
  var result = {
    values:[],
    count:[]
  };
  for (var i = 0; i < array.length; i++) {
    if (array[i][cond.key] == cond.value) amnt++
  }
  return amnt;
}
