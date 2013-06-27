var SIQL = require("../");

describe("merging", function() {
  it("should merge two conditions correctly", function() {
    var input = [
      {condition: {type: "eq", left: "a", right: 1}},
      {condition: {type: "eq", left: "b", right: 2}},
    ];

    var expected = {
      condition: {
        type: "and",
        data: [
          {type: "eq", left: "a", right: 1},
          {type: "eq", left: "b", right: 2},
        ]
      }
    };

    var result = SIQL.mergeQueries(input);

    if (JSON.stringify(result) !== JSON.stringify(expected)) {
      throw new Error("result was incorrect");
    }
  });

  it("should not have an empty condition", function() {
    var input = [
      {},
    ];

    var expected = {};

    var result = SIQL.mergeQueries(input);

    if (JSON.stringify(result) !== JSON.stringify(expected)) {
      throw new Error("result was incorrect");
    }
  });

  it("should merge two identical sets of fields correctly", function() {
    var input = [
      {fields: {a: true, b: true, c: true}},
      {fields: {a: true, b: true, c: true}},
    ];

    var expected = {fields: {a: true, b: true, c: true}};

    var result = SIQL.mergeQueries(input);

    if (JSON.stringify(result) !== JSON.stringify(expected)) {
      throw new Error("result was incorrect");
    }
  });

  it("should merge two overlapping sets of fields correctly", function() {
    var input = [
      {fields: {a: true, b: true, x: true}},
      {fields: {a: true, b: true, y: true}},
    ];

    var expected = {fields: {a: true, b: true, x: false, y: false}};

    var result = SIQL.mergeQueries(input);

    if (JSON.stringify(result) !== JSON.stringify(expected)) {
      throw new Error("result was incorrect");
    }
  });

  it("should merge two non-intersecting sets of fields correctly", function() {
    var input = [
      {fields: {a: true, b: true}},
      {fields: {x: true, y: true}},
    ];

    var expected = {fields: {a: false, b: false, x: false, y: false}};

    var result = SIQL.mergeQueries(input);

    if (JSON.stringify(result) !== JSON.stringify(expected)) {
      throw new Error("result was incorrect");
    }
  });

  it("should merge two limits to apply the smaller of the two when the smaller is first", function() {
    var input = [
      {limit: 20},
      {limit: 100},
    ];

    var expected = {limit: 20};

    var result = SIQL.mergeQueries(input);

    if (JSON.stringify(result) !== JSON.stringify(expected)) {
      throw new Error("result was incorrect");
    }
  });

  it("should merge two limits to apply the smaller of the two when the smaller is second", function() {
    var input = [
      {limit: 100},
      {limit: 20},
    ];

    var expected = {limit: 20};

    var result = SIQL.mergeQueries(input);

    if (JSON.stringify(result) !== JSON.stringify(expected)) {
      throw new Error("result was incorrect");
    }
  });

  it("should apply the sort clause of the first query", function() {
    var input = [
      {sort: [["a", 1]]},
      {},
    ];

    var expected = {sort: [["a", 1]]};

    var result = SIQL.mergeQueries(input);

    if (JSON.stringify(result) !== JSON.stringify(expected)) {
      throw new Error("result was incorrect");
    }
  });

  it("should apply the sort clause of the first query with one even if it is not first", function() {
    var input = [
      {},
      {sort: [["a", 1]]},
      {},
    ];

    var expected = {sort: [["a", 1]]};

    var result = SIQL.mergeQueries(input);

    if (JSON.stringify(result) !== JSON.stringify(expected)) {
      throw new Error("result was incorrect");
    }
  });

  it("should not overwrite the sort clause with that of a later query", function() {
    var input = [
      {sort: [["a", 1]]},
      {sort: [["b", 1]]},
    ];

    var expected = {sort: [["a", 1]]};

    var result = SIQL.mergeQueries(input);

    if (JSON.stringify(result) !== JSON.stringify(expected)) {
      throw new Error("result was incorrect");
    }
  });
});
