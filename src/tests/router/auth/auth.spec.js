const { describe } = require("mocha");
const { expect } = require("chai");
const supertest = require("supertest")
const app = require('../../../..');

const request = supertest(app)


describe('/register endpoint testing', () => {
    const form = new URLSearchParams({
        fullName: '',
        email: '',
        password: ''
    })
    
    it('should return message register success. . . welcome aboard!', async () => {
        form.set('email', `unit.test${new Date().getTime()}@example.com`)
        form.set('password', '123')
        form.set('fullName', 'unit test')

        const res = await request.post('/register')
        .send(form.toString())

        expect(res.body.message).to.be.eq("register success. . . welcome aboard!")
    })
    


    it('should return message email admin@example.com already registered. . . please login', async () => {
        form.set('email', 'admin@example.com')
        const res = await request.post('/register')
        .send(form.toString())

        expect(res.body.message).to.be.eq("email admin@example.com already registered. . . please login")
    })
    


    it('should return message Full Name cannot be empty', async () => {
        form.set('fullName', '')
        const res = await request.post('/register')
        .send(form.toString())

        expect(res.body.message).to.be.eq("Full Name cannot be empty")
    })
    


    it('should return message email cannot be empty', async () => {
        form.set('fullName', 'unit testing')
        form.set('email', '')
        const res = await request.post('/register')
        .send(form.toString())

        expect(res.body.message).to.be.eq("email cannot be empty")
    })
    


    it('should return message password cannot be empty', async () => {
        form.set('email', 'unit.test@example.com')
        form.set('password', '')
        const res = await request.post('/register')
        .send(form.toString())

        expect(res.body.message).to.be.eq("password cannot be empty")
    })
})



describe('/login endpoint testing', () => {
    const form = new URLSearchParams({
        email: '',
        password: ''
    })

    it('should return message login success. . . embark your coffee journey', async () => {
        form.set('email', 'alessia.cara@mail.com')
        form.set('password', '123')
        const res = await request.post('/login')
        .send(form.toString())

        expect(res.body.message).to.be.eq("login success. . . embark your coffee journey")
    })

    it('should return message please enter your password', async () => {
        form.set('password', '')
        const res = await request.post('/login')
        .send(form.toString())

        expect(res.body.message).to.be.eq("please enter your password")
    })


    it('should return message please enter your email', async () => {
        form.set('email', '')
        form.set('password', '123')
        const res = await request.post('/login')
        .send(form.toString())

        expect(res.body.message).to.be.eq("please enter your email")
    })


    it('should return message email not registered. . . please sign up to create new account', async () => {
        form.set('email', 'tidak.terdaftar@example.com')
        const res = await request.post('/login')
        .send(form.toString())

        expect(res.body.message).to.be.eq("email not registered. . . please sign up to create new account")
    })



    it('should return message wrong password. . . please try again', async () => {
        form.set('email', 'alessia.cara@mail.com')
        form.set('password', '1')
        const res = await request.post('/login')
        .send(form.toString())

        expect(res.body.message).to.be.eq("wrong password. . . please try again")
    })
})



describe('/forgot-password endpoint testing', () => {
    const form = new URLSearchParams({
        email: ''
    })
    it('should return message OTP has been sent to your email', async () => {
        form.set('email', 'shellaananda2636@gmail.com')
        const res = await request.post('/forgot-password')
        .set('X-TEST-OTP', '111111')
        .send(form.toString())

        expect(res.body.message).to.be.eq("OTP has been sent to your email")
    })



    it('should return message email not registered. . . . please use another email', async () => {
        form.set('email', 'tidak.terdaftar@example.com')
        const res = await request.post('/forgot-password')
        .send(form.toString())

        expect(res.body.message).to.be.eq("email not registered. . . . please use another email")
    })



    it('should return message invalid OTP code. . . please enter the correct code', async () => {
        form.delete('email')
        form.append('otp', '1')
        form.append('newPassword', '123')
        const res = await request.post('/forgot-password')
        .send(form.toString())

        expect(res.body.message).to.be.eq("invalid OTP code. . . please enter the correct code")
    })



    it('should return message create new password success', async () => {
        form.set('otp', '111111')
        form.set('newPassword', '123')
        const res = await request
        .post('/forgot-password')
        .send(form.toString())

        expect(res.body.message).to.be.eq("create new password for shellaananda2636@gmail.com success")
    })
})