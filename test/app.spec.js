const app = require("../src/app");

describe("App", () => {
  it('GET /respods with 200 containing "Hello, world!"', () => {
    return supertest(app).get("/").expect(200, "I'm serving I'm a server");
  });
});
