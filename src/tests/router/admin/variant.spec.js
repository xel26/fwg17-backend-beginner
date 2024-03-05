const { describe, before } = require("mocha");
const { expect } = require("chai");
const supertest = require("supertest")
const app = require('../../../..');

const request = supertest(app)

describe('/admin/variant endpoint testing', () => {
    let variantId = ''
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
        name: ''
    })


    describe('list all variants', () => {
        it('should return message List all variants', async () => {
            const res = await request.get('/admin/variant?order=tidak ada')
            .auth(adminToken, {type: "bearer"})

            lastPage = res.body.pageInfo.totalPage
            expect(res.body.message).to.be.eq("List all variants")
        })


        it('should return message Forbidden access', async () => {
            const res = await request.get('/admin/variant?order=tidak ada')
            .auth(userToken, {type: "bearer"})

            expect(res.body.message).to.be.eq("Forbidden access")
        })


        it('should return message Unauthorized', async () => {
            const res = await request.get('/admin/variant?order=tidak ada')
            expect(res.body.message).to.be.eq("Unauthorized")
        })


        it('should return message data variants not found', async () => {
            const res = await request.get('/admin/variant?searchKey=tidak ada')
            .auth(adminToken, {type: "bearer"})

            expect(res.body.message).to.be.eq("data variants not found")
        })


        it('should return nextPage null', async () => {
            const res = await request.get(`/admin/variant?page=${lastPage}`)
            .auth(adminToken, {type: "bearer"})

            expect(res.body.pageInfo.nextPage).to.be.null
        })


        it('should return prevPage null', async () => {
            const res = await request.get(`/admin/variant?page=1`)
            .auth(adminToken, {type: "bearer"})

            expect(res.body.pageInfo.prevPage).to.be.null
        })


        it('should return message column tidak ada does not exist', async () => {
            const res = await request.get(`/admin/variant?sortBy=tidak ada`)
            .auth(adminToken, {type: "bearer"})

            expect(res.body.message).to.be.eq('column tidak ada does not exist')
        })
    })



    describe('create variant', () => {
        it('should return message create variant successfully', async () => {
            form.set('name', `${new Date().getTime()}`)

            const res = await request.post('/admin/variant')
            .auth(adminToken, {type: "bearer"})
            .send(form.toString())

            variantId = res.body.results.id
            expect(res.body.message).to.be.eq("create variant successfully")
        })



        it('should return message name Cold already exist', async () => {
            form.set('name', `Cold`)

            const res = await request.post('/admin/variant')
            .auth(adminToken, {type: "bearer"})
            .send(form.toString())

            expect(res.body.message).to.be.eq("name Cold already exist")
        })



        it('should return message name cannot be empty', async () => {
            form.delete('name')

            const res = await request.post('/admin/variant')
            .auth(adminToken, {type: "bearer"})
            .send(form.toString())

            expect(res.body.message).to.be.eq("name cannot be empty")
        })
    })



    describe('detail variant', () => {
        it('should return message detail variant', async () => {
            const res = await request.get(`/admin/variant/${variantId}`)
            .auth(adminToken, {type: "bearer"})

            expect(res.body.message).to.be.eq("detail variant")
        })



        it('should return message invalid input syntax for type integer: x', async () => {
            const res = await request.get('/admin/variant/x')
            .auth(adminToken, {type: "bearer"})

            expect(res.body.message).to.be.eq("invalid input syntax for type integer: x")
        })



        it('should return message variant with id 2026 not found', async () => {
            const res = await request.get('/admin/variant/2026')
            .auth(adminToken, {type: "bearer"})

            expect(res.body.message).to.be.eq("variant with id 2026 not found")
        })
    })





    describe('update variant', () => {
        it('should return message update variant successfully', async () => {
            form.append('additionalPrice', 1000)

            const res = await request.patch(`/admin/variant/${variantId}`)
            .auth(adminToken, {type: "bearer"})
            .send(form.toString())

            expect(res.body.message).to.be.eq("update variant successfully")
        })



        it('should return message name Cold already exist', async () => {
            form.delete('additionalPrice')
            form.set('name', `Cold`)

            const res = await request.patch(`/admin/variant/${variantId}`)
            .auth(adminToken, {type: "bearer"})
            .send(form.toString())

            expect(res.body.message).to.be.eq("name Cold already exist")
        })



        it('should return message variant with id 2026 not found', async () => {
            form.set('name', `example`)

            const res = await request.patch(`/admin/variant/2026`)
            .auth(adminToken, {type: "bearer"})
            .send(form.toString())

            expect(res.body.message).to.be.eq("variant with id 2026 not found")
        })



        it('should return message No data has been modified', async () => {
            form.delete('name')

            const res = await request.patch(`/admin/variant/${variantId}`)
            .auth(adminToken, {type: "bearer"})
            .send(form.toString())

            expect(res.body.message).to.be.eq("No data has been modified")
        })



        it('should return message column tidakAda of relation variant does not exist', async () => {
            form.append('tidakAda', `update`)

            const res = await request.patch(`/admin/variant/${variantId}`)
            .auth(adminToken, {type: "bearer"})
            .send(form.toString())

            expect(res.body.message).to.be.eq("column tidakAda of relation variant does not exist")
        })
    })




    describe('delete variant', () => {
        it('should return message delete variant successfully', async () => {
            const res = await request.delete(`/admin/variant/${variantId}`)
            .auth(adminToken, {type: "bearer"})

            expect(res.body.message).to.be.eq("delete variant successfully")
        })



        it('should return message invalid input syntax for type integer: x', async () => {
            const res = await request.delete(`/admin/variant/x`)
            .auth(adminToken, {type: "bearer"})

            expect(res.body.message).to.be.eq("invalid input syntax for type integer: x")
        })



        it('should return message data with id 1 is still referenced from table orderDetails', async () => {
            const res = await request.delete(`/admin/variant/1`)
            .auth(adminToken, {type: "bearer"})

            expect(res.body.message).to.be.eq("data with id 1 is still referenced from table orderDetails")
        })



        it('should return message variant with id 2026 not found', async () => {
            const res = await request.delete(`/admin/variant/2026`)
            .auth(adminToken, {type: "bearer"})

            expect(res.body.message).to.be.eq("variant with id 2026 not found")
        })
    })
})