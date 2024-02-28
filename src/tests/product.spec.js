const { describe } = require("mocha");

const productController = require('../controllers/admin/product.controller');
const { expect } = require("chai");

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


describe("list all products", () => {
    it("should return success true", async () => {
        const response = await productController.getAllProducts(req, res)
        expect(response.success).to.be.eq(true)
    })



    it("should return message no data found", async () => {
        const req = {
            query: {
                searchKey: "tidak ada"
            }
        }

        const response = await productController.getAllProducts(req, res)
        expect(response.message).to.be.eq("no data found")
    })
})





describe("detail product", () => {
    const req = {
        params: {
            id: "1"
        }
    }

    it("should return success true", async () => {
        const response = await productController.getDetailProduct(req, res)
        expect(response.success).to.be.eq(true)
    })



    it('should return message invalid input syntax for type integer: x', async() => {
        const req = {
            params: {
                id: "x"
            }
        }

        const response = await productController.getDetailProduct(req, res)
        expect(response.message).to.be.eq("invalid input syntax for type integer: x")
    })



    it("should return message product with id 2024 not found", async () => {
        const req = {
            params: {
                id: "2024"
            }
        }

        const response = await productController.getDetailProduct(req, res)
        expect(response.message).to.be.eq("product with id 2024 not found")
    })
})