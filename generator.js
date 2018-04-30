const pathToRegexp = require("path-to-regexp");

export const uri = (route, params = {}) => {
  if (typeof params !== "object") {
    throw new RouteException(
      `Error on route ${route}. Route params should be an object, ${typeof params} given.`
    );
  }

  if (Object.keys(params).length === 0 || Object.values(params).every(o => o === undefined)) {
    return optionalParams => concatOptionalParams(route, optionalParams);
  }

  const toPath = pathToRegexp.compile(route);

  try {
    const compiledUrl = toPath(params);
    return optionalParams => concatOptionalParams(compiledUrl, optionalParams);
  } catch (e) {
    throw new RouteException(`Error on route ${route}. ${e.message}`);
  }
};

export const serializeObjectToQueryString = (obj = {}) => {
  let str = [];
  for (const p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
};

export const concatOptionalParams = (uri, params = {}) => {
  if (typeof params !== "object")
    throw new RouteException(
      `Error on route ${uri}. Optional route params should be an object, ${typeof params} given.`
    );

  if (!params || Object.keys(params).length <= 0) {
    return uri;
  }

  return uri + "?" + serializeObjectToQueryString(params);
};

class RouteException {
  constructor(message) {
    this.name = "Route exception.";
    this.message = message;
  }
}
