const { describe } = require("mocha");
const { expect } = require("chai");
const supertest = require("supertest")
const app = require('../../../..');

const request = supertest(app)


describe('/testimonial endpoint testing', () => {
    it('should return message List all testimonial', async () => {
        const res = await request.get('/testimonial?order=tidak ada')
        expect(res.body.message).to.be.eq("List all testimonial")
    })



    it('should return message data testimonial not found', async () => {
        const res = await request.get('/testimonial?searchKey=tidak ada')
        expect(res.body.message).to.be.eq("data testimonial not found")
    })



    it('should return nextPage null', async () => {
        const res = await request.get('/testimonial?page=2')
        expect(res.body.pageInfo.nextPage).to.be.null
    })



    it('should return prevPage null', async () => {
        const res = await request.get('/testimonial?page=1')
        expect(res.body.pageInfo.prevPage).to.be.null
    })



    it('should return message column tidak ada does not exist', async () => {
        const res = await request.get('/testimonial?sortBy=tidak ada')
        expect(res.body.message).to.be.eq("column tidak ada does not exist")
    })
})