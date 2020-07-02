const buildURL = require("./buildURL");

describe("buildURL", () => {
  it("should add ? character between url and params", () => {
    const params = { id: 3, age: 32, name: "Pablo" };
    expect(buildURL("/products", params)).toEqual(
      "/products?id=3&age=32&name=Pablo"
    );
  });

  it("should not add ? character with no params", () => {
    expect(buildURL("products")).toEqual("products");
  });

  it("should not add ? character with null params", () => {
    expect(buildURL("https://wwww.google.com/products", null)).toEqual("https://wwww.google.com/products");
  });

  it("should not add ? character with empty params", () => {
    expect(buildURL("/products", {})).toEqual("/products");
  });

  it("should throw exception with no object param", () => {
    expect(() => buildURL("/products", 23)).toThrow();
  });
});
