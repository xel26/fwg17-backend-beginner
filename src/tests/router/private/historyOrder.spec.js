const { describe, it, before } = require('mocha')
const { expect } = require('chai')
const supertest = require('supertest')
const app = require('../../../..')

const request = supertest(app)

describe('history order', () => {
  let userToken = ''
  let lastPage

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

  describe('/history-order endpoint testing', () => {
    it('should return message List all history order', async () => {
      const res = await request.get('/history-order').auth(userToken, {
        type: 'bearer'
      })

      lastPage = res.body.pageInfo.totalPage
      expect(res.body.message).to.be.eq('List all history order')
    })

    it('should return message data history order not found', async () => {
      const res = await request
        .get('/history-order?status=tidak ada')
        .auth(userToken, {
          type: 'bearer'
        })

      expect(res.body.message).to.be.eq('data history order not found')
    })

    it('should return nextPage null', async () => {
      const res = await request.get(`/history-order?page=${lastPage}`).auth(userToken, {
        type: 'bearer'
      })

      expect(res.body.pageInfo.nextPage).to.be.null
    })

    it('should return prevPage null', async () => {
      const res = await request.get('/history-order?page=1').auth(userToken, {
        type: 'bearer'
      })

      expect(res.body.pageInfo.prevPage).to.be.null
    })
  })

  describe('/history-order/:id endpoint testing', () => {
    it('should return message detail history order', async () => {
      const res = await request.get('/history-order/481')
        .auth(userToken, {
          type: 'bearer'
        })

      expect(res.body.message).to.be.eq('detail history order')
    })

    it('should return message invalid input syntax for type integer: x', async () => {
      const res = await request.get('/history-order/x')
        .auth(userToken, {
          type: 'bearer'
        })

      expect(res.body.message).to.be.eq('invalid input syntax for type integer: x')
    })

    it('should return message user with id 237 does not have an order with id 2026', async () => {
      const res = await request.get('/history-order/2026')
        .auth(userToken, {
          type: 'bearer'
        })

      expect(res.body.message).to.be.eq('user with id 237 does not have an order with id 2026')
    })
  })

  describe('/history-order/products endpoint testing', () => {
    it('should return message list all history order products', async () => {
      const res = await request.get('/history-order/products?orderId=481')
        .auth(userToken, {
          type: 'bearer'
        })

      expect(res.body.message).to.be.eq('list all history order products')
    })

    it('should return message invalid input syntax for type integer: x', async () => {
      const res = await request.get('/history-order/products?orderId=x')
        .auth(userToken, {
          type: 'bearer'
        })

      expect(res.body.message).to.be.eq('invalid input syntax for type integer: x')
    })

    it('should return message data history order products not found', async () => {
      const res = await request.get('/history-order/products?orderId=2026')
        .auth(userToken, {
          type: 'bearer'
        })

      expect(res.body.message).to.be.eq('data history order products not found')
    })
  })
})
