const { describe, before } = require("mocha");
const { expect } = require("chai");
const supertest = require("supertest")
const app = require('../../../..');

const request = supertest(app)

describe('/admin/categories endpoint testing', () => {
    let categoryId = ''
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


    describe('list all categories', () => {
        it('should return message List all categories', async () => {
            const res = await request.get('/admin/categories?order=tidak ada')
            .auth(adminToken, {type: "bearer"})

            lastPage = res.body.pageInfo.totalPage
            expect(res.body.message).to.be.eq("List all categories")
        })


        it('should return message Forbidden access', async () => {
            const res = await request.get('/admin/categories?order=tidak ada')
            .auth(userToken, {type: "bearer"})

            expect(res.body.message).to.be.eq("Forbidden access")
        })


        it('should return message Unauthorized', async () => {
            const res = await request.get('/admin/categories?order=tidak ada')
            expect(res.body.message).to.be.eq("Unauthorized")
        })


        it('should return message data categories not found', async () => {
            const res = await request.get('/admin/categories?searchKey=tidak ada')
            .auth(adminToken, {type: "bearer"})

            expect(res.body.message).to.be.eq("data categories not found")
        })


        it('should return nextPage null', async () => {
            const res = await request.get(`/admin/categories?page=${lastPage}`)
            .auth(adminToken, {type: "bearer"})

            expect(res.body.pageInfo.nextPage).to.be.null
        })


        it('should return prevPage null', async () => {
            const res = await request.get(`/admin/categories?page=1`)
            .auth(adminToken, {type: "bearer"})

            expect(res.body.pageInfo.prevPage).to.be.null
        })


        it('should return message column tidak ada does not exist', async () => {
            const res = await request.get(`/admin/categories?sortBy=tidak ada`)
            .auth(adminToken, {type: "bearer"})

            expect(res.body.message).to.be.eq('column tidak ada does not exist')
        })
    })
    



    describe('create category', () => {
        it('should return message create category successfully', async () => {
            form.set('name', `${new Date().getTime()}`)

            const res = await request.post('/admin/categories')
            .auth(adminToken, {type: "bearer"})
            .send(form.toString())

            categoryId = res.body.results.id
            expect(res.body.message).to.be.eq("create category successfully")
        })



        it('should return message name coFFee already exist', async () => {
            form.set('name', `coFFee`)

            const res = await request.post('/admin/categories')
            .auth(adminToken, {type: "bearer"})
            .send(form.toString())

            expect(res.body.message).to.be.eq("name coFFee already exist")
        })



        it('should return message name cannot be empty', async () => {
            form.delete('name')

            const res = await request.post('/admin/categories')
            .auth(adminToken, {type: "bearer"})
            .send(form.toString())

            expect(res.body.message).to.be.eq("name cannot be empty")
        })
    })



    describe('detail category', () => {
        it('should return message detail category', async () => {
            const res = await request.get(`/admin/categories/${categoryId}`)
            .auth(adminToken, {type: "bearer"})

            expect(res.body.message).to.be.eq("detail category")
        })



        it('should return message invalid input syntax for type integer: x', async () => {
            const res = await request.get('/admin/categories/x')
            .auth(adminToken, {type: "bearer"})

            expect(res.body.message).to.be.eq("invalid input syntax for type integer: x")
        })



        it('should return message category with id 2026 not found', async () => {
            const res = await request.get('/admin/categories/2026')
            .auth(adminToken, {type: "bearer"})

            expect(res.body.message).to.be.eq("category with id 2026 not found")
        })
    })




    describe('update category', () => {
        it('should return message update category successfully', async () => {
            form.append('name', `update name`)

            const res = await request.patch(`/admin/categories/${categoryId}`)
            .auth(adminToken, {type: "bearer"})
            .send(form.toString())

            expect(res.body.message).to.be.eq("update category successfully")
        })



        it('should return message name foods already exist', async () => {
            form.set('name', `foods`)

            const res = await request.patch(`/admin/categories/${categoryId}`)
            .auth(adminToken, {type: "bearer"})
            .send(form.toString())

            expect(res.body.message).to.be.eq("name foods already exist")
        })



        it('should return message category with id 2026 not found', async () => {
            form.set('name', `example`)

            const res = await request.patch(`/admin/categories/2026`)
            .auth(adminToken, {type: "bearer"})
            .send(form.toString())

            expect(res.body.message).to.be.eq("category with id 2026 not found")
        })



        it('should return message No data has been modified', async () => {
            form.delete('name')

            const res = await request.patch(`/admin/categories/${categoryId}`)
            .auth(adminToken, {type: "bearer"})
            .send(form.toString())

            expect(res.body.message).to.be.eq("No data has been modified")
        })



        it('should return message column tidakAda of relation categories does not exist', async () => {
            form.append('tidakAda', `update`)

            const res = await request.patch(`/admin/categories/${categoryId}`)
            .auth(adminToken, {type: "bearer"})
            .send(form.toString())

            expect(res.body.message).to.be.eq("column tidakAda of relation categories does not exist")
        })
    })




    describe('delete category', () => {
        it('should return message delete category successfully', async () => {
            const res = await request.delete(`/admin/categories/${categoryId}`)
            .auth(adminToken, {type: "bearer"})

            expect(res.body.message).to.be.eq("delete category successfully")
        })



        it('should return message invalid input syntax for type integer: x', async () => {
            const res = await request.delete(`/admin/categories/x`)
            .auth(adminToken, {type: "bearer"})

            expect(res.body.message).to.be.eq("invalid input syntax for type integer: x")
        })



        it('should return message data with id 2 is still referenced from table productCategories', async () => {
            const res = await request.delete(`/admin/categories/2`)
            .auth(adminToken, {type: "bearer"})

            expect(res.body.message).to.be.eq("data with id 2 is still referenced from table productCategories")
        })



        it('should return message category with id 2026 not found', async () => {
            const res = await request.delete(`/admin/categories/2026`)
            .auth(adminToken, {type: "bearer"})

            expect(res.body.message).to.be.eq("category with id 2026 not found")
        })
    })
})