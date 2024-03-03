const { describe } = require("mocha");
const { expect } = require("chai");
const supertest = require("supertest")
const app = require('../../../..');

const request = supertest(app)


describe('/checkout endpoint testing', () => {
    it('should return message create order successfully', async () => {
        const res = await request.post('/checkout')
        .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDY2LCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE3MDk0ODc0Mzh9.cIrjSNB_1m6GF9fwWeDILgOjNwAb669beZtJXid79xU', {
            type: "bearer"
        })
        .send('productId=1,2,4&sizeProduct=Regular,Large,Medium&variantProduct=cold,hot,cold&quantityProduct=1,2,2&deliveryShipping=Pick Up')

        expect(res.body.message).to.be.eq("create order successfully")
    })



    it('should return message data with productId 3 is not present in table products', async () => {
        const res = await request.post('/checkout')
        .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDY2LCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE3MDk0ODc0Mzh9.cIrjSNB_1m6GF9fwWeDILgOjNwAb669beZtJXid79xU', {
            type: "bearer"
        })
        .send('productId=3&sizeProduct=Regular&variantProduct=cold&quantityProduct=1&deliveryShipping=Dine In')

        expect(res.body.message).to.be.eq("data with productId 3 is not present in table products")
    })



    it('should return message size small not found', async () => {
        const res = await request.post('/checkout')
        .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDY2LCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE3MDk0ODc0Mzh9.cIrjSNB_1m6GF9fwWeDILgOjNwAb669beZtJXid79xU', {
            type: "bearer"
        })
        .send('productId=4&sizeProduct=small&variantProduct=cold&quantityProduct=1&deliveryShipping=Dine In')

        expect(res.body.message).to.be.eq("size small not found")
    })



    it('should return message variant extra spicy not found', async () => {
        const res = await request.post('/checkout')
        .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDY2LCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE3MDk0ODc0Mzh9.cIrjSNB_1m6GF9fwWeDILgOjNwAb669beZtJXid79xU', {
            type: "bearer"
        })
        .send('productId=4&sizeProduct=regular&variantProduct=extra spicy&quantityProduct=1&deliveryShipping=Dine In')

        expect(res.body.message).to.be.eq("variant extra spicy not found")
    })
})