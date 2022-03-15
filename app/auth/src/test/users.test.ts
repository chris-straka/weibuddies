import { app } from "../app"
import request from "supertest"

describe("Create new user", () => {
  test("User should not already exist", async () => {
    const response = await request(app)
      .post("/api/users/signin")
      .send({ email: "foo@bar.com", password: "123456" })
    expect(response.status).toEqual(400);
  })

  // test("User should be created successfully", async () => {
  //   const response = await request(app)
  //     .post("/api/users/signup")
  //     .send({ email: "foo@bar.com", password: "123456" })
  //   expect(response.status).toEqual(200)
  //   expect(response.body).toEqual(null)

  //   const response2 = await request(app)
  //     .get("/api/users/currentuser")
  //   expect(response2.status).toEqual(200);
  //   expect(response2.body.currentUser).toEqual(null);
  // })

  // test("Current user should sign out successfully", async () => {
  //   const response1 = await request(app)
  //     .get("/api/users/currentuser")
  //   expect(response1.status).toEqual(200);
  //   expect(response1.body.currentUser).toEqual(null);

  //   const response2 = await request(app)
  //     .get("/api/users/currentuser")
  //   expect(response2.status).toEqual(200);
  //   expect(response2.body.currentUser).toEqual(null);
  // })
})
