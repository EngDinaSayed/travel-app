/*
Reference: 
https://www.npmjs.com/package/supertest
*/

const req = require("supertest");
const app = require("../src/server/index.js");

describe("Test the HTTP", () => {
	test("GET method should be the response", async () => {
		const res = await req(app).get("/");
		expect(res.statusCode).toBe(200);
	});
});

