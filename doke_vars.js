var bestSightings = ["005","006","007","011","012","014","019","025","026","027","028","029","030","031","032","033","034","035","036","037","039","040","041","042","043","044","046","047","049","050","059","060","062","063","064","065","066","067","068","069","070","071","072","079","080","081","082","083","084","085","086","088","089","096","106","175","176","183","200","226","228","231","247","264","274","319"];

/*

CC0537_R_DOKE_20180318_293_16440_Cc_MCAZ
CC0173X_R_DOKE_20161222_068_0370_Cc_MCOS
CC0166X_R_DOKE_20161221_063_2460_Cc_MCOS
CC0111X_R_DOKE_20161221_060_1190_Cc_MCOS
CC0058_R_DOKE_20161205_033_0150_Cc_MCOS - Copy

https://www.npmjs.com/package/csvtojson
csvtojson /home/pb/Downloads/Log_PB_Cet.csv > doke_navigation_log.json
csvtojson /media/pb/DATA/DOKE_data/Log_Focal_per_cet_all.csv > /media/pb/DATA/DOKE_data/doke_log.json

https://www.npmjs.com/package/csv
const csv=require('csv');

https://www.npmjs.com/package/exif-parser
exif-parser is a parser for image metadata in the exif format, the most popular metadata format for jpeg and tiff images
const exif = require('exif-parser');

https://www.npmjs.com/package/node-exiftool

!!!!!!!!!!!!
https://www.npmjs.com/package/simple-exiftool

*/

// const exif = require('exif-parser');
// const fs = require('fs');
//
//
// const buffer = fs.readFileSync('/home/pb/Pictures/20180811_162650.jpg');
// const parser = exif.create(buffer);
// const result = parser.parse();
//
// console.log(JSON.stringify(result, null, 2));

const Exif = require("simple-exiftool");
var nef = '/media/pb/DATA/DOKE_best_marked_original/CC0008_R_DOKE_20161123_006_0380_Cc_MCOS.NEF'; // CreateDate: '2016:11:23 08:29:17'
var cr2 = '/media/pb/DATA/DOKE_best_marked_original/CC0008_R_DOKE_20161123_006_1490_Cc_CWEI.CR2';
var nef1 = '/media/pb/DATA/DOKE_best_marked_original/CC0510_L_DOKE_20171113_175_6600_Cc_AGUE.NEF'; // DateTimeOriginal: '2017:11:13 10:20:53'
var jpg = '/media/pb/DATA/1956_Aerial_Photos_process_jpg/F_I_01_0003.jpg';
var tif = '/media/pb/DATA/1956_Aerial_Photos_original_tif/F_I_01_0003.tif'; // CreateDate: '2007:10:30 17:45:17Z'

Exif(jpg, (error, metadata) => {

    if (error) {
        // handle error
    }
    console.log(metadata);
});
