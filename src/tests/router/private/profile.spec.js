const { describe } = require("mocha");
const { expect } = require("chai");
const supertest = require("supertest")
const app = require('../../../..');

const request = supertest(app)

describe('/profile endpoint testing', () => {
    it('should return message user profile', async () => {
        const res = await request.get('/profile')
        .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjM3LCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE3MDk0ODA4MTl9.SpIDBY6_ZmnAfO9X3o6PPahQKglQ_H2mQC7ye12fDj0', {
            type: "bearer"
        })

        expect(res.body.message).to.be.eq("user profile")
    })



    it('should return message update profile successfully', async () => {
        const res = await request.patch('/profile')
        .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjM3LCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE3MDk0ODA4MTl9.SpIDBY6_ZmnAfO9X3o6PPahQKglQ_H2mQC7ye12fDj0', {
            type: "bearer"
        })
        .send('fullName=alessia&password=123')

        // tidak bisa seperti ini!
        // .send({
        //     fullName: 'alessia',
        //     Password: '123'
        // })


        expect(res.body.message).to.be.eq("update profile successfully")
    })
})