const { describe } = require("mocha");
const { expect } = require("chai");

const historyOrderController = require('../controllers/historyOrder.controller');

const res = {
    status: (status) => {
        return res
    },
    json: (param) => {
        return param
    },
}


describe("List all history order", () => {
    it("should return message List all history order", async () => {
        const req = {
            user: {
                id: "466"
            },
            query: {
                order: 'tidak ada',
                status: 'On Progress'
            },
        }

        const response = await historyOrderController.getAllHistoryOrder(req, res)
        expect(response.message).to.be.eq("List all history order")
    })



    it("should return message data history order not found", async () => {
        const req = {
            user: {
                id: "466"
            },
            query: {
                status: 'sending goods'
            },
        }

        const response = await historyOrderController.getAllHistoryOrder(req, res)
        expect(response.message).to.be.eq("data history order not found")
    })



    it("should return nextPage null", async () => {
        const req = {
            user: {
                id: "466"
            },
            query: {
                page: 4
            },
        }

        const response = await historyOrderController.getAllHistoryOrder(req, res)
        expect(response.pageInfo.nextPage).to.be.null
    })



    it("should return prevPage null", async () => {
        const req = {
            user: {
                id: "466"
            },
            query: {
                page: 1
            },
        }

        const response = await historyOrderController.getAllHistoryOrder(req, res)
        expect(response.pageInfo.prevPage).to.be.null
    })
})



describe("detail history order", () => {
    it("should return message detail history order", async () => {
        const req = {
            user: {
                id: "466"
            },
            params: {
                id: "604"
            },
        }

        const response = await historyOrderController.getDetailHistoryOrder(req, res)
        expect(response.message).to.be.eq("detail history order")
    })



    it('should return message invalid input syntax for type integer: x', async() => {
        const req = {
            user: {
                id: "466"
            },
            params: {
                id: "x"
            },
        }

        const response = await historyOrderController.getDetailHistoryOrder(req, res)
        expect(response.message).to.be.eq("invalid input syntax for type integer: x")
    })



    it("should return message user with id 466 does not have an order with id 2026", async () => {
        const req = {
            user: {
                id: "466"
            },
            params: {
                id: "2026"
            },
        }
        
        const response = await historyOrderController.getDetailHistoryOrder(req, res)
        expect(response.message).to.be.eq("user with id 466 does not have an order with id 2026")
    })
})



describe("get history order products", () => {
    it("should return message list all history order products", async () => {
        const req = {
            user: {
                id: "466"
            },
            query: {
                orderId: "604"
            },
        }

        const response = await historyOrderController.getHistoryOrderProducts(req, res)
        expect(response.message).to.be.eq("list all history order products")
    })



    it('should return message invalid input syntax for type integer: x', async() => {
        const req = {
            user: {
                id: "466"
            },
            query: {
                orderId: "x"
            },
        }

        const response = await historyOrderController.getHistoryOrderProducts(req, res)
        expect(response.message).to.be.eq("invalid input syntax for type integer: x")
    })



    it("should return message data history order products not found", async () => {
        const req = {
            user: {
                id: "466"
            },
            query: {
                id: "13"
            },
        }
        
        const response = await historyOrderController.getHistoryOrderProducts(req, res)
        expect(response.message).to.be.eq("data history order products not found")
    })
})