const { describe, before, it } = require('mocha')
const { expect } = require('chai')
const supertest = require('supertest')
const app = require('../../../..')

const request = supertest(app)

describe('/admin/tag endpoint testing', () => {
  let tagId = ''
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
    name: ''
  })

  describe('list all tags', () => {
    it('should return message List all tags', async () => {
      const res = await request.get('/admin/tags?order=tidak ada')
        .auth(adminToken, {
          type: 'bearer'
        })

      lastPage = res.body.pageInfo.totalPage
      expect(res.body.message).to.be.eq('List all tags')
    })

    it('should return message Forbidden access', async () => {
      const res = await request.get('/admin/tags?order=tidak ada')
        .auth(userToken, {
          type: 'bearer'
        })

      expect(res.body.message).to.be.eq('Forbidden access')
    })

    it('should return message invalid token', async () => {
      const res = await request.get('/admin/tags?order=tidak ada')
        .auth(userToken)

      expect(res.body.message).to.be.eq('invalid token')
    })

    it('should return message Unauthorized', async () => {
      const res = await request.get('/admin/tags?order=tidak ada')
      expect(res.body.message).to.be.eq('Unauthorized')
    })

    it('should return message data tags not found', async () => {
      const res = await request.get('/admin/tags?searchKey=tidak ada')
        .auth(adminToken, {
          type: 'bearer'
        })

      expect(res.body.message).to.be.eq('data tags not found')
    })

    it('should return nextPage null', async () => {
      const res = await request.get(`/admin/tags?page=${lastPage}`)
        .auth(adminToken, {
          type: 'bearer'
        })

      expect(res.body.pageInfo.nextPage).to.be.null
    })

    it('should return prevPage null', async () => {
      const res = await request.get('/admin/tags?page=1')
        .auth(adminToken, {
          type: 'bearer'
        })

      expect(res.body.pageInfo.prevPage).to.be.null
    })

    it('should return message column tidak ada does not exist', async () => {
      const res = await request.get('/admin/tags?sortBy=tidak ada')
        .auth(adminToken, {
          type: 'bearer'
        })

      expect(res.body.message).to.be.eq('column tidak ada does not exist')
    })
  })

  describe('create tag', () => {
    it('should return message create tag successfully', async () => {
      form.set('name', `${new Date().getTime()}`)

      const res = await request.post('/admin/tags')
        .auth(adminToken, {
          type: 'bearer'
        })
        .send(form.toString())

      tagId = res.body.results.id
      expect(res.body.message).to.be.eq('create tag successfully')
    })

    it('should return message name flashsale! already exist', async () => {
      form.set('name', 'flashsale!')

      const res = await request.post('/admin/tags')
        .auth(adminToken, {
          type: 'bearer'
        })
        .send(form.toString())

      expect(res.body.message).to.be.eq('name flashsale! already exist')
    })

    it('should return message name cannot be empty', async () => {
      form.delete('name')

      const res = await request.post('/admin/tags')
        .auth(adminToken, {
          type: 'bearer'
        })
        .send()

      expect(res.body.message).to.be.eq('name cannot be empty')
    })
  })

  describe('detail tag', () => {
    it('should return message detail tag', async () => {
      const res = await request.get(`/admin/tags/${tagId}`)
        .auth(adminToken, {
          type: 'bearer'
        })

      expect(res.body.message).to.be.eq('detail tag')
    })

    it('should return message invalid input syntax for type integer: x', async () => {
      const res = await request.get('/admin/tags/x')
        .auth(adminToken, {
          type: 'bearer'
        })

      expect(res.body.message).to.be.eq('invalid input syntax for type integer: x')
    })

    it('should return message tag with id 2026 not found', async () => {
      const res = await request.get('/admin/tags/2026')
        .auth(adminToken, {
          type: 'bearer'
        })

      expect(res.body.message).to.be.eq('tag with id 2026 not found')
    })
  })

  describe('update tag', () => {
    it('should return message update tag successfully', async () => {
      form.set('name', 'new tag')

      const res = await request.patch(`/admin/tags/${tagId}`)
        .auth(adminToken, {
          type: 'bearer'
        })
        .send(form.toString())

      expect(res.body.message).to.be.eq('update tag successfully')
    })

    it('should return message tag with id 2026 not found', async () => {
      const res = await request.patch('/admin/tags/2026')
        .auth(adminToken, {
          type: 'bearer'
        })
        .send(form.toString())

      expect(res.body.message).to.be.eq('tag with id 2026 not found')
    })

    it('should return message name flashsale! already exist', async () => {
      form.set('name', 'flashsale!')

      const res = await request.patch(`/admin/tags/${tagId}`)
        .auth(adminToken, {
          type: 'bearer'
        })
        .send(form.toString())

      expect(res.body.message).to.be.eq('name flashsale! already exist')
    })

    it('should return message No data has been modified', async () => {
      form.delete('name')

      const res = await request.patch(`/admin/tags/${tagId}`)
        .auth(adminToken, {
          type: 'bearer'
        })
        .send(form.toString())

      expect(res.body.message).to.be.eq('No data has been modified')
    })

    it('should return message column tidakAda of relation tags does not exist', async () => {
      form.append('tidakAda', 'update')

      const res = await request.patch(`/admin/tags/${tagId}`)
        .auth(adminToken, {
          type: 'bearer'
        })
        .send(form.toString())

      expect(res.body.message).to.be.eq('column tidakAda of relation tags does not exist')
    })
  })

  describe('delete tag', () => {
    it('should return message delete tag successfully', async () => {
      const res = await request.delete(`/admin/tags/${tagId}`)
        .auth(adminToken, {
          type: 'bearer'
        })

      expect(res.body.message).to.be.eq('delete tag successfully')
    })

    it('should return message invalid input syntax for type integer: x', async () => {
      const res = await request.delete('/admin/tags/x')
        .auth(adminToken, {
          type: 'bearer'
        })

      expect(res.body.message).to.be.eq('invalid input syntax for type integer: x')
    })

    it('should return message data with id 1 is still referenced from table products', async () => {
      const res = await request.delete('/admin/tags/1')
        .auth(adminToken, {
          type: 'bearer'
        })

      expect(res.body.message).to.be.eq('data with id 1 is still referenced from table products')
    })

    it('should return message tag with id 2026 not found', async () => {
      const res = await request.delete('/admin/tags/2026')
        .auth(adminToken, {
          type: 'bearer'
        })

      expect(res.body.message).to.be.eq('tag with id 2026 not found')
    })
  })
})
