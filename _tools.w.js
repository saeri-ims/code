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
  var with_filter = (filter.length > 0) ? 1 : 0;
  if (with_filter) {
    for (var i = 0; i < array.length; i++) {
      for (var key in array[i]) {
        if (key in filter) {
          var value = array[i][key];
          occurrences[key] = [];
          if (filter[key].indexOf(value) >= 0) {

          }
        }
      }
    }
  } else {
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
  }
  return occurrences;
}

module.exports = {
  get_occurrences: get_occurrences
}
