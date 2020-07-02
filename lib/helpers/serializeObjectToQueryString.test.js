const serializeObjectToQueryString = require("./serializeObjectToQueryString");

describe("serializeObjectToQueryString", () => {
  it("should concatenate various params", () => {
    expect(serializeObjectToQueryString({ id: 3, age: 32, name: "Pablo" })).toEqual(
      "id=3&age=32&name=Pablo"
    );
  });

  it("should encode params", () => {
    expect(serializeObjectToQueryString({ id: "Pablo Alboren" })).toEqual("id=Pablo%20Alboren");
  });

  it("should show only one param", () => {
    expect(serializeObjectToQueryString({ id: 1023 })).toEqual("id=1023");
  });
});
