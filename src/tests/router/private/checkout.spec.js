const { describe } = require("mocha");
const { expect } = require("chai");
const supertest = require("supertest")
const app = require('../../../..');

const request = supertest(app)


describe('/checkout endpoint testing', () => {
    let userToken = ''
    before(async ()=>{
        const form = new URLSearchParams({
            email: 'shellaananda2636@gmail.com',
            password: '123'
        })
        const res = await request
        .post('/login')
        .send(form.toString())
        userToken = res.body.results.token
        
    })

    it('should return message create order successfully', async () => {
        const res = await request.post('/checkout')
        .auth(userToken, {
            type: "bearer"
        })
        .send('productId=1,2,4&sizeProduct=Regular,Large,Medium&variantProduct=cold,hot,cold&quantityProduct=1,2,2&deliveryShipping=Pick Up')

        expect(res.body.message).to.be.eq("create order successfully")
    })



    it('should return message data with productId 3 is not present in table products', async () => {
        const res = await request.post('/checkout')
        .auth(userToken, {
            type: "bearer"
        })
        .send('productId=3&sizeProduct=Regular&variantProduct=cold&quantityProduct=1&deliveryShipping=Dine In')

        expect(res.body.message).to.be.eq("data with productId 3 is not present in table products")
    })



    it('should return message size small not found', async () => {
        const res = await request.post('/checkout')
        .auth(userToken, {
            type: "bearer"
        })
        .send('productId=4&sizeProduct=small&variantProduct=cold&quantityProduct=1&deliveryShipping=Dine In')

        expect(res.body.message).to.be.eq("size small not found")
    })



    it('should return message variant extra spicy not found', async () => {
        const res = await request.post('/checkout')
        .auth(userToken, {
            type: "bearer"
        })
        .send('productId=4&sizeProduct=regular&variantProduct=extra spicy&quantityProduct=1&deliveryShipping=Dine In')

        expect(res.body.message).to.be.eq("variant extra spicy not found")
    })
})