const { describe, before, it } = require('mocha')
const { expect } = require('chai')
const supertest = require('supertest')
const app = require('../../../..')

const request = supertest(app)

describe('/admin/product endpoint testing', () => {
  let productRatingId = ''
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

  describe('list all productRatings', () => {
    it('should return message List all productRatings', async () => {
      const res = await request.get('/admin/product-ratings?order=tidak ada')
        .auth(adminToken, {
          type: 'bearer'
        })

      lastPage = res.body.pageInfo.totalPage
      expect(res.body.message).to.be.eq('List all productRatings')
    })

    it('should return message Forbidden access', async () => {
      const res = await request.get('/admin/product-ratings?order=tidak ada')
        .auth(userToken, {
          type: 'bearer'
        })

      expect(res.body.message).to.be.eq('Forbidden access')
    })

    it('should return message invalid token', async () => {
      const res = await request.get('/admin/product-ratings?order=tidak ada')
        .auth(userToken)

      expect(res.body.message).to.be.eq('invalid token')
    })

    it('should return message Unauthorized', async () => {
      const res = await request.get('/admin/product-ratings?order=tidak ada')
      expect(res.body.message).to.be.eq('Unauthorized')
    })

    it('should return message data productRatings not found', async () => {
      const res = await request.get('/admin/product-ratings?page=2026')
        .auth(adminToken, {
          type: 'bearer'
        })

      expect(res.body.message).to.be.eq('data productRatings not found')
    })

    it('should return nextPage null', async () => {
      const res = await request.get(`/admin/product-ratings?page=${lastPage}`)
        .auth(adminToken, {
          type: 'bearer'
        })

      expect(res.body.pageInfo.nextPage).to.be.null
    })

    it('should return prevPage null', async () => {
      const res = await request.get('/admin/product-ratings?page=1')
        .auth(adminToken, {
          type: 'bearer'
        })

      expect(res.body.pageInfo.prevPage).to.be.null
    })

    it('should return message column tidak ada does not exist', async () => {
      const res = await request.get('/admin/product-ratings?sortBy=tidak ada')
        .auth(adminToken, {
          type: 'bearer'
        })

      expect(res.body.message).to.be.eq('column tidak ada does not exist')
    })
  })

  describe('create product', () => {
    it('should return message create productRating successfully', async () => {
      form.append('productId', '1')
      form.append('userId', '466')
      form.append('rate', '4')
      form.append('reviewMessage', 'unit test')

      const res = await request.post('/admin/product-ratings')
        .auth(adminToken, {
          type: 'bearer'
        })
        .send(form.toString())

      productRatingId = res.body.results.id
      expect(res.body.message).to.be.eq('create productRating successfully')
    })

    it('should return message not present', async () => {
      form.set('productId', '2026')

      const res = await request.post('/admin/product-ratings')
        .auth(adminToken, {
          type: 'bearer'
        })
        .send(form.toString())

      expect(res.body.message).to.be.eq('data with productId 2026 is not present in table products')
    })

    it('should return message productId cannot be empty', async () => {
      form.delete('productId')

      const res = await request.post('/admin/product-ratings')
        .auth(adminToken, {
          type: 'bearer'
        })
        .send()

      expect(res.body.message).to.be.eq('productId cannot be empty')
    })
  })

  describe('detail product', () => {
    it('should return message detail product', async () => {
      const res = await request.get(`/admin/product-ratings/${productRatingId}`)
        .auth(adminToken, {
          type: 'bearer'
        })

      expect(res.body.message).to.be.eq('detail productRating')
    })

    it('should return message invalid input syntax for type integer: x', async () => {
      const res = await request.get('/admin/product-ratings/x')
        .auth(adminToken, {
          type: 'bearer'
        })

      expect(res.body.message).to.be.eq('invalid input syntax for type integer: x')
    })

    it('should return message productRating with id 2026 not found', async () => {
      const res = await request.get('/admin/product-ratings/2026')
        .auth(adminToken, {
          type: 'bearer'
        })

      expect(res.body.message).to.be.eq('productRating with id 2026 not found')
    })
  })

  describe('update product', () => {
    it('should return message update productRating successfully', async () => {
      form.set('rate', 5)

      const res = await request.patch(`/admin/product-ratings/${productRatingId}`)
        .auth(adminToken, {
          type: 'bearer'
        })
        .send(form.toString())

      expect(res.body.message).to.be.eq('update productRating successfully')
    })

    it('should return message productRating with id 2026 not found', async () => {
      const res = await request.patch('/admin/product-ratings/2026')
        .auth(adminToken, {
          type: 'bearer'
        })
        .send(form.toString())

      expect(res.body.message).to.be.eq('productRating with id 2026 not found')
    })

    it('should return message invalid input syntax for type integer: x', async () => {
      form.set('rate', 'x')

      const res = await request.patch(`/admin/product-ratings/${productRatingId}`)
        .auth(adminToken, {
          type: 'bearer'
        })
        .send(form.toString())

      expect(res.body.message).to.be.eq('invalid input syntax for type integer: x')
    })

    it('should return message column tidakAda of relation productRatings does not exist', async () => {
      form.append('tidakAda', 'update')

      const res = await request.patch(`/admin/product-ratings/${productRatingId}`)
        .auth(adminToken, {
          type: 'bearer'
        })
        .send(form.toString())

      expect(res.body.message).to.be.eq('column tidakAda of relation productRatings does not exist')
    })

    it('should return message No data has been modified', async () => {
      form.delete('rate')
      form.delete('tidakAda')
      form.delete('productId')
      form.delete('reviewMessage')
      form.delete('userId')

      const res = await request.patch(`/admin/product-ratings/${productRatingId}`)
        .auth(adminToken, {
          type: 'bearer'
        })
        .send(form.toString())

      expect(res.body.message).to.be.eq('No data has been modified')
    })
  })

  describe('delete product', () => {
    it('should return message delete productRating successfully', async () => {
      const res = await request.delete(`/admin/product-ratings/${productRatingId}`)
        .auth(adminToken, {
          type: 'bearer'
        })

      expect(res.body.message).to.be.eq('delete productRating successfully')
    })

    it('should return message invalid input syntax for type integer: x', async () => {
      const res = await request.delete('/admin/product-ratings/x')
        .auth(adminToken, {
          type: 'bearer'
        })

      expect(res.body.message).to.be.eq('invalid input syntax for type integer: x')
    })

    it('should return message productRating with id 2026 not found', async () => {
      const res = await request.delete('/admin/product-ratings/2026')
        .auth(adminToken, {
          type: 'bearer'
        })

      expect(res.body.message).to.be.eq('productRating with id 2026 not found')
    })
  })
})
