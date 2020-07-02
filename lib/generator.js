"use strict";

const pathToRegexp = require("path-to-regexp");
const buildFullPath = require("./core/buildFullPath");
const buildURL = require("./core/buildURL");
const RouteException = require("./core/exceptions").RouteException;

class Generator {
  constructor( config = {}) {
    this.defaults = config;

    this.build = this.build.bind(this);
  }

  build( route, params = {}) {
    let path;

    if (typeof params !== "object") {
      throw new RouteException(
        `Error on route ${route}. Route params should be an object, ${typeof params} given.`
      );
    }

    if (Object.keys(params).length === 0 || Object.values(params).every(o => o === undefined)) {
      path = route;
    } else
      try {
        path = pathToRegexp.compile(route)(params);
      } catch (e) {
        throw new RouteException(`Error on route ${route}. ${e.message}`);
      }

    const compiledUrl = buildFullPath(this.defaults.baseURL, path);
    return optionalParams => buildURL(compiledUrl, optionalParams);
  };
}

const generator = new Generator();

// Factory for new instances
generator.create = function create(config = {}) {
  return new Generator(Object.assign({}, generator.defaults, config));
}

// Expose class
generator.Generator = Generator;

// Backwards compatibility with 1.x
generator.uri = generator.build;

module.exports = generator;
module.exports.default = generator;
