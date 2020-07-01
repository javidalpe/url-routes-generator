type UriParams = {
  [key: string]: string;
}

export declare const uri: (route: string, params?: UriParams) => (optionalParams?: UriParams) => string;
export declare const serializeObjectToQueryString: (obj?: UriParams) => string;
export declare const concatOptionalParams: (uri: string, params?: UriParams) => string;
