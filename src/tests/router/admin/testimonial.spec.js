const { describe, before, it } = require('mocha')
const { expect } = require('chai')
const supertest = require('supertest')
const app = require('../../../..')

const request = supertest(app)

describe('/admin/testimonial endpoint testing', () => {
  let testimonialId = ''
  let adminToken = ''
  let testimonialToken = ''
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
    testimonialToken = res2.body.results.token
  })

  const form = new URLSearchParams({
    fullName: '',
    role: '',
    feedback: '',
    rate: ''
  })

  describe('list all testimonial', () => {
    it('should return message List all testimonial', async () => {
      const res = await request.get('/admin/testimonial?order=tidak ada')
        .auth(adminToken, {
          type: 'bearer'
        })

      lastPage = res.body.pageInfo.totalPage
      expect(res.body.message).to.be.eq('List all testimonial')
    })

    it('should return message Forbidden access', async () => {
      const res = await request.get('/admin/testimonial?order=tidak ada')
        .auth(testimonialToken, {
          type: 'bearer'
        })

      expect(res.body.message).to.be.eq('Forbidden access')
    })

    it('should return message invalid token', async () => {
      const res = await request.get('/admin/testimonial?order=tidak ada')
        .auth(testimonialToken)

      expect(res.body.message).to.be.eq('invalid token')
    })

    it('should return message Unauthorized', async () => {
      const res = await request.get('/admin/testimonial?order=tidak ada')
      expect(res.body.message).to.be.eq('Unauthorized')
    })

    it('should return message data testimonial not found', async () => {
      const res = await request.get('/admin/testimonial?searchKey=tidak ada')
        .auth(adminToken, {
          type: 'bearer'
        })

      expect(res.body.message).to.be.eq('data testimonial not found')
    })

    it('should return nextPage null', async () => {
      const res = await request.get(`/admin/testimonial?page=${lastPage}`)
        .auth(adminToken, {
          type: 'bearer'
        })

      expect(res.body.pageInfo.nextPage).to.be.null
    })

    it('should return prevPage null', async () => {
      const res = await request.get('/admin/testimonial?page=1')
        .auth(adminToken, {
          type: 'bearer'
        })

      expect(res.body.pageInfo.prevPage).to.be.null
    })

    it('should return message column tidak ada does not exist', async () => {
      const res = await request.get('/admin/testimonial?sortBy=tidak ada')
        .auth(adminToken, {
          type: 'bearer'
        })

      expect(res.body.message).to.be.eq('column tidak ada does not exist')
    })
  })

  describe('create testimonial', () => {
    it('should return message create testimonial successfully', async () => {
      form.set('fullName', 'unit test')
      form.set('role', 'test')
      form.set('feedback', 'example')
      form.set('rate', '5')

      const res = await request.post('/admin/testimonial')
        .auth(adminToken, {
          type: 'bearer'
        })
        .send(form.toString())

      testimonialId = res.body.results.id
      expect(res.body.message).to.be.eq('create testimonial successfully')
    })

    it('should return message fullName cannot be empty', async () => {
      form.delete('fullName')

      const res = await request.post('/admin/testimonial')
        .auth(adminToken, {
          type: 'bearer'
        })
        .send()

      expect(res.body.message).to.be.eq('fullName cannot be empty')
    })
  })

  describe('detail testimonial', () => {
    it('should return message detail testimonial', async () => {
      const res = await request.get(`/admin/testimonial/${testimonialId}`)
        .auth(adminToken, {
          type: 'bearer'
        })

      expect(res.body.message).to.be.eq('detail testimonial')
    })

    it('should return message invalid input syntax for type integer: x', async () => {
      const res = await request.get('/admin/testimonial/x')
        .auth(adminToken, {
          type: 'bearer'
        })

      expect(res.body.message).to.be.eq('invalid input syntax for type integer: x')
    })

    it('should return message testimonial with id 2026 not found', async () => {
      const res = await request.get('/admin/testimonial/2026')
        .auth(adminToken, {
          type: 'bearer'
        })

      expect(res.body.message).to.be.eq('testimonial with id 2026 not found')
    })
  })

  describe('update testimonial', () => {
    it('should return message update testimonial successfully', async () => {
      form.set('fullName', 'unit test')
      form.set('role', 'test')
      form.set('feedback', 'example')
      form.set('rate', '5')

      const res = await request.patch(`/admin/testimonial/${testimonialId}`)
        .auth(adminToken, {
          type: 'bearer'
        })
        .send(form.toString())

      expect(res.body.message).to.be.eq('update testimonial successfully')
    })

    it('should return message testimonial with id 2026 not found', async () => {
      const res = await request.patch('/admin/testimonial/2026')
        .auth(adminToken, {
          type: 'bearer'
        })
        .send(form.toString())

      expect(res.body.message).to.be.eq('testimonial with id 2026 not found')
    })

    it('should return message No data has been modified', async () => {
      form.delete('fullName')
      form.delete('role')
      form.delete('feedback')
      form.delete('rate')

      const res = await request.patch(`/admin/testimonial/${testimonialId}`)
        .auth(adminToken, {
          type: 'bearer'
        })
        .send(form.toString())

      expect(res.body.message).to.be.eq('No data has been modified')
    })

    it('should return message column tidakAda of relation testimonial does not exist', async () => {
      form.append('tidakAda', 'update')

      const res = await request.patch(`/admin/testimonial/${testimonialId}`)
        .auth(adminToken, {
          type: 'bearer'
        })
        .send(form.toString())

      expect(res.body.message).to.be.eq('column tidakAda of relation testimonial does not exist')
    })
  })

  describe('delete testimonial', () => {
    it('should return message delete testimonial successfully', async () => {
      const res = await request.delete(`/admin/testimonial/${testimonialId}`)
        .auth(adminToken, {
          type: 'bearer'
        })

      expect(res.body.message).to.be.eq('delete testimonial successfully')
    })

    it('should return message invalid input syntax for type integer: x', async () => {
      const res = await request.delete('/admin/testimonial/x')
        .auth(adminToken, {
          type: 'bearer'
        })

      expect(res.body.message).to.be.eq('invalid input syntax for type integer: x')
    })

    it('should return message testimonial with id 2026 not found', async () => {
      const res = await request.delete('/admin/testimonial/2026')
        .auth(adminToken, {
          type: 'bearer'
        })

      expect(res.body.message).to.be.eq('testimonial with id 2026 not found')
    })
  })
})
