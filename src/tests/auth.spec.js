const { describe, it } = require("mocha");
const { expect } = require("chai");


const authController = require('../controllers/auth.controller');

const res = {
    status: (status) => {
        return res
    },
    json: (param) => {
        return param
    },
}

describe("register", () => {
    const req = {
        body: {
            fullName: "unit test",
            email: `unit.test${new Date().getTime()}@example.com`,
            password: "123"
        }
    }

    it("should return success true", async () => {
        const response = await authController.register(req, res)
        expect(response.success).to.be.eq(true)
    })

    

    it('should return message email admin@example.com already registered. . . please login', async() => {
        const req = {
            body: {
                fullName: "unit test",
                email: "admin@example.com",
                password: "123",
            }
        }

        const response = await authController.register(req, res)
        expect(response.message).to.be.eq("email admin@example.com already registered. . . please login")
    })

    

    it('should return message Full Name cannot be empty', async() => {
        const req = {
            body: {
                email: "admin@example.com",
                password: "123",
            }
        }

        const response = await authController.register(req, res)
        expect(response.message).to.be.eq("Full Name cannot be empty")
    })

    

    it('should return message email cannot be empty', async() => {
        const req = {
            body: {
                fullName: "unit test",
                password: "123",
            }
        }

        const response = await authController.register(req, res)
        expect(response.message).to.be.eq("email cannot be empty")
    })

    

    it('should return message password cannot be empty', async() => {
        const req = {
            body: {
                fullName: "unit test",
                email: "unit.test@example.com"
            }
        }

        const response = await authController.register(req, res)
        expect(response.message).to.be.eq("password cannot be empty")
    })
})





describe('login', () => {
    it("should return success true", async () => {
        const req = {
            body: {
                email: "alessia.cara@mail.com",
                password: "123"
            }
        }

        const response = await authController.login(req, res)
        expect(response.success).to.be.eq(true)
    })


    
    it("should return message please enter your email", async () => {
        const req = {
            body: {
                password: "123"
            }
        }
        const response = await authController.login(req, res)
        expect(response.message).to.be.eq("please enter your email")
    })



    it("should return message email not registered. . . please sign up to create new account", async () => {
        const req = {
            body: {
                email: "tidak.terdaftar@example.com",
                password: "123"
            }
        }
        const response = await authController.login(req, res)
        expect(response.message).to.be.eq("email not registered. . . please sign up to create new account")
    })



    it("should return message please enter your password", async () => {
        const req = {
            body: {
                email: "alessia.cara@mail.com"
            }
        }
        const response = await authController.login(req, res)
        expect(response.message).to.be.eq("please enter your password")
    })



    it("should return message wrong password. . . please try again", async () => {
        const req = {
            body: {
                email: "alessia.cara@mail.com",
                password: "1"
            }
        }

        const response = await authController.login(req, res)
        expect(response.message).to.be.eq("wrong password. . . please try again")
    })
})





describe('forgotPassword', () => {
    it('should return message OTP has been sent to your email', async () => {
        const req = {
            body: {
                email: "shellaananda2636@gmail.com"
            }
        }
        const response = await authController.forgotPassword(req, res)
        expect(response.message).to.be.eq("OTP has been sent to your email")
    })





    it('should return message email not registered. . . . please use another email', async () => {
        const req = {
            body: {
                email: "tidak.terdaftar@example.com"
            }
        }
        const response = await authController.forgotPassword(req, res)
        expect(response.message).to.be.eq("email not registered. . . . please use another email")
    })





    it('should return message invalid OTP code. . . please enter the correct code', async () => {
        const req = {
            body:{
                otp: "1",
            }
        }
        const response = await authController.forgotPassword(req, res)
        expect(response.message).to.be.eq("invalid OTP code. . . please enter the correct code")
    })





    it('should return message create new password success', async () => {
        const req = {
            body: {
                otp: "717729",
                newPassword: "123"
            }
        }
        const response = await authController.forgotPassword(req, res)
        expect(response.message).to.be.eq("create new password for shellaananda2636@gmail.com success")
    })
})