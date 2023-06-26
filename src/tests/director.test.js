const request = require("supertest")
const app = require("../app")
require("../models")

const URL_DIRECTOR = '/api/v1/directors'
let directorId

test(`POST -> ${URL_DIRECTOR}, should return status code 201 and res.body.firstName = director.firstName`, async () => {
    const director = {
        firstName: "Brad",
        lastName: "Pitt",
        nationality: "USA",
        image: "https://randomuser.me/api/portraits/men/37.jpg",
        birthday: "1963-12-18"
    }

    const res = await request(app)
        .post(URL_DIRECTOR)
        .send(director)

    directorId = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.firstName).toBe(director.firstName)
})

test(`GET -> ${URL_DIRECTOR}, should return status code 200 and res.body.length === 1`, async () => {
    const res = await request(app)
        .get(URL_DIRECTOR)

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
})

test(`PUT -> ${URL_DIRECTOR}/:id, should return 200 and res.body.birthday === director.birthday`, async () => {
    const director = {
        birthday: "1963-12-18"
    }

    const res = await request(app)
        .put(`${URL_DIRECTOR}/${directorId}`)
        .send(director)

    expect(res.status).toBe(200)
    expect(res.body.birthday).toBe(director.birthday)
})

test(`DELETE -> ${URL_DIRECTOR}/:id, should return status code 204`, async () => {
    const res = await request(app)
        .delete(`${URL_DIRECTOR}/${directorId}`)

    expect(res.status).toBe(204)
})