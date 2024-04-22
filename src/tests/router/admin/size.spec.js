const { describe, before, it } = require('mocha')
const { expect } = require('chai')
const supertest = require('supertest')
const app = require('../../../..')

const request = supertest(app)

describe('/admin/size endpoint testing', () => {
  let sizeId = ''
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

  const form = new URLSearchParams({
    size: ''
  })

  describe('list all sizes', () => {
    it('should return message List all sizes', async () => {
      const res = await request.get('/admin/size?order=tidak ada')
        .auth(adminToken, { type: 'bearer' })

      lastPage = res.body.pageInfo.totalPage
      expect(res.body.message).to.be.eq('List all sizes')
    })

    it('should return message Forbidden access', async () => {
      const res = await request.get('/admin/size?order=tidak ada')
        .auth(userToken, { type: 'bearer' })

      expect(res.body.message).to.be.eq('Forbidden access')
    })

    it('should return message Forbidden access', async () => {
      const res = await request.get('/admin/size?order=tidak ada')
        .auth(userToken)

      expect(res.body.message).to.be.eq('invalid token')
    })

    it('should return message Unauthorized', async () => {
      const res = await request.get('/admin/size?order=tidak ada')
      expect(res.body.message).to.be.eq('Unauthorized')
    })

    it('should return message data sizes not found', async () => {
      const res = await request.get('/admin/size?searchKey=tidak ada')
        .auth(adminToken, { type: 'bearer' })

      expect(res.body.message).to.be.eq('data sizes not found')
    })

    it('should return nextPage null', async () => {
      const res = await request.get(`/admin/size?page=${lastPage}`)
        .auth(adminToken, { type: 'bearer' })

      expect(res.body.pageInfo.nextPage).to.be.null
    })

    it('should return prevPage null', async () => {
      const res = await request.get('/admin/size?page=1')
        .auth(adminToken, { type: 'bearer' })

      expect(res.body.pageInfo.prevPage).to.be.null
    })

    it('should return message column tidak ada does not exist', async () => {
      const res = await request.get('/admin/size?sortBy=tidak ada')
        .auth(adminToken, { type: 'bearer' })

      expect(res.body.message).to.be.eq('column tidak ada does not exist')
    })
  })

  describe('create size', () => {
    it('should return message create size successfully', async () => {
      form.set('size', `${new Date().getTime()}`)

      const res = await request.post('/admin/size')
        .auth(adminToken, { type: 'bearer' })
        .send(form.toString())

      sizeId = res.body.results.id
      expect(res.body.message).to.be.eq('create size successfully')
    })

    it('should return message size regular already exist', async () => {
      form.set('size', 'regular')

      const res = await request.post('/admin/size')
        .auth(adminToken, { type: 'bearer' })
        .send(form.toString())

      expect(res.body.message).to.be.eq('size regular already exist')
    })

    it('should return message size cannot be empty', async () => {
      form.delete('size')

      const res = await request.post('/admin/size')
        .auth(adminToken, { type: 'bearer' })
        .send(form.toString())

      expect(res.body.message).to.be.eq('size cannot be empty')
    })
  })

  describe('detail size', () => {
    it('should return message detail size', async () => {
      const res = await request.get(`/admin/size/${sizeId}`)
        .auth(adminToken, { type: 'bearer' })

      expect(res.body.message).to.be.eq('detail size')
    })

    it('should return message invalid input syntax for type integer: x', async () => {
      const res = await request.get('/admin/size/x')
        .auth(adminToken, { type: 'bearer' })

      expect(res.body.message).to.be.eq('invalid input syntax for type integer: x')
    })

    it('should return message size with id 2026 not found', async () => {
      const res = await request.get('/admin/size/2026')
        .auth(adminToken, { type: 'bearer' })

      expect(res.body.message).to.be.eq('size with id 2026 not found')
    })
  })

  describe('update size', () => {
    it('should return message update size successfully', async () => {
      form.append('additionalPrice', 1000)

      const res = await request.patch(`/admin/size/${sizeId}`)
        .auth(adminToken, { type: 'bearer' })
        .send(form.toString())

      expect(res.body.message).to.be.eq('update size successfully')
    })

    it('should return message size regular already exist', async () => {
      form.delete('additionalPrice')
      form.set('size', 'regular')

      const res = await request.patch(`/admin/size/${sizeId}`)
        .auth(adminToken, { type: 'bearer' })
        .send(form.toString())

      expect(res.body.message).to.be.eq('size regular already exist')
    })

    it('should return message size with id 2026 not found', async () => {
      form.set('size', 'example')

      const res = await request.patch('/admin/size/2026')
        .auth(adminToken, { type: 'bearer' })
        .send(form.toString())

      expect(res.body.message).to.be.eq('size with id 2026 not found')
    })

    it('should return message No data has been modified', async () => {
      form.delete('size')

      const res = await request.patch(`/admin/size/${sizeId}`)
        .auth(adminToken, { type: 'bearer' })
        .send(form.toString())

      expect(res.body.message).to.be.eq('No data has been modified')
    })

    it('should return message column tidakAda of relation size does not exist', async () => {
      form.append('tidakAda', 'update')

      const res = await request.patch(`/admin/size/${sizeId}`)
        .auth(adminToken, { type: 'bearer' })
        .send(form.toString())

      expect(res.body.message).to.be.eq('column tidakAda of relation sizes does not exist')
    })
  })

  describe('delete size', () => {
    it('should return message delete size successfully', async () => {
      const res = await request.delete(`/admin/size/${sizeId}`)
        .auth(adminToken, { type: 'bearer' })

      expect(res.body.message).to.be.eq('delete size successfully')
    })

    it('should return message invalid input syntax for type integer: x', async () => {
      const res = await request.delete('/admin/size/x')
        .auth(adminToken, { type: 'bearer' })

      expect(res.body.message).to.be.eq('invalid input syntax for type integer: x')
    })

    it('should return message data with id 1 is still referenced from table orderDetails', async () => {
      const res = await request.delete('/admin/size/1')
        .auth(adminToken, { type: 'bearer' })

      expect(res.body.message).to.be.eq('data with id 1 is still referenced from table orderDetails')
    })

    it('should return message size with id 2026 not found', async () => {
      const res = await request.delete('/admin/size/2026')
        .auth(adminToken, { type: 'bearer' })

      expect(res.body.message).to.be.eq('size with id 2026 not found')
    })
  })
})
