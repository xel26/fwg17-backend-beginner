const { describe, before } = require("mocha");
const { expect } = require("chai");
const supertest = require("supertest")
const app = require('../../../..');

const request = supertest(app)

describe('/admin/messages endpoint testing', () => {
    let messageId = ''
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
        recipientId: '',
        senderId: '',
        text: ''
    })


    describe('list all messages', () => {
        it('should return message List all messages', async () => {
            const res = await request.get('/admin/messages?order=tidak ada')
            .auth(adminToken, {type: "bearer"})

            lastPage = res.body.pageInfo.totalPage
            expect(res.body.message).to.be.eq("List all messages")
        })


        it('should return message Forbidden access', async () => {
            const res = await request.get('/admin/messages?order=tidak ada')
            .auth(userToken, {type: "bearer"})

            expect(res.body.message).to.be.eq("Forbidden access")
        })


        it('should return message Unauthorized', async () => {
            const res = await request.get('/admin/messages?order=tidak ada')
            expect(res.body.message).to.be.eq("Unauthorized")
        })


        it('should return message data messages not found', async () => {
            const res = await request.get('/admin/messages?page=2026')
            .auth(adminToken, {type: "bearer"})

            expect(res.body.message).to.be.eq("data messages not found")
        })


        it('should return nextPage null', async () => {
            const res = await request.get(`/admin/messages?page=${lastPage}`)
            .auth(adminToken, {type: "bearer"})

            expect(res.body.pageInfo.nextPage).to.be.null
        })


        it('should return prevPage null', async () => {
            const res = await request.get(`/admin/messages?page=1`)
            .auth(adminToken, {type: "bearer"})

            expect(res.body.pageInfo.prevPage).to.be.null
        })
    })
    



    describe('create message', () => {
        it('should return message create message successfully', async () => {
            form.set('recipientId', 2)
            form.set('senderId', 7)
            form.set('text', 'unit test')

            const res = await request.post('/admin/messages')
            .auth(adminToken, {type: "bearer"})
            .send(form.toString())

            messageId = res.body.results.id
            expect(res.body.message).to.be.eq("create message successfully")
        })



        it('should return message recipientId cannot be empty', async () => {
            form.delete('recipientId')

            const res = await request.post('/admin/messages')
            .auth(adminToken, {type: "bearer"})
            .send(form.toString())

            expect(res.body.message).to.be.eq("recipientId cannot be empty")
        })
    })



    describe('detail message', () => {
        it('should return message detail message', async () => {
            const res = await request.get(`/admin/messages/${messageId}`)
            .auth(adminToken, {type: "bearer"})

            expect(res.body.message).to.be.eq("detail message")
        })



        it('should return message invalid input syntax for type integer: x', async () => {
            const res = await request.get('/admin/messages/x')
            .auth(adminToken, {type: "bearer"})

            expect(res.body.message).to.be.eq("invalid input syntax for type integer: x")
        })



        it('should return message message with id 2026 not found', async () => {
            const res = await request.get('/admin/messages/2026')
            .auth(adminToken, {type: "bearer"})

            expect(res.body.message).to.be.eq("message with id 2026 not found")
        })
    })




    describe('update message', () => {
        it('should return message update message successfully', async () => {
            form.set('recipientId', 2)
            form.set('senderId', 7)
            form.set('text', 'unit test')

            const res = await request.patch(`/admin/messages/${messageId}`)
            .auth(adminToken, {type: "bearer"})
            .send(form.toString())

            expect(res.body.message).to.be.eq("update message successfully")
        })



        it("should return message not present", async () => {
            form.set('recipientId', 2026)

            const res = await request.patch(`/admin/messages/${messageId}`)
            .auth(adminToken, {type: "bearer"})
            .send(form.toString())

            expect(res.body.message).to.be.eq("data with recipientId 2026 is not present in table users")
        })



        it('should return message with id 2026 not found', async () => {
            form.set('recipientId', 2)
            form.set('senderId', 7)
            form.set('text', 'unit test')

            const res = await request.patch(`/admin/messages/2026`)
            .auth(adminToken, {type: "bearer"})
            .send(form.toString())

            expect(res.body.message).to.be.eq("message with id 2026 not found")
        })



        it('should return message No data has been modified', async () => {
            form.delete('recipientId')
            form.delete('senderId')
            form.delete('text')

            const res = await request.patch(`/admin/messages/${messageId}`)
            .auth(adminToken, {type: "bearer"})
            .send(form.toString())

            expect(res.body.message).to.be.eq("No data has been modified")
        })



        it('should return message column tidakAda of relation messages does not exist', async () => {
            form.append('tidakAda', `update`)

            const res = await request.patch(`/admin/messages/${messageId}`)
            .auth(adminToken, {type: "bearer"})
            .send(form.toString())

            expect(res.body.message).to.be.eq("column tidakAda of relation message does not exist")
        })
    })




    describe('delete message', () => {
        it('should return message delete message successfully', async () => {
            const res = await request.delete(`/admin/messages/${messageId}`)
            .auth(adminToken, {type: "bearer"})

            expect(res.body.message).to.be.eq("delete message successfully")
        })



        it('should return message invalid input syntax for type integer: x', async () => {
            const res = await request.delete(`/admin/messages/x`)
            .auth(adminToken, {type: "bearer"})

            expect(res.body.message).to.be.eq("invalid input syntax for type integer: x")
        })



        it('should return message message with id 2026 not found', async () => {
            const res = await request.delete(`/admin/messages/2026`)
            .auth(adminToken, {type: "bearer"})

            expect(res.body.message).to.be.eq("message with id 2026 not found")
        })
    })
})