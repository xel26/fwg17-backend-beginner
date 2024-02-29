const { describe } = require("mocha");
const { expect } = require("chai");

const productController = require('../controllers/admin/product.controller');

const req = {
    params: {},
    query: {},
    body: {},
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
    it("should return message List all products", async () => {
        const response = await productController.getAllProducts(req, res)
        expect(response.message).to.be.eq("List all products")
    })



    it("should return message no data found", async () => {
        req.query = {
            searchKey: "tidak ada"
        }

        const response = await productController.getAllProducts(req, res)
        expect(response.message).to.be.eq("no data found")
    })
})





describe("detail product", () => {
    req.params = {
        id: "1"
    }

    it("should return message detail product", async () => {
        const response = await productController.getDetailProduct(req, res)
        expect(response.message).to.be.eq("detail product")
    })



    it('should return message invalid input syntax for type integer: x', async() => {
        req.params.id = "x"
        const response = await productController.getDetailProduct(req, res)
        expect(response.message).to.be.eq("invalid input syntax for type integer: x")
    })



    it("should return message product with id 2026 not found", async () => {
        req.params.id = "2026"
        const response = await productController.getDetailProduct(req, res)
        expect(response.message).to.be.eq("product with id 2026 not found")
    })
})





describe("create product", () => {
    req.body = {
        name: new Date().getTime(),
        basePrice: 1000
    }
    
    it("should return message create product successfully", async () => {
        const response = await productController.createProduct(req, res)
        expect(response.message).to.be.eq("create product successfully")
    })


    it("should return message name Vanilla already exist", async () => {
        req.body.name = "Vanilla Syrup"

        const response = await productController.createProduct(req, res)
        expect(response.message).to.be.eq("name Vanilla already exist")
    })


    it("should return message name cannot be empty", async () => {
        req.body.name = undefined

        const response = await productController.createProduct(req, res)
        expect(response.message).to.be.eq("name cannot be empty")
    })
})





describe("update product", () => {
    it("should return message update product successfully", async () => {
        req.params.id = "55"
        req.body = {
            basePrice: 70000,
            discount: 1000
        }
        const response = await productController.updateProduct(req, res)
        expect(response.message).to.be.eq("update product successfully")
    })



    it("should return message invalid input syntax for type integer: x", async () => {
        req.params.id = "55"
        req.body = {
            basePrice: "x",
        }
        const response = await productController.updateProduct(req, res)
        expect(response.message).to.be.eq("invalid input syntax for type integer: x")
    })



    it("should return message column tidakAda of relation products does not exist", async () => {
        req.params.id = "55"
        req.body = {
            tidakAda: "update"
        }
        const response = await productController.updateProduct(req, res)
        expect(response.message).to.be.eq("column tidakAda of relation products does not exist")
    })
    


    it("should return message products with name Vanilla Syrup already exist", async () => {
        req.params.id = "55"
        req.body.name = "Vanilla Syrup"
        const response = await productController.updateProduct(req, res)
        expect(response.message).to.be.eq("products with name Vanilla Syrup already exist")
    })
    


    it("should return message No data has been modified", async () => {
        req.params.id = "55"
        req.body = {}
        const response = await productController.updateProduct(req, res)
        expect(response.message).to.be.eq("No data has been modified")
    })



    it("should return message products with id 2026 not found", async () => {
        req.params.id = "2026"
        const response = await productController.updateProduct(req, res)
        expect(response.message).to.be.eq("products with id 2026 not found")
    })

})





describe('delete product', () => {
    it("should return message delete product successfully", async () => {
        req.params.id = "152"
        const response = await productController.deleteProduct(req, res)
        expect(response.message).to.be.eq("delete product successfully")
    })



    it("should return message data with id 1 is still referenced from table orderDetails", async () => {
        req.params.id = "1"
        const response = await productController.deleteProduct(req, res)
        expect(response.message).to.be.eq("data with id 1 is still referenced from table orderDetails")
    })
    


    it("should return message products with id 2026 not found", async () => {
        req.params.id = "2026"
        const response = await productController.deleteProduct(req, res)
        expect(response.message).to.be.eq("products with id 2026 not found")
    })
})