const fs = require('fs');
const csv = require('csvtojson');
const converter = require('json-2-csv');

var dataPath = '/home/pb/Work/SAERI/Nick_Metadata/';
var csvFile = 'metadata_OTs_export190126.csv';

var keywords = [
  'aerial',
  'imagery',
  'drone',
  'satellite',
  'sentinel',
  'landsat'
];

csv()
.fromFile(dataPath+csvFile)
.then((jsonObj)=>{
    var matchingRows = [];
    var count = 0;
    for (var i = 0; i < jsonObj.length; i++) {
      for (var j = 0; j < keywords.length; j++) {
        if (
          jsonObj[i].keywords.toLowerCase().includes(keywords[j].toLowerCase())
          // || jsonObj[i].title.toLowerCase().includes(keywords[j].toLowerCase())
          // || jsonObj[i].abstract.toLowerCase().includes(keywords[j].toLowerCase())
          // || jsonObj[i].topicCategory.toLowerCase().includes(keywords[j].toLowerCase())
          // || jsonObj[i].lineage.toLowerCase().includes(keywords[j].toLowerCase())
        ) {
          matchingRows.push(jsonObj[i]);
          count++;
          break;
        }
      }
    }
    console.log(count);
    converter.json2csv(matchingRows, function (err, csv) {
      if (err) throw err;
      // fs.writeFileSync(dataPath+'nick_eo.csv',csv);
    });
});
