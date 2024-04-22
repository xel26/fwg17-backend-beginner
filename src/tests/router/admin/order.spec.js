const { describe, before, it } = require('mocha')
const { expect } = require('chai')
const supertest = require('supertest')
const app = require('../../../..')

const request = supertest(app)

describe('/admin/user endpoint testing', () => {
  let orderId = ''
  let adminToken = ''
  let userToken = ''
  let lastPage

  before(async () => {
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

  describe('list all orders', () => {
    it('should return message List all orders', async () => {
      const res = await request.get('/admin/orders?order=tidak ada')
        .auth(adminToken, {
          type: 'bearer'
        })

      lastPage = res.body.pageInfo.totalPage
      expect(res.body.message).to.be.eq('List all orders')
    })

    it('should return message Forbidden access', async () => {
      const res = await request.get('/admin/orders?order=tidak ada')
        .auth(userToken, {
          type: 'bearer'
        })

      expect(res.body.message).to.be.eq('Forbidden access')
    })

    it('should return message invalid token', async () => {
      const res = await request.get('/admin/orders?order=tidak ada')
        .auth(userToken)

      expect(res.body.message).to.be.eq('invalid token')
    })

    it('should return message Unauthorized', async () => {
      const res = await request.get('/admin/orders?order=tidak ada')
      expect(res.body.message).to.be.eq('Unauthorized')
    })

    it('should return message data orders not found', async () => {
      const res = await request.get('/admin/orders?page=2026')
        .auth(adminToken, {
          type: 'bearer'
        })

      expect(res.body.message).to.be.eq('data orders not found')
    })

    it('should return nextPage null', async () => {
      const res = await request.get(`/admin/orders?page=${lastPage}`)
        .auth(adminToken, {
          type: 'bearer'
        })

      expect(res.body.pageInfo.nextPage).to.be.null
    })

    it('should return prevPage null', async () => {
      const res = await request.get('/admin/orders?page=1')
        .auth(adminToken, {
          type: 'bearer'
        })

      expect(res.body.pageInfo.prevPage).to.be.null
    })

    it('should return message column tidak ada does not exist', async () => {
      const res = await request.get('/admin/orders?sortBy=tidak ada')
        .auth(adminToken, {
          type: 'bearer'
        })

      expect(res.body.message).to.be.eq('column tidak ada does not exist')
    })
  })

  describe('create order', () => {
    it('should return message create orders successfully', async () => {
      form.append('total', 1000)
      form.append('subtotal', 2000)
      form.append('tax', 100)
      form.append('deliveryFee', 5000)
      form.append('deliveryShipping', 'Dine In')
      form.append('deliveryAddress', 'unit test')
      form.append('fullName', 'unit test')
      form.append('email', 'test@example.com')

      const res = await request.post('/admin/orders')
        .auth(adminToken, {
          type: 'bearer'
        })
        .send(form.toString())

      orderId = res.body.results.id
      expect(res.body.message).to.be.eq('create order successfully')
    })
  })

  describe('detail order', () => {
    it('should return message detail user', async () => {
      const res = await request.get(`/admin/orders/${orderId}`)
        .auth(adminToken, {
          type: 'bearer'
        })

      expect(res.body.message).to.be.eq('detail order')
    })

    it('should return message invalid input syntax for type integer: x', async () => {
      const res = await request.get('/admin/orders/x')
        .auth(adminToken, {
          type: 'bearer'
        })

      expect(res.body.message).to.be.eq('invalid input syntax for type integer: x')
    })

    it('should return message orders with id 2026 not found', async () => {
      const res = await request.get('/admin/orders/2026')
        .auth(adminToken, {
          type: 'bearer'
        })

      expect(res.body.message).to.be.eq('order with id 2026 not found')
    })
  })

  describe('update order', () => {
    it('should return message update orders successfully', async () => {
      form.set('total', 5000)

      const res = await request.patch(`/admin/orders/${orderId}`)
        .auth(adminToken, {
          type: 'bearer'
        })
        .send(form.toString())

      expect(res.body.message).to.be.eq('update order successfully')
    })

    it('"should return message already exist"', async () => {
      form.set('orderNumber', '240301943')

      const res = await request.patch(`/admin/orders/${orderId}`)
        .auth(adminToken, {
          type: 'bearer'
        })
        .send(form.toString())

      expect(res.body.message).to.be.eq('orderNumber 240301943 already exist')
    })

    it('should return message orders with id 2026 not found', async () => {
      const res = await request.patch('/admin/orders/2026')
        .auth(adminToken, {
          type: 'bearer'
        })
        .send(form.toString())

      expect(res.body.message).to.be.eq('order with id 2026 not found')
    })

    it('should return message No data has been modified', async () => {
      form.delete('total')
      form.delete('subtotal')
      form.delete('tax')
      form.delete('deliveryFee')
      form.delete('deliveryShipping')
      form.delete('deliveryAddress')
      form.delete('fullName')
      form.delete('email')
      form.delete('orderNumber')

      const res = await request.patch(`/admin/orders/${orderId}`)
        .auth(adminToken, {
          type: 'bearer'
        })
        .send(form.toString())

      expect(res.body.message).to.be.eq('No data has been modified')
    })

    it('should return message column tidakAda of relation orders does not exist', async () => {
      form.append('tidakAda', 'update')

      const res = await request.patch(`/admin/orders/${orderId}`)
        .auth(adminToken, {
          type: 'bearer'
        })
        .send(form.toString())

      expect(res.body.message).to.be.eq('column tidakAda of relation orders does not exist')
    })
  })

  describe('delete orders', () => {
    it('should return message delete orders successfully', async () => {
      const res = await request.delete(`/admin/orders/${orderId}`)
        .auth(adminToken, {
          type: 'bearer'
        })

      expect(res.body.message).to.be.eq('delete order successfully')
    })

    it('should return message invalid input syntax for type integer: x', async () => {
      const res = await request.delete('/admin/orders/x')
        .auth(adminToken, {
          type: 'bearer'
        })

      expect(res.body.message).to.be.eq('invalid input syntax for type integer: x')
    })

    it('should return message orders with id 2026 not found', async () => {
      const res = await request.delete('/admin/orders/2026')
        .auth(adminToken, {
          type: 'bearer'
        })

      expect(res.body.message).to.be.eq('order with id 2026 not found')
    })
  })
})
