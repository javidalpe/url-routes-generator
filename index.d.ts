type UriParams = {
  [key: string]: string;
}

export interface GeneratorConfig {
  baseURL?: string;
}

export interface GeneratorInstance {
  defaults: GeneratorConfig;
  build: (route: string, params?: UriParams) => (optionalParams?: UriParams) => string;
}

export interface GeneratorStatic extends GeneratorInstance {
  create(config?: GeneratorConfig): GeneratorInstance;
}

declare const Generator: GeneratorStatic;

export default Generator;

/* Backwards compatibility */
// v1.x
export declare const uri: GeneratorInstance["build"];
