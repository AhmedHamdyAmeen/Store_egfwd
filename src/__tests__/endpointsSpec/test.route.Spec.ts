import supertest from "supertest";
import app from "../../server";

/**-----------------------**
 * Supertest is a package that help us to call http request on the server and test the Endpoints..
 *
 * Create a request Object:
 */
const request = supertest(app);

describe("Test the test_endpoint server", () => {
  it("Get / endpoint", async () => {
    const response = await request.get("/");

    expect(response.status).toBe(200);
  });
});
