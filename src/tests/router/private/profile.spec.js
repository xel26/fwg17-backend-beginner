const { describe, it, before } = require('mocha')
const { expect } = require('chai')
const supertest = require('supertest')
const app = require('../../../..')

const request = supertest(app)

describe('/profile endpoint testing', () => {
  let userToken = ''
  before(async () => {
    const form = new URLSearchParams({
      email: 'alessia.cara@mail.com',
      password: '123'
    })
    const res = await request
      .post('/login')
      .send(form.toString())
    userToken = res.body.results.token
  })

  it('should return message user profile', async () => {
    const res = await request.get('/profile')
      .auth(userToken, {
        type: 'bearer'
      })

    expect(res.body.message).to.be.eq('user profile')
  })

  it('should return message invalid token', async () => {
    const res = await request.get('/profile')
      .auth(userToken)

    expect(res.body.message).to.be.eq('invalid token')
  })

  it('should return message update profile successfully', async () => {
    const form = new URLSearchParams({
      fullName: 'alessia',
      password: '123'
    })

    const res = await request.patch('/profile')
      .auth(userToken, {
        type: 'bearer'
      })
      .send(form.toString())

    expect(res.body.message).to.be.eq('update profile successfully')
  })
})
