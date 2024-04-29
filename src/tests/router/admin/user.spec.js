const { describe, before, it } = require('mocha')
const { expect } = require('chai')
const supertest = require('supertest')
const app = require('../../../..')

const request = supertest(app)

describe('/admin/user endpoint testing', () => {
  let userId = ''
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
    fullName: '',
    email: '',
    password: '',
    role: ''
  })

  describe('list all users', () => {
    it('should return message List all users', async () => {
      const res = await request.get('/admin/users?order=tidak ada')
        .auth(adminToken, {
          type: 'bearer'
        })

      lastPage = res.body.pageInfo.totalPage
      expect(res.body.message).to.be.eq('List all users')
    })

    it('should return message Forbidden access', async () => {
      const res = await request.get('/admin/users?order=tidak ada')
        .auth(userToken, {
          type: 'bearer'
        })

      expect(res.body.message).to.be.eq('Forbidden access')
    })

    it('should return message invalid token', async () => {
      const res = await request.get('/admin/users?order=tidak ada')
        .auth(userToken)

      expect(res.body.message).to.be.eq('invalid token')
    })

    it('should return message Unauthorized', async () => {
      const res = await request.get('/admin/users?order=tidak ada')
      expect(res.body.message).to.be.eq('Unauthorized')
    })

    it('should return message data users not found', async () => {
      const res = await request.get('/admin/users?searchKey=tidak ada')
        .auth(adminToken, {
          type: 'bearer'
        })

      expect(res.body.message).to.be.eq('data users not found')
    })

    it('should return nextPage null', async () => {
      const res = await request.get(`/admin/users?page=${lastPage}`)
        .auth(adminToken, {
          type: 'bearer'
        })

      expect(res.body.pageInfo.nextPage).to.be.null
    })

    it('should return prevPage null', async () => {
      const res = await request.get('/admin/users?page=1')
        .auth(adminToken, {
          type: 'bearer'
        })

      expect(res.body.pageInfo.prevPage).to.be.null
    })

    it('should return message column tidak ada does not exist', async () => {
      const res = await request.get('/admin/users?sortBy=tidak ada')
        .auth(adminToken, {
          type: 'bearer'
        })

      expect(res.body.message).to.be.eq('column tidak ada does not exist')
    })
  })

  describe('create user', () => {
    it('should return message create user successfully', async () => {
      form.set('fullName', 'unit test')
      form.set('email', `unit.test${new Date().getTime()}@example.com`)
      form.set('password', '123')
      form.set('role', 'customer')

      const res = await request.post('/admin/users')
        .auth(adminToken, {
          type: 'bearer'
        })
        .send(form.toString())

      userId = res.body.results.id
      expect(res.body.message).to.be.eq('create user successfully')
    })

    it('should return message email admin@example.com already exist', async () => {
      form.set('email', 'admin@example.com')

      const res = await request.post('/admin/users')
        .auth(adminToken, {
          type: 'bearer'
        })
        .send(form.toString())

      expect(res.body.message).to.be.eq('email admin@example.com already exist')
    })

    it('should return message fullName cannot be empty', async () => {
      form.delete('fullName')

      const res = await request.post('/admin/users')
        .auth(adminToken, {
          type: 'bearer'
        })
        .send()

      expect(res.body.message).to.be.eq('fullName cannot be empty')
    })
  })

  describe('detail user', () => {
    it('should return message detail user', async () => {
      const res = await request.get(`/admin/users/${userId}`)
        .auth(adminToken, {
          type: 'bearer'
        })

      expect(res.body.message).to.be.eq('detail user')
    })

    it('should return message invalid input syntax for type integer: x', async () => {
      const res = await request.get('/admin/users/x')
        .auth(adminToken, {
          type: 'bearer'
        })

      expect(res.body.message).to.be.eq('invalid input syntax for type integer: x')
    })

    it('should return message user with id 2026 not found', async () => {
      const res = await request.get('/admin/users/2026')
        .auth(adminToken, {
          type: 'bearer'
        })

      expect(res.body.message).to.be.eq('user with id 2026 not found')
    })
  })

  describe('update user', () => {
    it('should return message update user successfully', async () => {
      form.set('email', `unit.test${new Date().getTime()}@example.com`)
      form.set('fullName', 'new fullName')
      form.set('password', '123')

      const res = await request.patch(`/admin/users/${userId}`)
        .auth(adminToken, {
          type: 'bearer'
        })
        .send(form.toString())

      expect(res.body.message).to.be.eq('update user successfully')
    })

    it('should return message user with id 2026 not found', async () => {
      const res = await request.patch('/admin/users/2026')
        .auth(adminToken, {
          type: 'bearer'
        })
        .send(form.toString())

      expect(res.body.message).to.be.eq('user with id 2026 not found')
    })

    it('should return message email admin@example.com already exist', async () => {
      form.set('email', 'admin@example.com')

      const res = await request.patch(`/admin/users/${userId}`)
        .auth(adminToken, {
          type: 'bearer'
        })
        .send(form.toString())

      expect(res.body.message).to.be.eq('email admin@example.com already exist')
    })

    it('should return message No data has been modified', async () => {
      form.delete('fullName')
      form.delete('email')
      form.delete('password')
      form.delete('role')

      const res = await request.patch(`/admin/users/${userId}`)
        .auth(adminToken, {
          type: 'bearer'
        })
        .send(form.toString())

      expect(res.body.message).to.be.eq('No data has been modified')
    })

    it('should return message column tidakAda of relation users does not exist', async () => {
      form.append('tidakAda', 'update')

      const res = await request.patch(`/admin/users/${userId}`)
        .auth(adminToken, {
          type: 'bearer'
        })
        .send(form.toString())

      expect(res.body.message).to.be.eq('column tidakAda of relation users does not exist')
    })
  })

  describe('delete user', () => {
    it('should return message delete user successfully', async () => {
      const res = await request.delete(`/admin/users/${userId}`)
        .auth(adminToken, {
          type: 'bearer'
        })

      expect(res.body.message).to.be.eq('delete user successfully')
    })

    it('should return message invalid input syntax for type integer: x', async () => {
      const res = await request.delete('/admin/users/x')
        .auth(adminToken, {
          type: 'bearer'
        })

      expect(res.body.message).to.be.eq('invalid input syntax for type integer: x')
    })

    it('should return message data with id 237 is still referenced from table orders', async () => {
      const res = await request.delete('/admin/users/237')
        .auth(adminToken, {
          type: 'bearer'
        })

      expect(res.body.message).to.be.eq('data with id 237 is still referenced from table orders')
    })

    it('should return message user with id 2026 not found', async () => {
      const res = await request.delete('/admin/users/2026')
        .auth(adminToken, {
          type: 'bearer'
        })

      expect(res.body.message).to.be.eq('user with id 2026 not found')
    })
  })
})
