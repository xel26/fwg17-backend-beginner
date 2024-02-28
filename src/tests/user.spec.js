const { describe, it } = require("mocha");
const { expect } = require("chai");


const userController = require('../controllers/admin/user.controller');

const req = {
    query: {}
}

const res = {
    status: (status) => {
        return res
    },
    json: (param) => {
        return param
    },
}

describe('list all users', () => {
    it('should return success true', async() => {
        const response = await userController.getAllUsers(req, res)
        expect(response.success).to.be.eq(true)
    })

    it('nextPage should be null', async() => {
        const req = {
            query: {
                page: '12'
            }
        }

        const response = await userController.getAllUsers(req, res)
        expect(response.pageInfo.nextPage).to.be.eq(null)
    })

    it('prevPage should be null', async() => {
        const req = {
            query: {
                page: '1'
            }
        }

        const response = await userController.getAllUsers(req, res)
        expect(response.pageInfo.prevPage).to.be.eq(null)
    })


    it('should return message no data found', async() => {
        const req = {
            query: {
                searchKey: 'tidak ada'
            }
        }

        const response = await userController.getAllUsers(req, res)
        expect(response.message).to.be.eq("no data found")
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


    it('should return success true if typeof sortby is object', async() => {
        const req = {
            query: {
                sortBy: ['id', 'fullName']
            }
        }

        const response = await userController.getAllUsers(req, res)
        expect(response.success).to.be.eq(true)
    })


    it('should return message column tidak ada does not exist if typeof sortby is object', async() => {
        const req = {
            query: {
                sortBy: ['id', 'tidak ada']
            }
        }

        const response = await userController.getAllUsers(req, res)
        expect(response.message).to.be.eq('column tidak ada does not exist')
    })
})





describe('details user', () => {
    const req = {
        params: {
            id: "466"
        }
    }

    it('should return success true', async() => {
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
})





describe('create user', () => {
    const req = {
        body: {
            fullName: "unit test",
            email: `unit.test${new Date().getTime()}@example.com`,
            password: "123",
            role: "customer"
        },
        file: {
            path: "https://res.cloudinary.com/dgtv2r5qh/image/upload/v1706328161/coffee-shop-be/users/ad373124-f0a6-4acc-a237-586a39e15e7c.jpg"
        }
    }

    // it('should return success true', async() => {
    //     const response = await userController.createUser(req, res)
    //     expect(response.success).to.be.eq(true)
    // })


    it('should return message role cannot be empty', async() => {
        const req = {
            body: {
                fullName: "unit test",
                email: "unit.test@example.com",
                password: "123",
            }
        }

        const response = await userController.createUser(req, res)
        expect(response.message).to.be.eq("role cannot be empty")
    })


    it('should return message email admin@example.com already registered', async() => {
        const req = {
            body: {
                fullName: "unit test",
                email: "admin@example.com",
                password: "123",
            }
        }

        const response = await userController.createUser(req, res)
        expect(response.message).to.be.eq("email admin@example.com already registered")
    })
})





describe('update user', () => {
    const req = {
        params: {
            id: "466"
        },
        body: {
            fullName: "shella di ganti",
        },
        // file: {
        //     path: "https://res.cloudinary.com/dgtv2r5qh/image/upload/v1706328161/coffee-shop-be/users/ad373124-f0a6-4acc-a237-586a39e15e7c.jpg"
        // }
    }

    it('should return success true', async() => {
        const response = await userController.updateUser(req, res)
        // console.log(response)
        expect(response.success).to.be.eq(true)
    })


    it('should return message user with id 4660 not found', async() => {
        const req = {
            params: {
                id: "4660"
            },
            body: {
                fullName: "shella di ganti"
            }
        }

        const response = await userController.updateUser(req, res)
        expect(response.message).to.be.eq("user with id 4660 not found")
    })


    it('should return message No data has been modified', async() => {
        const req = {
            params: {
                id: "466"
            },
            body: {}
        }

        const response = await userController.updateUser(req, res)
        expect(response.message).to.be.eq("No data has been modified")
    })


    it('should return success true when update password', async() => {
        const req = {
            params: {
                id: "466"
            },
            body: {
                password: "123"
            }
        }

        const response = await userController.updateUser(req, res)
        expect(response.success).to.be.eq(true)
    })


    it('should return message column tidakAda does not exist', async() => {
        const req = {
            params: {
                id: "466"
            },
            body: {
                tidakAda: "update"
            }
        }

        const response = await userController.updateUser(req, res)
        expect(response.message).to.be.eq("column tidakAda of relation users does not exist")
    })


    it('should return message email admin@example.com already registered', async() => {
        const req = {
            params: {
                id: "466"
            },
            body: {
                email: "admin@example.com"
            }
        }

        const response = await userController.updateUser(req, res)
        expect(response.message).to.be.eq("email admin@example.com already registered")
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
    const req = {
        params: {
            id: "524"
        },
    }

    // it('should return success true', async() => {
    //     const response = await userController.deleteUser(req, res)
    //     // console.log(response)
    //     expect(response.success).to.be.eq(true)
    // })


    it('should return message invalid input syntax for type integer: x', async() => {
        const req = {
            params: {
                id: "x"
            }
        }

        const response = await userController.deleteUser(req, res)
        expect(response.message).to.be.eq("invalid input syntax for type integer: x")
    })


    it('should return user with id 4660 not found', async() => {
        const req = {
            params: {
                id: "4660"
            }
        }

        const response = await userController.deleteUser(req, res)
        expect(response.message).to.be.eq("user with id 4660 not found")
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