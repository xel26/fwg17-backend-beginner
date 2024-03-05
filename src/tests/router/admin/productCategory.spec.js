const { describe, before } = require("mocha");
const { expect } = require("chai");
const supertest = require("supertest")
const app = require('../../../..');

const request = supertest(app)

describe('/admin/user endpoint testing', () => {
    let  productCategoriesId  = ''
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


    describe('list all productCategories', () => {
        it('should return message List all productCategories', async () => {
            const res = await request.get('/admin/product-categories?order=tidak ada')
            .auth(adminToken, {
                type: "bearer"
            })
    
            lastPage = res.body.pageInfo.totalPage
            expect(res.body.message).to.be.eq("List all productCategories")
        })



        it('should return message Forbidden access', async () => {
            const res = await request.get('/admin/product-categories?order=tidak ada')
            .auth(userToken, {
                type: "bearer"
            })
    
            expect(res.body.message).to.be.eq("Forbidden access")
    
        })



        it('should return message invalid token', async () => {
            const res = await request.get('/admin/product-categories?order=tidak ada')
            .auth(userToken)
    
            expect(res.body.message).to.be.eq("invalid token")
    
        })



        it('should return message Unauthorized', async () => {
            const res = await request.get('/admin/product-categories?order=tidak ada')
            expect(res.body.message).to.be.eq("Unauthorized")
        })



        it('should return message data productCategories not found', async () => {
            const res = await request.get('/admin/product-categories?page=2026')
            .auth(adminToken, {
                type: "bearer"
            })
    
            expect(res.body.message).to.be.eq("data productCategories not found")
        })



        it('should return nextPage null', async () => {
            const res = await request.get(`/admin/product-categories?page=${lastPage}`)
            .auth(adminToken, {
                type: "bearer"
            })
    
            expect(res.body.pageInfo.nextPage).to.be.null
        })



        it('should return prevPage null', async () => {
            const res = await request.get('/admin/product-categories?page=1')
            .auth(adminToken, {
                type: "bearer"
            })
    
            expect(res.body.pageInfo.prevPage).to.be.null
        })



        it('should return message column tidak ada does not exist', async () => {
            const res = await request.get('/admin/product-categories?sortBy=tidak ada')
            .auth(adminToken, {
                type: "bearer"
            })
    
            expect(res.body.message).to.be.eq('column tidak ada does not exist')
        })
    })



    describe('create productCategory', () => {
        it('should return message create productCategory successfully', async () => {
            form.append('productId', 1)
            form.append('categoryId', 4)

            const res = await request.post('/admin/product-categories')
            .auth(adminToken, {
                type: "bearer"
            })
            .send(form.toString())
            
             productCategoriesId  = res.body.results.id
            expect(res.body.message).to.be.eq("create productCategory successfully")
        })



        it('should return message productCategory with productId 1 and categoryId 2 already exist', async () => {
            form.set('categoryId', 2)

            const res = await request.post('/admin/product-categories')
            .auth(adminToken, {
                type: "bearer"
            })
            .send(form.toString())

            expect(res.body.message).to.be.eq("productCategory with productId 1 and categoryId 2 already exist")
        })



        it('should return message not present', async () => {
            form.set('categoryId', 2026)

            const res = await request.post('/admin/product-categories')
            .auth(adminToken, {
                type: "bearer"
            })
            .send(form.toString())

            expect(res.body.message).to.be.eq("data with categoryId 2026 is not present in table categories")
        })



        it('should return message productId cannot be empty', async () => {
            form.delete('productId')

            const res = await request.post('/admin/product-categories')
            .auth(adminToken, {
                type: "bearer"
            })
            .send()

            expect(res.body.message).to.be.eq("productId cannot be empty")
        })
    })



    describe('detail productCategory', () => {
        it('should return message detail user', async () => {
            const res = await request.get(`/admin/product-categories/${ productCategoriesId }`)
            .auth(adminToken, {
                type: "bearer"
            })

            expect(res.body.message).to.be.eq("detail ProductCategories")
        })



        it('should return message invalid input syntax for type integer: x', async () => {
            const res = await request.get('/admin/product-categories/x')
            .auth(adminToken, {
                type: "bearer"
            })

            expect(res.body.message).to.be.eq("invalid input syntax for type integer: x")
        })



        it('should return message productCategory with id 2026 not found', async () => {
            const res = await request.get('/admin/product-categories/2026')
            .auth(adminToken, {
                type: "bearer"
            })

            expect(res.body.message).to.be.eq("productCategory with id 2026 not found")
        })
    })



    describe('update productCategory', () => {
        it('should return message update productCategory successfully', async () => {
            form.set('productId', 2)
            form.set('categoryId', 4)

            const res = await request.patch(`/admin/product-categories/${ productCategoriesId }`)
            .auth(adminToken, {
                type: "bearer"
            })
            .send(form.toString())

            expect(res.body.message).to.be.eq("update productCategory successfully")
        })
                


        it('should return message productCategory with id 2026 not found', async () => {
            const res = await request.patch('/admin/product-categories/2026')
            .auth(adminToken, {
                type: "bearer"
            })
            .send(form.toString())

            expect(res.body.message).to.be.eq("productCategory with id 2026 not found")
        })
        


        it('should return message productCategory with productId 2 and categoryId 2 already exist', async () => {
            form.set('categoryId', 2)

            const res = await request.patch(`/admin/product-categories/${ productCategoriesId }`)
            .auth(adminToken, {
                type: "bearer"
            })
            .send(form.toString())

            console.log(form.toString())
            expect(res.body.message).to.be.eq("productCategory with productId 2 and categoryId 2 already exist")
        })



        it('should return message No data has been modified', async () => {
            form.delete('productId')
            form.delete('categoryId')

            const res = await request.patch(`/admin/product-categories/${ productCategoriesId }`)
            .auth(adminToken, {
                type: "bearer"
            })
            .send(form.toString())

            expect(res.body.message).to.be.eq("No data has been modified")
        })

        


        it('should return message column tidakAda of relation productCategories does not exist', async () => {
            form.append('tidakAda', 'update')

            const res = await request.patch(`/admin/product-categories/${ productCategoriesId }`)
            .auth(adminToken, {
                type: "bearer"
            })
            .send(form.toString())

            expect(res.body.message).to.be.eq("column tidakAda of relation productCategories does not exist")
        })
    })



    describe('delete user', () => {
        it('should return message delete productCategory successfully', async () => {
            const res = await request.delete(`/admin/product-categories/${ productCategoriesId }`)
            .auth(adminToken, {
                type: "bearer"
            })

            expect(res.body.message).to.be.eq("delete productCategory successfully")
        })



        it('should return message invalid input syntax for type integer: x', async () => {
            const res = await request.delete('/admin/product-categories/x')
            .auth(adminToken, {
                type: "bearer"
            })

            expect(res.body.message).to.be.eq("invalid input syntax for type integer: x")
        })



        it('should return message productCategory with id 2026 not found', async () => {
            const res = await request.delete('/admin/product-categories/2026')
            .auth(adminToken, {
                type: "bearer"
            })

            expect(res.body.message).to.be.eq("productCategory with id 2026 not found")
        })
    })
})