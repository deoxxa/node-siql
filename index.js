var SIQL = module.exports = {};

SIQL.mergeQueries = function mergeQueries(queries) {
  var result = {
    condition: {
      type: "and",
      data: [],
    },
  };

  for (var i=0;i<queries.length;++i) {
    if (typeof queries[i] !== "object") {
      return;
    }

    if (typeof queries[i].fields === "object" && queries[i].fields !== null && Object.keys(queries[i].fields).length !== 0) {
      if (typeof result.fields === "undefined") {
        result.fields = {};

        for (var k in queries[i].fields) {
          result.fields[k] = !!queries[i].fields[k];
        }
      }

      var fields = Object.keys(result.fields).concat(Object.keys(queries[i].fields)).sort();

      for (var j=0;j<fields.length;++j) {
        result.fields[fields[j]] = (!!result.fields[fields[j]] && !!queries[i].fields[fields[j]]);
      }
    }

    if (typeof queries[i].condition === "object" && queries[i].condition !== null) {
      result.condition.data.push(queries[i].condition);
    }

    if (Array.isArray(queries[i].sort) && !result.sort) {
      result.sort = queries[i].sort;
    }

    if (typeof queries[i].limit === "number" && (typeof result.limit === "undefined" || result.limit > queries[i].limit)) {
      result.limit = Math.floor(queries[i].limit);
    }

    if (!!queries[i].tail) {
      result.tail = true;
    }
  }

  if (result.condition.data.length === 0) {
    delete result.condition;
  }

  return result;
};
