const request = require("supertest")
const app = require("../app")
require("../models")

const URL_GENRE = '/api/v1/genres'
let genreId

test(`POST -> ${URL_GENRE}, should return status code 201 and res.body.name = genre.name`, async () => {
    const genre = {
        name: "pop"
    }

    const res = await request(app)
        .post(URL_GENRE)
        .send(genre)

    genreId = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.name).toBe(genre.name)
})

test(`GET -> ${URL_GENRE}, should return status code 200 and res.body.length === 1`, async () => {
    const res = await request(app)
        .get(URL_GENRE)

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
})

test(`PUT -> ${URL_GENRE}/:id, should return 200 and res.body.name === genre.name`, async () => {
    const genre = {
        name: "pop"
    }

    const res = await request(app)
        .put(`${URL_GENRE}/${genreId}`)
        .send(genre)

    expect(res.status).toBe(200)
    expect(res.body.name).toBe(genre.name)
})

test(`DELETE -> ${URL_GENRE}/:id, should return status code 204`, async () => {
    const res = await request(app)
        .delete(`${URL_GENRE}/${genreId}`)

    expect(res.status).toBe(204)
})