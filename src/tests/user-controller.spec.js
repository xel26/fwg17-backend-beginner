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


    it('should return no data found', async() => {
        const req = {
            query: {
                searchKey: 'tidak ada'
            }
        }

        const response = await userController.getAllUsers(req, res)
        console.log(response) // ==> undefined !
    })
})





describe('details user', () => {
    const req = {
        params: {
            id: 466
        }
    }

    it('should return success true', async() => {
        const response = await userController.getDetailUser(req, res)
        expect(response.success).to.be.eq(true)
    })


    it('should throw not found', async() => {
        const req = {
            params: {
                id: 4660
            }
        }

        const response = await userController.getDetailUser(req, res)
        console.log(response) // ==> undefined !
    })
})





describe('create user', () => {
    const req = {
        body: {
            fullName: "unit test",
            email: "unit.test@example.com",
            password: "123",
            role: "customer"
        }
    }

    it('should return success true', async() => {
        const response = await userController.createUser(req, res)
        expect(response.success).to.be.eq(true)
    })


    it('should return role cannot be empty', async() => {
        const req = {
            body: {
                fullName: "unit test",
                email: "unit.test@example.com",
                password: "123",
            }
        }

        const response = await userController.createUser(req, res)
        console.log(response) // ==> undefined !
    })
})





describe('update user', () => {
    const req = {
        params: {
            id: 466
        },
        body: {
            fullName: "shella di ganti"
        }
    }

    it('should return success true', async() => {
        const response = await userController.updateUser(req, res)
        expect(response.success).to.be.eq(true)
    })
})





describe('delete user', () => {
    const req = {
        params: {
            id: 467
        },
    }

    it('should return success true', async() => {
        const response = await userController.deleteUser(req, res)
        expect(response.success).to.be.eq(true)
    })

    it('should throw not found', async() => {
        const req = {
            params: {
                id: 4670
            }
        }

        const response = await userController.deleteUser(req, res)
        console.log(response) // ==> undefined !
    })
})