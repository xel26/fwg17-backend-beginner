const { describe, it } = require("mocha");
const { expect } = require("chai");


const userController = require('../../controllers/admin/user.controller');
const userModel = require('../../models/user.model')

const res = {
    status: (status) => {
        return res
    },
    json: (param) => {
        return param
    },
}

let userId

describe('list all users', () => {
    let lastPage

    it('should return message List all users', async() => {
        const req = {
            query: {
                order: "tidak ada"
            }
        }
        const response = await userController.getAllUsers(req, res)
        lastPage = response.pageInfo.totalPage
        expect(response.message).to.be.eq("List all users")
    })


    it('should return message data users not found', async() => {
        const req = {
            query: {
                searchKey: 'tidak ada'
            }
        }

        const response = await userController.getAllUsers(req, res)
        expect(response.message).to.be.eq("data users not found")
    })
    


    it("should return nextPage null", async () => {
        const req = {
            query: {
                page: lastPage
            },
        }

        const response = await userController.getAllUsers(req, res)
        expect(response.pageInfo.nextPage).to.be.null
    })



    it("should return prevPage null", async () => {
        const req = {
            query: {
                page: 1
            },
        }

        const response = await userController.getAllUsers(req, res)
        expect(response.pageInfo.prevPage).to.be.null
    })



    it('should return message column tidak ada does not exist', async() => {
        const req = {
            query: {
                sortBy: 'tidak ada'
            }
        }

        const response = await userController.getAllUsers(req, res)
        expect(response.message).to.be.eq('column tidak ada does not exist')
    })
})




describe('create user', () => {
    it('should return message create user successfully', async() => {
        const req = {
            body: {
                fullName: "unit test",
                email: `unit.test${new Date().getTime()}@example.com`,
                password: "123",
                role: "customer"
            },
            // file: {
            //     path: "https://res.cloudinary.com/dgtv2r5qh/image/upload/v1706328161/coffee-shop-be/users/ad373124-f0a6-4acc-a237-586a39e15e7c.jpg"
            // }
        }

        const response = await userController.createUser(req, res)
        userId = response.results.id
        expect(response.message).to.be.eq("create user successfully")
    })


    it('should return message fullName cannot be empty', async() => {
        const req = {
            body: {
                fullName: undefined,
                email: undefined,
                password: undefined,
                role: undefined
            }
        }

        const response = await userController.createUser(req, res)
        expect(response.message).to.be.eq("fullName cannot be empty")
    })


    it('should return message email admin@example.com already exist', async() => {
        const req = {
            body: {
                fullName: "unit test",
                email: "admin@example.com",
                password: "123",
                role: "customer"
            }
        }

        const response = await userController.createUser(req, res)
        expect(response.message).to.be.eq("email admin@example.com already exist")
    })
})




describe('details user', () => {
    it('should return success true', async() => {
        const req = {
            params: {
                id: userId
            }
        }

        
        const response = await userController.getDetailUser(req, res)
        expect(response.success).to.be.eq(true)
    })

    

    it('should return message invalid input syntax for type integer: x', async() => {
        const req = {
            params: {
                id: "x"
            }
        }

        const response = await userController.getDetailUser(req, res)
        expect(response.message).to.be.eq("invalid input syntax for type integer: x")
    })


    it('should return message user with id 4660 not found', async() => {
        const req = {
            params: {
                id: "4660"
            }
        }

        const response = await userController.getDetailUser(req, res)
        expect(response.message).to.be.eq("user with id 4660 not found")
    })

    it('should return object', async() => {
        const response = await userModel.findOneByEmail("admin@example.com")
        expect(typeof response).to.be.eq('object')
    })
})




describe('update user', () => {
    it('should return message update user successfully', async() => {
        const req = {
            params: {
                id: userId
            },
            body: {
                fullName: "shella",
                password: "123"
            },
            // file: {
            //     path: "https://res.cloudinary.com/dgtv2r5qh/image/upload/v1706328161/coffee-shop-be/users/ad373124-f0a6-4acc-a237-586a39e15e7c.jpg"
            // }
        }

        const response = await userController.updateUser(req, res)
        expect(response.message).to.be.eq("update user successfully")
    })


    it('should return message user with id 2026 not found', async() => {
        const req = {
            params: {
                id: "2026"
            },
            body: {
                fullName: "shella di ganti"
            }
        }

        const response = await userController.updateUser(req, res)
        expect(response.message).to.be.eq("user with id 2026 not found")
    })


    it('should return message No data has been modified', async() => {
        const req = {
            params: {
                id: userId
            },
            body: {}
        }

        const response = await userController.updateUser(req, res)
        expect(response.message).to.be.eq("No data has been modified")
    })


    it('should return message column tidakAda does not exist', async() => {
        const req = {
            params: {
                id: userId
            },
            body: {
                tidakAda: "update"
            }
        }

        const response = await userController.updateUser(req, res)
        expect(response.message).to.be.eq("column tidakAda of relation users does not exist")
    })


    it('should return message email admin@example.com already exist', async() => {
        const req = {
            params: {
                id: userId
            },
            body: {
                email: "admin@example.com"
            }
        }

        const response = await userController.updateUser(req, res)
        expect(response.message).to.be.eq("email admin@example.com already exist")
    })


    it('should return message invalid input syntax for type integer: x', async() => {
        const req = {
            params: {
                id: "x"
            },
            body: {
                email: "ganti.email@example.com"
            }
        }

        const response = await userController.updateUser(req, res)
        expect(response.message).to.be.eq("invalid input syntax for type integer: x")
    })
})





describe('delete user', () => {
    it('should return message delete user successfully', async() => {
        const req = {
            params: {
                id: userId
            },
        }

        const response = await userController.deleteUser(req, res)
        expect(response.message).to.be.eq("delete user successfully")
    })


    it('should return message invalid input syntax for type integer: x', async() => {
        const req = {
            params: {
                id: "x"
            }
        }

        const response = await userController.deleteUser(req, res)
        expect(response.message).to.be.eq("invalid input syntax for type integer: x")
    })


    it('should return user with id 2026 not found', async() => {
        const req = {
            params: {
                id: "2026"
            }
        }

        const response = await userController.deleteUser(req, res)
        expect(response.message).to.be.eq("user with id 2026 not found")
    })


    it('should return message data with id 237 is still referenced from table orders', async() => {
        const req = {
            params: {
                id: "237"
            }
        }

        const response = await userController.deleteUser(req, res)
        expect(response.message).to.be.eq("data with id 237 is still referenced from table orders")
    })
})