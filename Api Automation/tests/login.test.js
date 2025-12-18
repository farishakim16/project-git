const fetch = require("node-fetch");
const { expect } = require("chai");
const Ajv = require("ajv");

const ajv = new Ajv();
let token;

describe("API Automation Test", function () {

  let token;

  //positive case login
  before(async function () {
    const response = await fetch(
      "https://belajar-bareng.onrender.com/api/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "admin",
          password: "admin"
        })
      }
    );

    const body = await response.json();

    expect(response.status).to.equal(200);
    expect(body).to.have.property("token");
    // console.log("Login Response:", body);

    token = body.token;
  });

  //negative case login
  it("Positive Case - valid credential", async function () {
    expect(token).to.be.a("string");
  });


  it("Negative Case - invalid credential (sesitive case)", async function () {
    const response = await fetch(
      "https://belajar-bareng.onrender.com/api/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "ADMIN",
          password: "admin"
        })
      }
    );

    const body = await response.json();

    expect(response.status).to.equal(401);
    expect(body).to.have.property("message");
  });


  //positive case get users list
  it("Positive Case - get users list", async function () {

    const response = await fetch(
      "https://belajar-bareng.onrender.com/api/users",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }
    );

    const body = await response.json();
    // console.log("Get Users Response:", body);

    expect(response.status).to.equal(200);
    expect(body).to.have.property("users");
    expect(body.users).to.be.an("array");
  });
});
