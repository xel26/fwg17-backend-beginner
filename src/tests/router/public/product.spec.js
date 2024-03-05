const { describe } = require("mocha");
const { expect } = require("chai");
const supertest = require("supertest")
const app = require('../../../..');

const request = supertest(app)


describe('/products endpoint testing', () => {
    let lastPage

    it("should return message List all products", async () => {
        const res = await request.get('/products?sortBy=createdAt&category=non coffee&isRecommended=true')
        lastPage = res.body.pageInfo.totalPage
        expect(res.body.message).to.be.eq('List all products')
    })


    it("should return message data products not found", async () => {
        const res = await request.get('/products?searchKey=tidak ada')
        expect(res.body.message).to.be.eq('data products not found')
    })


    it("should return nextPage null", async () => {
        const res = await request.get(`/products?sortBy=createdAt&category=non coffee&isRecommended=true&page=${lastPage}`)
        expect(res.body.pageInfo.nextPage).to.be.null
    })


    it("should return prevPage null", async () => {
        const res = await request.get('/products?page=1')
        expect(res.body.pageInfo.prevPage).to.be.null
    })


    it("should return message column p.tidak ada does not exist", async () => {
        const res = await request.get('/products?sortBy=tidak ada')
        expect(res.body.message).to.be.eq("column p.tidak ada does not exist")
    })
})



describe('/product/:id endpoint testing', () => {
    it('should should return message detail product', async () => {
        const res = await request.get('/product/1')
        expect(res.body.message).to.be.eq('detail product')
    })



    it('should should return message invalid input syntax for type integer: x', async () => {
        const res = await request.get('/product/x')
        expect(res.body.message).to.be.eq('invalid input syntax for type integer: x')
    })



    it('should should return message product with id 2026 not found', async () => {
        const res = await request.get('/product/2026')
        expect(res.body.message).to.be.eq('product with id 2026 not found')
    })
})



describe('/data-size endpoint testing', () => {
    it("should return message data size", async () => {
        const res = await request.get('/data-size?name=medium')
        expect(res.body.message).to.be.eq("data size")
    })



    it("should return message size small not found", async () => {
        const res = await request.get('/data-size?name=small')
        expect(res.body.message).to.be.eq("size small not found")
    })
})



describe('/data-variant endpoint testing', () => {
    it("should return message data variant", async () => {
        const res = await request.get('/data-variant?name=cold')
        expect(res.body.message).to.be.eq("data variant")
    })



    it("should return message size small not found", async () => {
        const res = await request.get('/data-variant?name=extra spicy')
        expect(res.body.message).to.be.eq("variant extra spicy not found")
    })
})