"use strict";

const isAbsoluteURL = require("../helpers/isAbsoluteURL");
const combineURLs = require("../helpers/combineURLs");

module.exports = function buildFullPath (baseURL, requestedPath) {
  if (baseURL && !isAbsoluteURL(requestedPath)) {
    return combineURLs(baseURL, requestedPath);
  }
  return requestedPath;
};
