const { describe } = require("mocha");
const { expect } = require("chai");

const orderController = require('../../controllers/admin/order.controller');

const res = {
    status: (status) => {
        return res
    },
    json: (param) => {
        return param
    },
}


describe("List all orders", () => {
    it("should return message List all orders", async () => {
        const req = {
            user: {},
            query: {
                order: 'tidak ada',
            },
        }

        const response = await orderController.getAllOrders(req, res)
        expect(response.message).to.be.eq("List all orders")
    })



    it("should return message data orders not found", async () => {
        const req = {
            query: {
                page: 16
            },
        }

        const response = await orderController.getAllOrders(req, res)
        expect(response.message).to.be.eq("data orders not found")
    })



    it("should return nextPage null", async () => {
        const req = {
            query: {
                page: 15
            },
        }

        const response = await orderController.getAllOrders(req, res)
        expect(response.pageInfo.nextPage).to.be.null
    })



    it("should return prevPage null", async () => {
        const req = {
            query: {
                page: 1
            },
        }

        const response = await orderController.getAllOrders(req, res)
        expect(response.pageInfo.prevPage).to.be.null
    })
    
    

    it('should return message column tidak ada does not exist', async() => {
        const req = {
            query: {
                sortBy: 'tidak ada'
            }
        }

        const response = await orderController.getAllOrders(req, res)
        expect(response.message).to.be.eq('column tidak ada does not exist')
    })
})



describe("detail order", () => {
    it("should return message detail category", async () => {
        const req = {
            params: {
                id: "582"
            },
        }

        const response = await orderController.getDetailOrder(req, res)
        expect(response.message).to.be.eq("detail order")
    })



    it('should return message invalid input syntax for type integer: x', async() => {
        const req = {
          params: {
            id: "x"
          },
        }

        const response = await orderController.getDetailOrder(req, res)
        expect(response.message).to.be.eq("invalid input syntax for type integer: x")
    })



    it("should return message order with id 2026 not found", async () => {
        const req = {
          params: {
            id: "2026",
          },
        };
        
        const response = await orderController.getDetailOrder(req, res)
        expect(response.message).to.be.eq("order with id 2026 not found")
    })
})




describe("create order", () => {
    it("should return message create order successfully", async () => {
        const req = {
          user: {
            id: 466
          },
          body: {
            total: 1000,
            subtotal: 2000,
            tax: 100,
            deliveryFee: 5000,
            deliveryShipping: "Dine Int",
            deliveryAddress: "unit test",
            fullName: "unit test",
            email: "test@example.com"
          },
        };

        const response = await orderController.createOrder(req, res)
        expect(response.message).to.be.eq("create order successfully")
    })


    it("should return message not present", async () => {
        const req = {
            user: {
              id: 2026
            },
            body: {
              total: 1000,
              subtotal: 2000,
              tax: 100,
              deliveryFee: 5000,
              deliveryShipping: "Dine Int",
              deliveryAddress: "unit test",
              fullName: "unit test",
              email: "test@example.com"
            },
          };

        const response = await orderController.createOrder(req, res)
        expect(response.message).to.be.eq("data with userId 2026 is not present in table users")
    })


    it("should return message userId cannot be empty", async () => {
        const req = {
            user: {
              id: undefined
            },
            body: {
              total: 1000,
              subtotal: 2000,
              tax: 100,
              deliveryFee: 5000,
              deliveryShipping: undefined,
              deliveryAddress: undefined,
              fullName: "unit test",
              email: "test@example.com"
            },
          };

        const response = await orderController.createOrder(req, res)
        expect(response.message).to.be.eq("userId cannot be empty")
    })
})




describe("update order", () => {
    it("should return message update order successfully", async () => {
        const req ={
            params: {
                id: "616"
            },
            body: {
                total: 5000
            }
        }

        const response = await orderController.updateOrder(req, res)
        expect(response.message).to.be.eq("update order successfully")
    })



    it("should return message not exist", async () => {
        const req ={
            params: {
                id: "616"
            },
            body: {
                tidakAda: "update"
            }
        }

        const response = await orderController.updateOrder(req, res)
        expect(response.message).to.be.eq("column tidakAda of relation orders does not exist")
    })
    


    it("should return message already exist", async () => {
        const req ={
            params: {
                id: "616"
            },
            body: {
                orderNumber: "240301943"
            }
        }

        const response = await orderController.updateOrder(req, res)
        expect(response.message).to.be.eq("orderNumber 240301943 already exist")
    })
    


    it("should return message No data has been modified", async () => {
        const req ={
            params: {
                id: "616"
            },
            body: {}
        }

        const response = await orderController.updateOrder(req, res)
        expect(response.message).to.be.eq("No data has been modified")
    })



    it("should return message not found", async () => {
        const req = {
          params: {
            id: "2026",
          },
          body: {
            total: 5000,
          },
        };

        const response = await orderController.updateOrder(req, res)
        expect(response.message).to.be.eq("order with id 2026 not found")
    })

})





describe('delete order', () => {
    it("should return message delete order successfully", async () => {
        const req ={
            params: {
                id: "624"
            }
        }

        const response = await orderController.deleteOrder(req, res)
        expect(response.message).to.be.eq("delete order successfully")
    })



    it('should return message invalid input syntax for type integer: x', async() => {
        const req = {
            params: {
                id: "x"
            }
        }

        const response = await orderController.deleteOrder(req, res)
        expect(response.message).to.be.eq("invalid input syntax for type integer: x")
    })



    it("should return message still referenced", async () => {
        const req = {
          params: {
            id: "609",
          },
        };

        const response = await orderController.deleteOrder(req, res)
        expect(response.message).to.be.eq("data with id 609 is still referenced from table orderDetails")
    })
    


    it("should return message order with id 2026 not found", async () => {
        const req = {
          params: {
            id: "2026",
          },
        };
          

        const response = await orderController.deleteOrder(req, res)
        expect(response.message).to.be.eq("order with id 2026 not found")
    })
})