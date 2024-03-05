const { describe, before } = require("mocha");
const { expect } = require("chai");
const supertest = require("supertest")
const app = require('../../../..');

const request = supertest(app)

describe('/admin/user endpoint testing', () => {
    let  orderDetailsId   = ''
    let adminToken = ''
    let userToken = ''
    let lastPage

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


    const form = new URLSearchParams()


    describe('list all orderDetails ', () => {
        it('should return message List all orderDetails ', async () => {
            const res = await request.get('/admin/order-details?order=tidak ada')
            .auth(adminToken, {
                type: "bearer"
            })
    
            lastPage = res.body.pageInfo.totalPage
            expect(res.body.message).to.be.eq("List all orderDetails")
        })



        it('should return message Forbidden access', async () => {
            const res = await request.get('/admin/order-details?order=tidak ada')
            .auth(userToken, {
                type: "bearer"
            })
    
            expect(res.body.message).to.be.eq("Forbidden access")
    
        })



        it('should return message invalid token', async () => {
            const res = await request.get('/admin/order-details?order=tidak ada')
            .auth(userToken)
    
            expect(res.body.message).to.be.eq("invalid token")
    
        })



        it('should return message Unauthorized', async () => {
            const res = await request.get('/admin/order-details?order=tidak ada')
            expect(res.body.message).to.be.eq("Unauthorized")
        })



        it('should return message data orderDetails not found', async () => {
            const res = await request.get('/admin/order-details?page=2026')
            .auth(adminToken, {
                type: "bearer"
            })
    
            expect(res.body.message).to.be.eq("data orderDetails not found")
        })



        it('should return nextPage null', async () => {
            const res = await request.get(`/admin/order-details?page=${lastPage}`)
            .auth(adminToken, {
                type: "bearer"
            })
    
            expect(res.body.pageInfo.nextPage).to.be.null
        })



        it('should return prevPage null', async () => {
            const res = await request.get('/admin/order-details?page=1')
            .auth(adminToken, {
                type: "bearer"
            })
    
            expect(res.body.pageInfo.prevPage).to.be.null
        })



        it('should return message column tidak ada does not exist', async () => {
            const res = await request.get('/admin/order-details?sortBy=tidak ada')
            .auth(adminToken, {
                type: "bearer"
            })
    
            expect(res.body.message).to.be.eq('column tidak ada does not exist')
        })
    })



    describe('create orderDetails', () => {
        it('should return message create orderDetails successfully', async () => {
            form.append('productId', 1)
            form.append('sizeId', 1)
            form.append('variantId', 1)
            form.append('quantity', 3)
            form.append('orderId', 609)

            const res = await request.post('/admin/order-details')
            .auth(adminToken, {
                type: "bearer"
            })
            .send(form.toString())
            
             orderDetailsId   = res.body.results.id
            expect(res.body.message).to.be.eq("create orderDetails successfully")
        })



        it('should return message not present', async () => {
            form.set('orderId', 2026)

            const res = await request.post('/admin/order-details')
            .auth(adminToken, {
                type: "bearer"
            })
            .send(form.toString())

            expect(res.body.message).to.be.eq("data with orderId 2026 is not present in table orders")
        })



        it('should return message productId cannot be empty', async () => {
            form.delete('productId')

            const res = await request.post('/admin/order-details')
            .auth(adminToken, {
                type: "bearer"
            })
            .send()

            expect(res.body.message).to.be.eq("productId cannot be empty")
        })
    })



    describe('detail orderDetails', () => {
        it('should return message detail user', async () => {
            const res = await request.get(`/admin/order-details/${ orderDetailsId  }`)
            .auth(adminToken, {
                type: "bearer"
            })

            expect(res.body.message).to.be.eq("detail orderDetails")
        })



        it('should return message invalid input syntax for type integer: x', async () => {
            const res = await request.get('/admin/order-details/x')
            .auth(adminToken, {
                type: "bearer"
            })

            expect(res.body.message).to.be.eq("invalid input syntax for type integer: x")
        })



        it('should return message orderDetails with id 2026 not found', async () => {
            const res = await request.get('/admin/order-details/2026')
            .auth(adminToken, {
                type: "bearer"
            })

            expect(res.body.message).to.be.eq("orderDetails with id 2026 not found")
        })
    })



    describe('update orderDetails', () => {
        it('should return message update orderDetails successfully', async () => {
            form.set('quantity', 1)
            form.set('orderId', 609)

            const res = await request.patch(`/admin/order-details/${ orderDetailsId  }`)
            .auth(adminToken, {
                type: "bearer"
            })
            .send(form.toString())

            expect(res.body.message).to.be.eq("update orderDetails successfully")
        })
                


        it('should return message orderDetails with id 2026 not found', async () => {
            const res = await request.patch('/admin/order-details/2026')
            .auth(adminToken, {
                type: "bearer"
            })
            .send(form.toString())

            expect(res.body.message).to.be.eq("orderDetails with id 2026 not found")
        })
        


        it('should return message data with productId 2026 is not present in table products', async () => {
            form.set('productId', 2026)

            const res = await request.patch(`/admin/order-details/${ orderDetailsId  }`)
            .auth(adminToken, {
                type: "bearer"
            })
            .send(form.toString())

            console.log(form.toString())
            expect(res.body.message).to.be.eq("data with productId 2026 is not present in table products")
        })



        it('should return message No data has been modified', async () => {
            form.delete('productId', 1)
            form.delete('sizeId', 1)
            form.delete('variantId', 1)
            form.delete('quantity', 3)
            form.delete('orderId', 609)

            const res = await request.patch(`/admin/order-details/${ orderDetailsId  }`)
            .auth(adminToken, {
                type: "bearer"
            })
            .send(form.toString())

            expect(res.body.message).to.be.eq("No data has been modified")
        })

        


        it('should return message column tidakAda of relation orderDetails does not exist', async () => {
            form.append('tidakAda', 'update')

            const res = await request.patch(`/admin/order-details/${ orderDetailsId  }`)
            .auth(adminToken, {
                type: "bearer"
            })
            .send(form.toString())

            expect(res.body.message).to.be.eq("column tidakAda of relation orderDetails does not exist")
        })
    })



    describe('delete orderDetails', () => {
        it('should return message delete orderDetails successfully', async () => {
            const res = await request.delete(`/admin/order-details/${ orderDetailsId  }`)
            .auth(adminToken, {
                type: "bearer"
            })

            expect(res.body.message).to.be.eq("delete orderDetails successfully")
        })



        it('should return message invalid input syntax for type integer: x', async () => {
            const res = await request.delete('/admin/order-details/x')
            .auth(adminToken, {
                type: "bearer"
            })

            expect(res.body.message).to.be.eq("invalid input syntax for type integer: x")
        })



        it('should return message orderDetails with id 2026 not found', async () => {
            const res = await request.delete('/admin/order-details/2026')
            .auth(adminToken, {
                type: "bearer"
            })

            expect(res.body.message).to.be.eq("orderDetails with id 2026 not found")
        })
    })
})