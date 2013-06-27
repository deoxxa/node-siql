#!/usr/bin/env node

var SIQL = require("./index");

var queries = [
  {fields: {a: true, b: true, c: true}, condition: {type: "eq", left: "a", right: 5}, sort: [["time", -1]], limit: 100},
  {fields: {a: true, b: true, c: true}, condition: {type: "eq", left: "b", right: 5}, limit: 1000},
  {fields: {a: true, b: true, c: true}, condition: {type: "eq", left: "c", right: 5}, limit: 500},
];

var query = SIQL.mergeQueries(queries);

console.log(JSON.stringify(query, null, 2));
