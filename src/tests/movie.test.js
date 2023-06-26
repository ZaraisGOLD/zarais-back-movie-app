const request = require("supertest")
const app = require("../app")
const Genre = require("../models/Genre")
const Actor = require("../models/Actor")
const Director = require("../models/Director")
require("../models")

const URL_MOVIE = '/api/v1/movies'
let movieId

test(`POST -> ${URL_MOVIE}, should return status code 201 and res.body.name = movie.name`, async () => {
    const movie = {
        name: "La Bella y la Bestia",
        image: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.mubis.es%2Fmedia%2Fmovies%2F5171%2F169915%2Fla-bella-y-la-bestia-original.jpg&tbnid=T0hl8htwtN-EFM&vet=12ahUKEwihodywtN__AhVpcjABHfZeDoEQMygIegUIARDgAQ..i&imgrefurl=https%3A%2F%2Fwww.mubis.es%2Fnoticias%2Fnuevo-poster-del-musical-la-bella-y-la-bestia-para-espana&docid=HJ19bTC5kyLDaM&w=770&h=1100&q=la%20bella%20y%20la%20bestia%20poster&ved=2ahUKEwihodywtN__AhVpcjABHfZeDoEQMygIegUIARDgAQ",
        synopsis: "Belle, una joven hermosa y brillante, asume el lugar de su padre como prisionero en el castillo de una bestia. Poco a poco, la valiente Belle irá dándose cuenta de que el príncipe bestia no es el malvado ser que todos creen que es y tiene, en realidad, un gran corazón.",
        releaseYear: 2000
    }

    const res = await request(app)
        .post(URL_MOVIE)
        .send(movie)

    movieId = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.name).toBe(movie.name)
})

test(`GET -> ${URL_MOVIE}, should return status code 200 and res.body.length === 1`, async () => {
    const res = await request(app)
        .get(URL_MOVIE)

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
    expect(res.body[0].genres).toBeDefined()
    expect(res.body[0].actors).toBeDefined()
    expect(res.body[0].directors).toBeDefined()
})

test(`PUT -> ${URL_MOVIE}/:id, should return 200 and res.body.releaseYear === movie.releaseYear`, async () => {
    const movie = {
        releaseYear: 2000
    }

    const res = await request(app)
        .put(`${URL_MOVIE}/${movieId}`)
        .send(movie)

    expect(res.status).toBe(200)
    expect(res.body.releaseYear).toBe(movie.releaseYear)
})

test(`POST -> ${URL_MOVIE}, should return status code 200 and res.body.length === 1`, async () => {
    const genreBody = {
        name: "pop"
    }

    const genre = await Genre.create(genreBody)
    const res = await request(app)
        .post(`${URL_MOVIE}/${movieId}/genres`)
        .send([genre.id])

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)

    await genre.destroy()
})

test(`POST -> ${URL_MOVIE}, should return status code 200 and res.body.length === 1`, async () => {
    const directorBody = {
        firstName: "Brad",
        lastName: "Pitt",
        nationality: "USA",
        image: "https://randomuser.me/api/portraits/men/37.jpg",
        birthday: "1963-12-18"
    }

    const director = await Director.create(directorBody)
    const res = await request(app)
        .post(`${URL_MOVIE}/${movieId}/directors`)
        .send([director.id])

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)

    await director.destroy()
})

test(`POST -> ${URL_MOVIE}, should return status code 200 and res.body.length === 1`, async () => {
    const actorBody = {
        firstName: "Brad",
        lastName: "Pitt",
        nationality: "USA",
        image: "https://randomuser.me/api/portraits/men/37.jpg",
        birthday: "1963-12-18"
    }

    const actor = await Actor.create(actorBody)
    const res = await request(app)
        .post(`${URL_MOVIE}/${movieId}/actors`)
        .send([actor.id])

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)

    await actor.destroy()
})

test(`DELETE -> ${URL_MOVIE}/:id, should return status code 204`, async () => {
    const res = await request(app)
        .delete(`${URL_MOVIE}/${movieId}`)

    expect(res.status).toBe(204)
})

