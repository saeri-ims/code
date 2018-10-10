var fs = require('fs');
var cmd = require('node-cmd');

var data_path = '/home/pb/Work/SAERI/BugsDatabase/biosecurity/data/'
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

  //------------------------------------

  //   var class_ = bugs[i].class;
  //   var order = bugs[i].order;
  //   var family = bugs[i].family;
  //   var subfamily = bugs[i].subfamily;
  //   var genus = bugs[i].genus;
  //   var species = bugs[i].species;
  //   bugs[i].classification =  class_+' | '+order+' | '+family+((subfamily!='')?' ('+subfamily+ ')':'')+' | '+genus+' | '+species;
  //
  //   delete bugs[i].class;
  //   delete bugs[i].order;
  //   delete bugs[i].family;
  //   delete bugs[i].subfamily;
  //   delete bugs[i].genus;
  //   delete bugs[i].species;
  //
  //   console.log(bugs[i].classification);

  
}
// console.log(names_count);
// fs.writeFileSync(data_path+'Submitters.json',JSON.stringify(submitters));
fs.writeFileSync(data_path+'Bugs_.json',JSON.stringify(bugs));
