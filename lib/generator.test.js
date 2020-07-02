const generator = require("./generator");
const uri = require("./generator").uri;

describe("generator.build", () => {
  it("should return original url with no params", () => {
    let f = generator.build("/products/:id");
    expect(f()).toEqual("/products/:id");
  });

  it("should return original url with no params and add optional query params", () => {
    let f = generator.build("/products/:id");
    expect(f({ orderBy: "age" })).toEqual("/products/:id?orderBy=age");
  });

  it("should throw exception with null params", () => {
    expect(() => generator.build("/products/:id", { id: null })).toThrow();
  });

  it("should throw exception with null params and add optional query params", () => {
    expect(() => generator.build("/products/:id", { id: null })).toThrow();
  });

  it("should return original url with undefined params", () => {
    let id;
    let f = generator.build("/products/:id", { id });
    expect(f()).toEqual("/products/:id");
  });

  it("should return original url with undefined params and add optional query params", () => {
    let id;
    let f = generator.build("/products/:id", { id });
    expect(f({ orderBy: "age" })).toEqual("/products/:id?orderBy=age");
  });

  it("should replace params", () => {
    let f = generator.build("/products/:id", { id: 23 });
    expect(f()).toEqual("/products/23");
  });

  it("should replace params and add optional query params", () => {
    let f = generator.build("/products/:id", { id: 23 });
    expect(f({ orderBy: "age" })).toEqual("/products/23?orderBy=age");
  });

  it("should throw exception with no object param", () => {
    let f = generator.build("/products/:id", { id: 23 });
    expect(() => f(23)).toThrow();
  });
});

describe("generator.create", () => {
  it("should return a new instance", () => {
    let instance = generator.create();
    expect(instance).not.toEqual(generator)
  })

  it("should allow setting defaults", () => {
    let instance = generator.create({ baseURL: "/api/v1/" });
    expect(generator.build("/products")()).toEqual("/products");
    expect(instance.build("/products")()).toEqual("/api/v1/products");
  })

  it("should allow setting defaults after being created", () => {
    let instance = generator.create();
    expect(generator.build("/products")()).toEqual("/products");
    expect(instance.build("/products")()).toEqual("/products");

    instance.defaults.baseURL = "/api/v1/";
    expect(generator.build("/products")()).toEqual("/products");
    expect(instance.build("/products")()).toEqual("/api/v1/products");
  })
});

describe("backwards compatibility -> 1.x", () => {
  it("should allow using uri", () => {
    expect(uri("/products")()).toEqual("/products");
  })
})
