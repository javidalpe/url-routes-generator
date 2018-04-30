import { concatOptionalParams, serializeObjectToQueryString, uri } from "./generator";

describe("serializeObjectToQueryString", () => {
  test("concatenate various params", () => {
    expect(serializeObjectToQueryString({ id: 3, age: 32, name: "Pablo" })).toEqual(
      "id=3&age=32&name=Pablo"
    );
  });

  test("encode params", () => {
    expect(serializeObjectToQueryString({ id: "Pablo Alboren" })).toEqual("id=Pablo%20Alboren");
  });

  test("show only one param", () => {
    expect(serializeObjectToQueryString({ id: 1023 })).toEqual("id=1023");
  });
});

describe("concatOptionalParams", () => {
  test("concatOptionalParams add ? character between url and params", () => {
    const params = { id: 3, age: 32, name: "Pablo" };
    expect(concatOptionalParams("/products", params)).toEqual(
      "/products?" + serializeObjectToQueryString(params)
    );
  });

  test("concatOptionalParams dont add ? character with no params", () => {
    expect(concatOptionalParams("/products")).toEqual("/products");
  });

  test("concatOptionalParams dont add ? character with null params", () => {
    expect(concatOptionalParams("/products", null)).toEqual("/products");
  });

  test("concatOptionalParams dont add ? character with mepty params", () => {
    expect(concatOptionalParams("/products", {})).toEqual("/products");
  });

  test("throw exception with no object param", () => {
    expect(() => concatOptionalParams("/products", 23)).toThrow();
  });
});

describe("uri", () => {
  test("uri return original url with no params", () => {
    let f = uri("/products/:id");
    expect(f()).toEqual("/products/:id");
  });

  test("uri return original url with no params and add optional query params", () => {
    let f = uri("/products/:id");
    expect(f({ orderBy: "age" })).toEqual("/products/:id?orderBy=age");
  });

  test("uri throw exception with null params", () => {
    expect(() => uri("/products/:id", { id: null })).toThrow();
  });

  test("uri throw exception with null params and add optional query params", () => {
    expect(() => uri("/products/:id", { id: null })).toThrow();
  });

  test("uri return original url with undefined params", () => {
    let id;
    let f = uri("/products/:id", { id });
    expect(f()).toEqual("/products/:id");
  });

  test("uri return original url with undefined params and add optional query params", () => {
    let id;
    let f = uri("/products/:id", { id });
    expect(f({ orderBy: "age" })).toEqual("/products/:id?orderBy=age");
  });

  test("uri replace params", () => {
    let f = uri("/products/:id", { id: 23 });
    expect(f()).toEqual("/products/23");
  });

  test("uri replace params and add optional query params", () => {
    let f = uri("/products/:id", { id: 23 });
    expect(f({ orderBy: "age" })).toEqual("/products/23?orderBy=age");
  });

  test("throw exception with no object param", () => {
    let f = uri("/products/:id", { id: 23 });
    expect(() => f(23)).toThrow();
  });
});
