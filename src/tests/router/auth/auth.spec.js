const { describe } = require("mocha");
const { expect } = require("chai");
const supertest = require("supertest")
const app = require('../../../..');

const request = supertest(app)


describe('/register endpoint testing', () => {
    it('should return message register success. . . welcome aboard!', async () => {
        const res = await request.post('/register')
        .send(`fullName=unit test&email=unit.test${new Date().getTime()}@example.com&password=123`)

        expect(res.body.message).to.be.eq("register success. . . welcome aboard!")
    })
    


    it('should return message email admin@example.com already registered. . . please login', async () => {
        const res = await request.post('/register')
        .send(`fullName=unit test&email=admin@example.com&password=123`)

        expect(res.body.message).to.be.eq("email admin@example.com already registered. . . please login")
    })
    


    it('should return message Full Name cannot be empty', async () => {
        const res = await request.post('/register')
        .send(`email=unit.test@example.com&password=123`)

        expect(res.body.message).to.be.eq("Full Name cannot be empty")
    })
    


    it('should return message email cannot be empty', async () => {
        const res = await request.post('/register')
        .send(`fullName=unit test&password=123`)

        expect(res.body.message).to.be.eq("email cannot be empty")
    })
    


    it('should return message password cannot be empty', async () => {
        const res = await request.post('/register')
        .send(`fullName=unit test&email=unit.test@example.com`)

        expect(res.body.message).to.be.eq("password cannot be empty")
    })
})



describe('/login endpoint testing', () => {
    it('should return message login success. . . embark your coffee journey', async () => {
        const res = await request.post('/login')
        .send('email=alessia.cara@mail.com&password=123')

        expect(res.body.message).to.be.eq("login success. . . embark your coffee journey")
    })



    it('should return message please enter your email', async () => {
        const res = await request.post('/login')
        .send('password=123')

        expect(res.body.message).to.be.eq("please enter your email")
    })



    it('should return message please enter your password', async () => {
        const res = await request.post('/login')
        .send('email=alessia.cara@mail.com')

        expect(res.body.message).to.be.eq("please enter your password")
    })



    it('should return message email not registered. . . please sign up to create new account', async () => {
        const res = await request.post('/login')
        .send('email=tidak.terdaftar@example.com&password=123')

        expect(res.body.message).to.be.eq("email not registered. . . please sign up to create new account")
    })



    it('should return message wrong password. . . please try again', async () => {
        const res = await request.post('/login')
        .send('email=alessia.cara@mail.com&password=1')

        expect(res.body.message).to.be.eq("wrong password. . . please try again")
    })
})



describe('/forgot-password endpoint testing', () => {
    it('should return message OTP has been sent to your email', async () => {
        const res = await request.post('/forgot-password')
        .send('email=shellaananda2636@gmail.com')

        expect(res.body.message).to.be.eq("OTP has been sent to your email")
    })



    it('should return message email not registered. . . . please use another email', async () => {
        const res = await request.post('/forgot-password')
        .send('email=tidak.terdaftar@example.com')

        expect(res.body.message).to.be.eq("email not registered. . . . please use another email")
    })



    it('should return message invalid OTP code. . . please enter the correct code', async () => {
        const res = await request.post('/forgot-password')
        .send('otp=1&newPassword=123')

        expect(res.body.message).to.be.eq("invalid OTP code. . . please enter the correct code")
    })



    it('should return message create new password success', async () => {
        const res = await request.post('/forgot-password')
        .send('otp=918950&newPassword=123')

        expect(res.body.message).to.be.eq("create new password for shellaananda2636@gmail.com success")
    })
})