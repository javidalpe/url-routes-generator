"use strict";

const serializeObjectToQueryString = require("../helpers/serializeObjectToQueryString");
const RouteException = require("./exceptions").RouteException;

module.exports = function  buildURL (uri, params = {}) {
  if (typeof params !== "object")
    throw new RouteException(
      `Error on route ${uri}. Optional route params should be an object, ${typeof params} given.`
    );

  if (!params || Object.keys(params).length <= 0) {
    return uri;
  }

  return uri + "?" + serializeObjectToQueryString(params);
};
