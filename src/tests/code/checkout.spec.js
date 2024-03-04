const { describe } = require("mocha");
const { expect } = require("chai");

const checkoutController = require('../../controllers/checkout.controller');

const req = {
    user: {},
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



describe("checkout", () => {
    it("should return message create order successfully", async () => {
        req.user.id = "466"

        req.body = {
            productId: "1,2,4",
            sizeProduct: "Regular,Large,Medium",
            variantProduct: "cold,hot,cold",
            quantityProduct: "1,2,2",
            deliveryShipping: "Pick Up"
        }

        const response = await checkoutController.createOrder(req, res)
        expect(response.message).to.be.eq("create order successfully")
    })

    

    it("should return message invalid input syntax for type integer: x", async () => {
        const req = {
            user: {
                id: "x"
            }
        }

        req.body = {
            productId: "1,2,4",
            sizeProduct: "Regular,Large,Medium",
            variantProduct: "cold,hot,cold",
            quantityProduct: "1,2,2",
            deliveryShipping: "Pick Up"
        }

        const response = await checkoutController.createOrder(req, res)
        expect(response.message).to.be.eq("invalid input syntax for type integer: x")
    })



    it("should return message data with productId 3 is not present in table products", async () => {
        req.body = {
            productId: "3",
            sizeProduct: "regular",
            variantProduct: "cold",
            quantityProduct: "1",
            deliveryShipping: "Dine In"
        }

        const response = await checkoutController.createOrder(req, res)
        expect(response.message).to.be.eq("data with productId 3 is not present in table products")
    })



    it("should return message size small not found", async () => {
        req.body = {
            productId: "4",
            sizeProduct: "small",
            variantProduct: "cold",
            quantityProduct: "1",
            deliveryShipping: "Dine In"
        }

        const response = await checkoutController.createOrder(req, res)
        expect(response.message).to.be.eq("size small not found")
    })



    it("should return message variant extra spicy not found", async () => {
        req.body = {
            productId: "4",
            sizeProduct: "regular",
            variantProduct: "extra spicy",
            quantityProduct: "1",
            deliveryShipping: "Dine In"
        }

        const response = await checkoutController.createOrder(req, res)
        expect(response.message).to.be.eq("variant extra spicy not found")
    })
})





describe('data size', () => {
    it("should return message data size", async () => {
        req.query.name = "medium"
        const response = await checkoutController.getDataSize(req, res)
        expect(response.message).to.be.eq("data size")
    })



    it("should return message size small not found", async () => {
        req.query.name = "small"
        const response = await checkoutController.getDataSize(req, res)
        expect(response.message).to.be.eq("size small not found")
    })
 })





describe('data variant', () => {
    it("should return message data variant", async () => {
        req.query.name = "cold"
        const response = await checkoutController.getDataVariant(req, res)
        expect(response.message).to.be.eq("data variant")
    })



    it("should return message variant extra spicy not found", async () => {
        req.query.name = "extra spicy"
        const response = await checkoutController.getDataVariant(req, res)
        expect(response.message).to.be.eq("variant extra spicy not found")
    })
 })