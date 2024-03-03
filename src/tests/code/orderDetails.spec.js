const { describe } = require("mocha");
const { expect } = require("chai");

const orderDetailsController = require('../controllers/admin/orderDetails.controller');

const res = {
    status: (status) => {
        return res
    },
    json: (param) => {
        return param
    },
}


describe("List all orderDetails", () => {
    it("should return message List all orders", async () => {
        const req = {
            user: {},
            query: {
                order: 'tidak ada',
            },
        }

        const response = await orderDetailsController.getAllOrderDetail(req, res)
        expect(response.message).to.be.eq("List all orderDetails")
    })



    it("should return message data orderDetails not found", async () => {
        const req = {
            query: {
                page: 24
            },
        }

        const response = await orderDetailsController.getAllOrderDetail(req, res)
        expect(response.message).to.be.eq("data orderDetails not found")
    })



    it("should return nextPage null", async () => {
        const req = {
            query: {
                page: 23
            },
        }

        const response = await orderDetailsController.getAllOrderDetail(req, res)
        expect(response.pageInfo.nextPage).to.be.null
    })



    it("should return prevPage null", async () => {
        const req = {
            query: {
                page: 1
            },
        }

        const response = await orderDetailsController.getAllOrderDetail(req, res)
        expect(response.pageInfo.prevPage).to.be.null
    })
    
    

    it('should return message column tidak ada does not exist', async() => {
        const req = {
            query: {
                sortBy: 'tidak ada'
            }
        }

        const response = await orderDetailsController.getAllOrderDetail(req, res)
        expect(response.message).to.be.eq('column tidak ada does not exist')
    })
})



describe("detail orderDetails", () => {
    it("should return message detail orderDetails", async () => {
        const req = {
            params: {
                id: "866"
            },
        }

        const response = await orderDetailsController.getDetailOrderDetail(req, res)
        expect(response.message).to.be.eq("detail orderDetails")
    })



    it('should return message invalid input syntax for type integer: x', async() => {
        const req = {
          params: {
            id: "x"
          },
        }

        const response = await orderDetailsController.getDetailOrderDetail(req, res)
        expect(response.message).to.be.eq("invalid input syntax for type integer: x")
    })



    it("should return message orderDetails with id 2026 not found", async () => {
        const req = {
          params: {
            id: "2026",
          },
        };
        
        const response = await orderDetailsController.getDetailOrderDetail(req, res)
        expect(response.message).to.be.eq("orderDetails with id 2026 not found")
    })
})



describe("create orderDetails", () => {
    it("should return message create order successfully", async () => {
        const req = {
          body: {
            productId: 1,
            sizeId: 1,
            variantId: 1,
            quantity: 3,
            orderId: 609
          },
        };

        const response = await orderDetailsController.createOrderDetail(req, res)
        expect(response.message).to.be.eq("create orderDetails successfully")
    })


    it("should return message not present", async () => {
        const req = {
            body: {
              productId: 2026,
              sizeId: 2026,
              variantId: 2026,
              quantity: 2026,
              orderId: 2026
            },
          };

        const response = await orderDetailsController.createOrderDetail(req, res)
        expect(response.message).to.be.eq("data with orderId 2026 is not present in table orders")
    })


    it("should return message productId cannot be empty", async () => {
        const req = {
            body: {
              productId: undefined,
              sizeId: undefined,
              variantId: undefined,
              quantity: undefined,
              orderId: undefined
            },
          };

        const response = await orderDetailsController.createOrderDetail(req, res)
        expect(response.message).to.be.eq("productId cannot be empty")
    })
})



describe("update orderDetails", () => {
    it("should return message update orderDetails successfully", async () => {
        const req ={
            params: {
                id: "866"
            },
            body: {
                quantity: 1
            }
        }

        const response = await orderDetailsController.updateOrderDetail(req, res)
        expect(response.message).to.be.eq("update orderDetails successfully")
    })



    it("should return message not exist", async () => {
        const req ={
            params: {
                id: "866"
            },
            body: {
                tidakAda: "update"
            }
        }

        const response = await orderDetailsController.updateOrderDetail(req, res)
        expect(response.message).to.be.eq("column tidakAda of relation orderDetails does not exist")
    })
    


    it("should return message data with productId 2026 is not present in table products", async () => {
        const req ={
            params: {
                id: "866"
            },
            body: {
                productId: 2026
            }
        }

        const response = await orderDetailsController.updateOrderDetail(req, res)
        expect(response.message).to.be.eq("data with productId 2026 is not present in table products")
    })
    


    it("should return message No data has been modified", async () => {
        const req ={
            params: {
                id: "866"
            },
            body: {}
        }

        const response = await orderDetailsController.updateOrderDetail(req, res)
        expect(response.message).to.be.eq("No data has been modified")
    })



    it("should return message orderDetails with id 2026 not found", async () => {
        const req = {
          params: {
            id: "2026",
          },
          body: {
            quantity: 1,
          },
        };

        const response = await orderDetailsController.updateOrderDetail(req, res)
        expect(response.message).to.be.eq("orderDetails with id 2026 not found")
    })

})



describe('delete orderDetails', () => {
    it("should return message delete orderDetails successfully", async () => {
        const req ={
            params: {
                id: "883"
            }
        }

        const response = await orderDetailsController.deleteOrderDetail(req, res)
        expect(response.message).to.be.eq("delete orderDetails successfully")
    })



    it('should return message invalid input syntax for type integer: x', async() => {
        const req = {
            params: {
                id: "x"
            }
        }

        const response = await orderDetailsController.deleteOrderDetail(req, res)
        expect(response.message).to.be.eq("invalid input syntax for type integer: x")
    })
    


    it("should return message orderDetails with id 2026 not found", async () => {
        const req = {
          params: {
            id: "2026",
          },
        };
          

        const response = await orderDetailsController.deleteOrderDetail(req, res)
        expect(response.message).to.be.eq("orderDetails with id 2026 not found")
    })
})