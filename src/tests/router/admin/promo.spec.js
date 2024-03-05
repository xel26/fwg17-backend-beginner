const { describe, before } = require("mocha");
const { expect } = require("chai");
const supertest = require("supertest")
const app = require('../../../..');

const request = supertest(app)

describe('/admin/promo endpoint testing', () => {
    let promoId = ''
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


    const form = new URLSearchParams({
        name: '',
        code: '',
        percentage: 0,
        maximumPromo: 0,
        minimumAmount: 0
    })


    describe('list all promo', () => {
        it('should return message List all promo', async () => {
            const res = await request.get('/admin/promo?order=tidak ada')
            .auth(adminToken, {
                type: "bearer"
            })
    
            lastPage = res.body.pageInfo.totalPage
            expect(res.body.message).to.be.eq("List all promo")
        })



        it('should return message Forbidden access', async () => {
            const res = await request.get('/admin/promo?order=tidak ada')
            .auth(userToken, {
                type: "bearer"
            })
    
            expect(res.body.message).to.be.eq("Forbidden access")
    
        })



        it('should return message Unauthorized', async () => {
            const res = await request.get('/admin/promo?order=tidak ada')
            expect(res.body.message).to.be.eq("Unauthorized")
        })



        it('should return message data promo not found', async () => {
            const res = await request.get('/admin/promo?searchKey=tidak ada')
            .auth(adminToken, {
                type: "bearer"
            })
    
            expect(res.body.message).to.be.eq("data promo not found")
        })



        it('should return nextPage null', async () => {
            const res = await request.get(`/admin/promo?page=${lastPage}`)
            .auth(adminToken, {
                type: "bearer"
            })
    
            expect(res.body.pageInfo.nextPage).to.be.null
        })



        it('should return prevPage null', async () => {
            const res = await request.get('/admin/promo?page=1')
            .auth(adminToken, {
                type: "bearer"
            })
    
            expect(res.body.pageInfo.prevPage).to.be.null
        })



        it('should return message column p.tidak ada does not exist', async () => {
            const res = await request.get('/admin/promo?sortBy=tidak ada')
            .auth(adminToken, {
                type: "bearer"
            })
    
            expect(res.body.message).to.be.eq('column tidak ada does not exist')
        })
    })



    describe('create promo', () => {
        it('should return message create promo successfully', async () => {
            form.set('name', `${new Date().getTime()}`)
            form.set('code', `${Math.random() * 1000}`)
            form.set('percentage', 0.025)
            form.set('maximumPromo', 50000)
            form.set('minimumAmount', 70000)

            const res = await request.post('/admin/promo')
            .auth(adminToken, {
                type: "bearer"
            })
            .send(form.toString())
            
            promoId = res.body.results.id
            expect(res.body.message).to.be.eq("create promo successfully")
        })



        it('should return message name super deal already exist', async () => {
            form.set('name', `super deal`)

            const res = await request.post('/admin/promo')
            .auth(adminToken, {
                type: "bearer"
            })
            .send(form.toString())

            expect(res.body.message).to.be.eq("name super deal already exist")
        })



        it('should return message code sd123 already exist', async () => {
            form.set('name', `${new Date().getTime()}`)
            form.set('code', `sd123`)

            const res = await request.post('/admin/promo')
            .auth(adminToken, {
                type: "bearer"
            })
            .send(form.toString())

            expect(res.body.message).to.be.eq("code sd123 already exist")
        })



        it('should return message name cannot be empty', async () => {
            form.delete('name')

            const res = await request.post('/admin/promo')
            .auth(adminToken, {
                type: "bearer"
            })
            .send()

            expect(res.body.message).to.be.eq("name cannot be empty")
        })
    })



    describe('detail promo', () => {
        it('should return message detail promo', async () => {
            const res = await request.get(`/admin/promo/${promoId}`)
            .auth(adminToken, {
                type: "bearer"
            })

            expect(res.body.message).to.be.eq("detail promo")
        })



        it('should return message invalid input syntax for type integer: x', async () => {
            const res = await request.get('/admin/promo/x')
            .auth(adminToken, {
                type: "bearer"
            })

            expect(res.body.message).to.be.eq("invalid input syntax for type integer: x")
        })



        it('should return message promo with id 2026 not found', async () => {
            const res = await request.get('/admin/promo/2026')
            .auth(adminToken, {
                type: "bearer"
            })

            expect(res.body.message).to.be.eq("promo with id 2026 not found")
        })
    })



    describe('update promo', () => {
        it('should return message update promo successfully', async () => {
            form.set('name', `${new Date().getTime()}`)
            form.set('code', `${new Date().getTime()}`)

            const res = await request.patch(`/admin/promo/${promoId}`)
            .auth(adminToken, {
                type: "bearer"
            })
            .send(form.toString())

            expect(res.body.message).to.be.eq("update promo successfully")
        })
                


        it('should return message promo with id 2026 not found', async () => {
            const res = await request.patch('/admin/promo/2026')
            .auth(adminToken, {
                type: "bearer"
            })
            .send(form.toString())

            expect(res.body.message).to.be.eq("promo with id 2026 not found")
        })
        


        it('should return message name super deal already exist', async () => {
            form.set('maximumPromo', 70000)
            form.set('name', 'super deal')

            const res = await request.patch(`/admin/promo/${promoId}`)
            .auth(adminToken, {
                type: "bearer"
            })
            .send(form.toString())

            expect(res.body.message).to.be.eq("name super deal already exist")
        })
        


        it('should return message code sd123 already exist', async () => {
            form.set('name', 'new name')
            form.set('code', 'sd123')

            const res = await request.patch(`/admin/promo/${promoId}`)
            .auth(adminToken, {
                type: "bearer"
            })
            .send(form.toString())

            expect(res.body.message).to.be.eq("code sd123 already exist")
        })



        it('should return message No data has been modified', async () => {
            form.delete('name')
            form.delete('code')
            form.delete('percentage')
            form.delete('maximumPromo')
            form.delete('minimumAmount')

            const res = await request.patch(`/admin/promo/${promoId}`)
            .auth(adminToken, {
                type: "bearer"
            })
            .send(form.toString())

            expect(res.body.message).to.be.eq("No data has been modified")
        })
        


        it('should return message column tidakAda of relation promo does not exist', async () => {
            form.append('tidakAda', 'update')

            const res = await request.patch(`/admin/promo/${promoId}`)
            .auth(adminToken, {
                type: "bearer"
            })
            .send(form.toString())

            expect(res.body.message).to.be.eq("column tidakAda of relation promo does not exist")
        })
    })


    describe('delete promo', () => {
        it('should return message delete promo successfully', async () => {
            const res = await request.delete(`/admin/promo/${promoId}`)
            .auth(adminToken, {
                type: "bearer"
            })

            expect(res.body.message).to.be.eq("delete promo successfully")
        })



        it('should return message invalid input syntax for type integer: x', async () => {
            const res = await request.delete('/admin/promo/x')
            .auth(adminToken, {
                type: "bearer"
            })

            expect(res.body.message).to.be.eq("invalid input syntax for type integer: x")
        })



        it('should return message data with id 2 is still referenced from table orders', async () => {
            const res = await request.delete('/admin/promo/2')
            .auth(adminToken, {
                type: "bearer"
            })

            expect(res.body.message).to.be.eq("data with id 2 is still referenced from table orders")
        })



        it('should return message promo with id 2026 not found', async () => {
            const res = await request.delete('/admin/promo/2026')
            .auth(adminToken, {
                type: "bearer"
            })

            expect(res.body.message).to.be.eq("promo with id 2026 not found")
        })
    })
})