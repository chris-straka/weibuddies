import { app } from "../app"
import request from "supertest"
import { randomBytes } from "crypto"

const randomEmail = `${randomBytes(8).toString('hex')}@bar.com`

describe("Create new user", () => {
  test("User should not already exist", async () => {
    const response = await request(app)
      .post("/api/users/signin")
      .send({ email: randomEmail, password: "123456" })
    expect(response.status).toEqual(400);
  })

  test("User should be created successfully", async () => {
    const response = await request(app)
      .post("/api/users/signup")
      .send({ email: randomEmail, password: "123456" })
    expect(response.status).toEqual(201)
    expect(response.headers).toHaveProperty("set-cookie")
  })
})
