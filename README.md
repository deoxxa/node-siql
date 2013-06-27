SIQL
====

Siphon.IO Query Language (pronounced like "cycle")

Overview
--------

This module allows for programmatic transformation and usage of SIQL queries.
SIQL is a query language based on JSON used to interact with various
[siphon.io](http://www.siphon.io/) services.

Installation
------------

Available via [npm](http://npmjs.org/):

> $ npm install siql

Or via git:

> $ git clone git://github.com/deoxxa/node-siql.git node_modules/siql

API
---

**mergeQueries**

Merges a list of queries into one, retaining the semantics of any restrictions
in place on earlier queries in the list.

```javascript
siql.mergeQueries(queries);
```

```javascript
var merged = siql.mergeQueries([query1, query2]);
```

Arguments

* _queries_ - an array of query objects.

Example
-------

Also see [example.js](https://github.com/deoxxa/node-siql/blob/master/example.js).

```javascript
var siql = require("siql");

var queries = [
  {fields: {a: true, b: true, c: true}, condition: {type: "eq", left: "a", right: 5}, sort: [["time", -1]], limit: 100},
  {fields: {a: true, b: true, c: true}, condition: {type: "eq", left: "b", right: 5}, limit: 1000},
  {fields: {a: true, b: true, c: true}, condition: {type: "eq", left: "c", right: 5}, limit: 500},
];

var query = siql.mergeQueries(queries);

console.log(JSON.stringify(query, null, 2));
```

Output:

```json
{
  "condition": {
    "type": "and",
    "data": [
      {
        "type": "eq",
        "left": "a",
        "right": 5
      },
      {
        "type": "eq",
        "left": "b",
        "right": 5
      },
      {
        "type": "eq",
        "left": "c",
        "right": 5
      }
    ]
  },
  "fields": {
    "a": true,
    "b": true,
    "c": true
  },
  "sort": [
    [
      "time",
      -1
    ]
  ],
  "limit": 100
}
```

License
-------

3-clause BSD. A copy is included with the source.

Contact
-------

* GitHub ([deoxxa](http://github.com/deoxxa))
* Twitter ([@deoxxa](http://twitter.com/deoxxa))
* ADN ([@deoxxa](https://alpha.app.net/deoxxa))
* Email ([deoxxa@fknsrs.biz](mailto:deoxxa@fknsrs.biz))
