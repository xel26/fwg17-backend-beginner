const { describe } = require("mocha");
const { expect } = require("chai");
const supertest = require("supertest")
const app = require('../../../..');

const request = supertest(app)

describe('/admin/product endpoint testing', () => {
    describe('list all products', () => {
        it('should return message List all products', async () => {
            const res = await request.get('/admin/products?sortBy=createdAt&category=coffee&isRecommended=true')
            .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjA4LCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDk0OTE3NDd9.hDmlAi3680_1dGYY_ICa-ZDoBSQAriILryG_HFJW9iE', {
                type: "bearer"
            })
    
            expect(res.body.message).to.be.eq("List all products")
        })



        it('should return message Forbidden access', async () => {
            const res = await request.get('/admin/products?sortBy=createdAt&category=coffee&isRecommended=true')
            .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDY2LCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE3MDk0OTIwNzZ9.1CyamCVHFOvcW9CYJDaEElooerh__OlIUL0GX3AhIsQ', {
                type: "bearer"
            })
    
            expect(res.body.message).to.be.eq("Forbidden access")
    
        })



        it('should return message Unauthorized', async () => {
            const res = await request.get('/admin/products?sortBy=createdAt&category=coffee&isRecommended=true')
            expect(res.body.message).to.be.eq("Unauthorized")
    
        })



        it('should return message data products not found', async () => {
            const res = await request.get('/admin/products?searchKey=tidak ada')
            .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjA4LCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDk0OTE3NDd9.hDmlAi3680_1dGYY_ICa-ZDoBSQAriILryG_HFJW9iE', {
                type: "bearer"
            })
    
            expect(res.body.message).to.be.eq("data products not found")
        })



        it('should return message nextPage null', async () => {
            const res = await request.get('/admin/products?page=5')
            .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjA4LCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDk0OTE3NDd9.hDmlAi3680_1dGYY_ICa-ZDoBSQAriILryG_HFJW9iE', {
                type: "bearer"
            })
    
            expect(res.body.pageInfo.nextPage).to.be.null
        })



        it('should return message prevPage null', async () => {
            const res = await request.get('/admin/products?page=1')
            .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjA4LCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDk0OTE3NDd9.hDmlAi3680_1dGYY_ICa-ZDoBSQAriILryG_HFJW9iE', {
                type: "bearer"
            })
    
            expect(res.body.pageInfo.prevPage).to.be.null
        })



        it('should return message column p.tidak ada does not exist', async () => {
            const res = await request.get('/admin/products?sortBy=tidak ada')
            .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjA4LCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDk0OTE3NDd9.hDmlAi3680_1dGYY_ICa-ZDoBSQAriILryG_HFJW9iE', {
                type: "bearer"
            })
    
            expect(res.body.message).to.be.eq('column p.tidak ada does not exist')
        })
    })



    describe('detail product', () => {
        it('should return message detail product', async () => {
            const res = await request.get('/admin/products/1')
            .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjA4LCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDk0OTE3NDd9.hDmlAi3680_1dGYY_ICa-ZDoBSQAriILryG_HFJW9iE', {
                type: "bearer"
            })

            expect(res.body.message).to.be.eq("detail product")
        })



        it('should return message invalid input syntax for type integer: x', async () => {
            const res = await request.get('/admin/products/x')
            .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjA4LCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDk0OTE3NDd9.hDmlAi3680_1dGYY_ICa-ZDoBSQAriILryG_HFJW9iE', {
                type: "bearer"
            })

            expect(res.body.message).to.be.eq("invalid input syntax for type integer: x")
        })



        it('should return message product with id 2026 not found', async () => {
            const res = await request.get('/admin/products/2026')
            .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjA4LCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDk0OTE3NDd9.hDmlAi3680_1dGYY_ICa-ZDoBSQAriILryG_HFJW9iE', {
                type: "bearer"
            })

            expect(res.body.message).to.be.eq("product with id 2026 not found")
        })
    })



    describe('create product', () => {
        it('should return message create product successfully', async () => {
            const res = await request.post('/admin/products')
            .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjA4LCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDk0OTE3NDd9.hDmlAi3680_1dGYY_ICa-ZDoBSQAriILryG_HFJW9iE', {
                type: "bearer"
            })
            .send(`name=${new Date().getTime()}&basePrice=1000`)

            expect(res.body.message).to.be.eq("create product successfully")
        })



        it('should return message name vanilla syrup already exist', async () => {
            const res = await request.post('/admin/products')
            .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjA4LCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDk0OTE3NDd9.hDmlAi3680_1dGYY_ICa-ZDoBSQAriILryG_HFJW9iE', {
                type: "bearer"
            })
            .send(`name=vanilla syrup&basePrice=1000`)

            expect(res.body.message).to.be.eq("name vanilla syrup already exist")
        })



        it('should return message name cannot be empty', async () => {
            const res = await request.post('/admin/products')
            .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjA4LCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDk0OTE3NDd9.hDmlAi3680_1dGYY_ICa-ZDoBSQAriILryG_HFJW9iE', {
                type: "bearer"
            })
            .send()

            expect(res.body.message).to.be.eq("name cannot be empty")
        })
    })



    describe('update product', () => {
        it('should return message update product successfully', async () => {
            const res = await request.patch('/admin/products/55')
            .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjA4LCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDk0OTE3NDd9.hDmlAi3680_1dGYY_ICa-ZDoBSQAriILryG_HFJW9iE', {
                type: "bearer"
            })
            .send('basePrice=7000')

            expect(res.body.message).to.be.eq("update product successfully")
        })



        it('should return message invalid input syntax for type integer: x', async () => {
            const res = await request.patch('/admin/products/55')
            .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjA4LCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDk0OTE3NDd9.hDmlAi3680_1dGYY_ICa-ZDoBSQAriILryG_HFJW9iE', {
                type: "bearer"
            })
            .send('basePrice=x')

            expect(res.body.message).to.be.eq("invalid input syntax for type integer: x")
        })



        it('should return message column tidakAda of relation products does not exist', async () => {
            const res = await request.patch('/admin/products/55')
            .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjA4LCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDk0OTE3NDd9.hDmlAi3680_1dGYY_ICa-ZDoBSQAriILryG_HFJW9iE', {
                type: "bearer"
            })
            .send('tidakAda=update')

            expect(res.body.message).to.be.eq("column tidakAda of relation products does not exist")
        })



        it('should return message name vanilla syrup already exist', async () => {
            const res = await request.patch('/admin/products/55')
            .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjA4LCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDk0OTE3NDd9.hDmlAi3680_1dGYY_ICa-ZDoBSQAriILryG_HFJW9iE', {
                type: "bearer"
            })
            .send('name=vanilla syrup')

            expect(res.body.message).to.be.eq("name vanilla syrup already exist")
        })



        it('should return message product with id 2026 not found', async () => {
            const res = await request.patch('/admin/products/2026')
            .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjA4LCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDk0OTE3NDd9.hDmlAi3680_1dGYY_ICa-ZDoBSQAriILryG_HFJW9iE', {
                type: "bearer"
            })
            .send('basePrice=7000')

            expect(res.body.message).to.be.eq("product with id 2026 not found")
        })
    })



    describe('delete product', () => {
        it('should return message delete product successfully', async () => {
            const res = await request.delete('/admin/products/189')
            .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjA4LCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDk0OTE3NDd9.hDmlAi3680_1dGYY_ICa-ZDoBSQAriILryG_HFJW9iE', {
                type: "bearer"
            })

            expect(res.body.message).to.be.eq("delete product successfully")
        })



        it('should return message invalid input syntax for type integer: x', async () => {
            const res = await request.delete('/admin/products/x')
            .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjA4LCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDk0OTE3NDd9.hDmlAi3680_1dGYY_ICa-ZDoBSQAriILryG_HFJW9iE', {
                type: "bearer"
            })

            expect(res.body.message).to.be.eq("invalid input syntax for type integer: x")
        })



        it('should return message data with id 1 is still referenced from table orderDetails', async () => {
            const res = await request.delete('/admin/products/1')
            .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjA4LCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDk0OTE3NDd9.hDmlAi3680_1dGYY_ICa-ZDoBSQAriILryG_HFJW9iE', {
                type: "bearer"
            })

            expect(res.body.message).to.be.eq("data with id 1 is still referenced from table orderDetails")
        })



        it('should return message product with id 2026 not found', async () => {
            const res = await request.delete('/admin/products/2026')
            .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjA4LCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDk0OTE3NDd9.hDmlAi3680_1dGYY_ICa-ZDoBSQAriILryG_HFJW9iE', {
                type: "bearer"
            })

            expect(res.body.message).to.be.eq("product with id 2026 not found")
        })
    })
})