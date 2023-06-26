const request = require("supertest")
const app = require("../app")
require("../models")

const URL_ACTOR = '/api/v1/actors'
let actorId

test(`POST -> ${URL_ACTOR}, should return status code 201 and res.body.firstName = actor.firstName`, async () => {
    const actor = {
        firstName: "Brad",
        lastName: "Pitt",
        nationality: "USA",
        image: "https://randomuser.me/api/portraits/men/37.jpg",
        birthday: "1963-12-18"
    }

    const res = await request(app)
        .post(URL_ACTOR)
        .send(actor)

    actorId = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.firstName).toBe(actor.firstName)
})

test(`GET -> ${URL_ACTOR}, should return status code 200 and res.body.length === 1`, async () => {
    const res = await request(app)
        .get(URL_ACTOR)

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
})

test(`PUT -> ${URL_ACTOR}/:id, should return 200 and res.body.birthday === actor.birthday`, async () => {
    const actor = {
        birthday: "1963-12-18"
    }

    const res = await request(app)
        .put(`${URL_ACTOR}/${actorId}`)
        .send(actor)

    expect(res.status).toBe(200)
    expect(res.body.birthday).toBe(actor.birthday)
})

test(`DELETE -> ${URL_ACTOR}/:id, should return status code 204`, async () => {
    const res = await request(app)
        .delete(`${URL_ACTOR}/${actorId}`)

    expect(res.status).toBe(204)
})