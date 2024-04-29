const { describe, it, before, after } = require('mocha')
const { expect } = require('chai')

const profileController = require('../../controllers/profile.controller')
const userController = require('../../controllers/admin/user.controller')

const res = {
  status: (status) => {
    return res
  },
  json: (param) => {
    return param
  }
}

describe('profile', () => {
  let userId

  before(async () => {
    const req = {
      body: {
        fullName: 'unit test',
        email: `unit.test${new Date().getTime()}@example.com`,
        password: '123',
        role: 'customer'
      }
      // file: {
      //     path: "https://res.cloudinary.com/dgtv2r5qh/image/upload/v1706328161/coffee-shop-be/users/ad373124-f0a6-4acc-a237-586a39e15e7c.jpg"
      // }
    }

    const response = await userController.createUser(req, res)
    userId = response.results.id
  })

  after(async () => {
    const req = {
      params: {
        id: userId
      }
    }

    await userController.deleteUser(req, res)
  })

  describe('get profile', () => {
    it('should return message user profile', async () => {
      const req = {
        user: {
          id: userId
        }
      }

      const response = await profileController.getProfile(req, res)
      expect(response.message).to.be.eq('user profile')
    })

    it('should return message invalid input syntax for type integer: x', async () => {
      const req = {
        user: {
          id: 'x'
        }
      }

      const response = await profileController.getProfile(req, res)
      expect(response.message).to.be.eq('invalid input syntax for type integer: x')
    })

    it('should return message user with id 2026 not found', async () => {
      const req = {
        user: {
          id: 2026
        }
      }

      const response = await profileController.getProfile(req, res)
      expect(response.message).to.be.eq('user with id 2026 not found')
    })
  })

  describe('update profile', () => {
    it('should return message update profile successfully', async () => {
      const req = {
        user: {
          id: userId
        },
        body: {
          fullName: 'shella',
          password: '123'
        }
        // file: {
        //     path: "https://res.cloudinary.com/dgtv2r5qh/image/upload/v1706328161/coffee-shop-be/users/ad373124-f0a6-4acc-a237-586a39e15e7c.jpg"
        // }
      }

      const response = await profileController.updateProfile(req, res)
      expect(response.message).to.be.eq('update profile successfully')
    })

    it('should return message user with id 4660 not found', async () => {
      const req = {
        user: {
          id: 4660
        },
        body: {
          fullName: 'shella'
        }
      }

      const response = await profileController.updateProfile(req, res)
      expect(response.message).to.be.eq('user with id 4660 not found')
    })

    it('should return message No data has been modified', async () => {
      const req = {
        user: {
          id: userId
        },
        body: {}
      }

      const response = await profileController.updateProfile(req, res)
      expect(response.message).to.be.eq('No data has been modified')
    })

    it('should return message column tidakAda does not exist', async () => {
      const req = {
        user: {
          id: userId
        },
        body: {
          tidakAda: 'update'
        }
      }

      const response = await profileController.updateProfile(req, res)
      expect(response.message).to.be.eq('column tidakAda of relation users does not exist')
    })

    it('should return message email admin@example.com already exist', async () => {
      const req = {
        user: {
          id: userId
        },
        body: {
          email: 'admin@example.com'
        }
      }

      const response = await profileController.updateProfile(req, res)
      expect(response.message).to.be.eq('email admin@example.com already exist')
    })

    it('should return message invalid input syntax for type integer: x', async () => {
      const req = {
        user: {
          id: 'x'
        },
        body: {
          email: 'ganti.email@example.com'
        }
      }

      const response = await profileController.updateProfile(req, res)
      expect(response.message).to.be.eq('invalid input syntax for type integer: x')
    })
  })
})
