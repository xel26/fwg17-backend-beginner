const { describe, before } = require("mocha");
const { expect } = require("chai");
const supertest = require("supertest")
const app = require('../../../..');

const request = supertest(app)

describe('/admin/product endpoint testing', () => {
    let productId = ''
    let adminToken = ''
    let userToken = ''

    before(async ()=>{
        const form = new URLSearchParams({
            email: 'admin@example.com',
            password: '1'
        })
        const res1 = await request
        .post('/login')
        .send(form.toString())
        adminToken = res1.body.results.token

        const form2 = new URLSearchParams({
            email: 'alessia.cara@mail.com',
            password: '123'
        })
        const res2 = await request
        .post('/login')
        .send(form2.toString())
        userToken = res2.body.results.token
        
    })

    describe('list all products', () => {
        it('should return message List all products', async () => {
            const res = await request.get('/admin/products?sortBy=createdAt&category=coffee&isRecommended=true')
            .auth(adminToken, {
                type: "bearer"
            })
    
            expect(res.body.message).to.be.eq("List all products")
        })



        it('should return message Forbidden access', async () => {
            const res = await request.get('/admin/products?sortBy=createdAt&category=coffee&isRecommended=true')
            .auth(userToken, {
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
            .auth(adminToken, {
                type: "bearer"
            })
    
            expect(res.body.message).to.be.eq("data products not found")
        })



        it('should return message nextPage null', async () => {
            const res = await request.get('/admin/products?page=5')
            .auth(adminToken, {
                type: "bearer"
            })
    
            expect(res.body.pageInfo.nextPage).to.be.null
        })



        it('should return message prevPage null', async () => {
            const res = await request.get('/admin/products?page=1')
            .auth(adminToken, {
                type: "bearer"
            })
    
            expect(res.body.pageInfo.prevPage).to.be.null
        })



        it('should return message column p.tidak ada does not exist', async () => {
            const res = await request.get('/admin/products?sortBy=tidak ada')
            .auth(adminToken, {
                type: "bearer"
            })
    
            expect(res.body.message).to.be.eq('column p.tidak ada does not exist')
        })
    })



    describe('detail product', () => {
        
        it('should return message detail product', async () => {
            const res = await request.get('/admin/products/1')
            .auth(adminToken, {
                type: "bearer"
            })

            expect(res.body.message).to.be.eq("detail product")
        })



        it('should return message invalid input syntax for type integer: x', async () => {
            const res = await request.get('/admin/products/x')
            .auth(adminToken, {
                type: "bearer"
            })

            expect(res.body.message).to.be.eq("invalid input syntax for type integer: x")
        })



        it('should return message product with id 2026 not found', async () => {
            const res = await request.get('/admin/products/2026')
            .auth(adminToken, {
                type: "bearer"
            })

            expect(res.body.message).to.be.eq("product with id 2026 not found")
        })
    })



    describe('create product', () => {
       
        it('should return message create product successfully', async () => {
            const res = await request.post('/admin/products')
            .auth(adminToken, {
                type: "bearer"
            })
            .send(`name=${new Date().getTime()}&basePrice=1000`)
            productId = res.body.results.id

            expect(res.body.message).to.be.eq("create product successfully")
        })



        it('should return message name vanilla syrup already exist', async () => {
            const res = await request.post('/admin/products')
            .auth(adminToken, {
                type: "bearer"
            })
            .send(`name=vanilla syrup&basePrice=1000`)

            expect(res.body.message).to.be.eq("name vanilla syrup already exist")
        })



        it('should return message name cannot be empty', async () => {
            const res = await request.post('/admin/products')
            .auth(adminToken, {
                type: "bearer"
            })
            .send()

            expect(res.body.message).to.be.eq("name cannot be empty")
        })
    })



    describe('update product', () => {
       
        it('should return message update product successfully', async () => {
            const res = await request.patch(`/admin/products/${productId}`)
            .auth(adminToken, {
                type: "bearer"
            })
            .send('basePrice=7000')

            expect(res.body.message).to.be.eq("update product successfully")
        })



        it('should return message invalid input syntax for type integer: x', async () => {
            const res = await request.patch(`/admin/products/${productId}`)
            .auth(adminToken, {
                type: "bearer"
            })
            .send('basePrice=x')

            expect(res.body.message).to.be.eq("invalid input syntax for type integer: x")
        })



        it('should return message column tidakAda of relation products does not exist', async () => {
            const res = await request.patch(`/admin/products/${productId}`)
            .auth(adminToken, {
                type: "bearer"
            })
            .send('tidakAda=update')

            expect(res.body.message).to.be.eq("column tidakAda of relation products does not exist")
        })



        it('should return message name vanilla syrup already exist', async () => {
            const res = await request.patch(`/admin/products/${productId}`)
            .auth(adminToken, {
                type: "bearer"
            })
            .send('name=vanilla syrup')

            expect(res.body.message).to.be.eq("name vanilla syrup already exist")
        })



        it('should return message product with id 2026 not found', async () => {
            const res = await request.patch('/admin/products/2026')
            .auth(adminToken, {
                type: "bearer"
            })
            .send('basePrice=7000')

            expect(res.body.message).to.be.eq("product with id 2026 not found")
        })
    })



    describe('delete product', () => {
        
        it('should return message delete product successfully', async () => {
            const res = await request.delete(`/admin/products/${productId}`)
            .auth(adminToken, {
                type: "bearer"
            })

            expect(res.body.message).to.be.eq("delete product successfully")
        })



        it('should return message invalid input syntax for type integer: x', async () => {
            const res = await request.delete('/admin/products/x')
            .auth(adminToken, {
                type: "bearer"
            })

            expect(res.body.message).to.be.eq("invalid input syntax for type integer: x")
        })



        it('should return message data with id 1 is still referenced from table orderDetails', async () => {
            const res = await request.delete('/admin/products/1')
            .auth(adminToken, {
                type: "bearer"
            })

            expect(res.body.message).to.be.eq("data with id 1 is still referenced from table orderDetails")
        })



        it('should return message product with id 2026 not found', async () => {
            const res = await request.delete('/admin/products/2026')
            .auth(adminToken, {
                type: "bearer"
            })

            expect(res.body.message).to.be.eq("product with id 2026 not found")
        })
    })
})