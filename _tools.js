/*
occurrences = {
  key_0:[[amnt,value_0][amnt,value_1]...[amnt,value_n]],
  key_1:[[amnt,value_0][amnt,value_1]...[amnt,value_n]],
  key_n:[[amnt,value_0][amnt,value_1]...[amnt,value_n]]
}
filter = {
  key_0:[value_0,value_1,value_n],
  key_1:[value_0,value_1,value_n],
  key_n:[value_0,value_1,value_n]
}
*/
function get_occurrences(array, filter = {}) {
  var occurrences = {};
  for (var i = 0; i < array.length; i++) {
    for (var key in array[i]) {
      var value = array[i][key];
      if (!(key in filter)) {
        filter[key] = [];
        occurrences[key] = [];
      } else {
        if (filter[key].indexOf(value) < 0) {
          filter[key].push(value);
          occurrences[key].push([0, value]);
        }
        occurrences[key][filter[key].indexOf(value)][0]++
      }
    }
  }
  return occurrences;
}

function print_audit (occ_number, array_audit, array_values,property) {
  var array_sorted = array_audit.sort(function(a, b){return b[0]-a[0]});
  for (var i = 0; i < occ_number; i++) {
    if (array_values != undefined) {
      value = (array_sorted[i][1]!=='')?array_values[array_sorted[i][1]][property]:'none';
    } else {
      value = array_sorted[i][1];
    }
    console.log(array_sorted[i][0]+' --> '+value);
  }
}

module.exports = {
  get_occurrences: get_occurrences,
  print_audit: print_audit
}
