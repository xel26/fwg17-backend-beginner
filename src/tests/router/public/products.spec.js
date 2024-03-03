const { describe } = require("mocha");
const { expect } = require("chai");
const supertest = require("supertest")
const app = require('../../../../');

const request = supertest(app)

describe('/products endpoint testing', () => {
    it("should return message List all products", () => {
        request.get('/testimonial').end((err, res) =>{
        console.log(res, err)
        })
    })
})