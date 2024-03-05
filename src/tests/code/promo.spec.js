const { describe } = require("mocha");
const { expect } = require("chai");

const promoController = require('../../controllers/admin/promo.controller');

const res = {
    status: (status) => {
        return res
    },
    json: (param) => {
        return param
    },
}

let promoId

describe("List all promo", () => {
    let lastPage

    it("should return message List all promo", async () => {
        const req = {
            query: {
                order: "tidak ada",
            },
        }

        const response = await promoController.getAllPromo(req, res)
        lastPage = response.pageInfo.totalPage
        expect(response.message).to.be.eq("List all promo")
    })



    it("should return message data promo not found", async () => {
        const req = {
            query: {
                searchKey: "tidak ada"
            },
        }

        const response = await promoController.getAllPromo(req, res)
        expect(response.message).to.be.eq("data promo not found")
    })



    it("should return nextPage null", async () => {
        const req = {
            query: {
                page: lastPage
            },
        }

        const response = await promoController.getAllPromo(req, res)
        expect(response.pageInfo.nextPage).to.be.null
    })



    it("should return prevPage null", async () => {
        const req = {
            query: {
                page: 1
            },
        }

        const response = await promoController.getAllPromo(req, res)
        expect(response.pageInfo.prevPage).to.be.null
    })
    
    

    it('should return message column tidak ada does not exist', async() => {
        const req = {
            query: {
                sortBy: 'tidak ada'
            }
        }

        const response = await promoController.getAllPromo(req, res)
        expect(response.message).to.be.eq('column tidak ada does not exist')
    })
})




describe("create promo", () => {
    it("should return message create promo successfully", async () => {
        const req = {
          body: {
            name: new Date().getTime(),
            code: Math.random() * 1000,
            percentage: 0.025,
            maximumPromo: 50000,
            minimumAmount: 70000
          },
        };

        const response = await promoController.createPromo(req, res)
        promoId = response.results.id
        expect(response.message).to.be.eq("create promo successfully")
    })


    it("should return message name super deal already exist", async () => {
        const req = {
            body: {
                name: "super deal",
                code: new Date().getMilliseconds(),
                percentage: 0.025,
                maximumPromo: 50000,
                minimumAmount: 50000
            },
          };

        const response = await promoController.createPromo(req, res)
        expect(response.message).to.be.eq("name super deal already exist")
    })


    it("should return message code sd123 already exist", async () => {
        const req = {
            body: {
                name: new Date().getTime(),
                code: "sd123",
                percentage: 0.025,
                maximumPromo: 50000,
                minimumAmount: 50000
            },
          };

        const response = await promoController.createPromo(req, res)
        expect(response.message).to.be.eq("code sd123 already exist")
    })


    it("should return message name cannot be empty", async () => {
        const req = {
            body: {
              name: undefined,
              code: undefined,
              percentage: undefined,
              maximumPromo: undefined,
              minimumPromo: undefined
            },
          };

        const response = await promoController.createPromo(req, res)
        expect(response.message).to.be.eq("name cannot be empty")
    })
})



describe("detail promo", () => {
    it("should return message detail promo", async () => {
        const req = {
            params: {
                id: promoId
            },
        }

        const response = await promoController.getDetailPromo(req, res)
        expect(response.message).to.be.eq("detail promo")
    })



    it('should return message invalid input syntax for type integer: x', async() => {
        const req = {
          params: {
            id: "x"
          },
        }

        const response = await promoController.getDetailPromo(req, res)
        expect(response.message).to.be.eq("invalid input syntax for type integer: x")
    })



    it("should return message promo with id 2026 not found", async () => {
                const req = {
          params: {
            id: "2026"
          },
        }
        
        const response = await promoController.getDetailPromo(req, res)
        expect(response.message).to.be.eq("promo with id 2026 not found")
    })
})




describe("update promo", () => {
    it("should return message update promo successfully", async () => {
        const req ={
            params: {
                id: promoId
            },
            body: {
                name: new Date().getTime()
            }
        }

        const response = await promoController.updatePromo(req, res)
        expect(response.message).to.be.eq("update promo successfully")
    })



    it("should return message column tidakAda of relation promo does not exist", async () => {
        const req ={
            params: {
                id: promoId
            },
            body: {
                tidakAda: "update"
            }
        }

        const response = await promoController.updatePromo(req, res)
        expect(response.message).to.be.eq("column tidakAda of relation promo does not exist")
    })
    


    it("should return message name super deal already exist", async () => {
        const req ={
            params: {
                id: promoId
            },
            body: {
                name: "super deal"
            }
        }

        const response = await promoController.updatePromo(req, res)
        expect(response.message).to.be.eq("name super deal already exist")
    })
    


    it("should return message code sd123 already exist", async () => {
        const req ={
            params: {
                id: promoId
            },
            body: {
                code: "sd123"
            }
        }

        const response = await promoController.updatePromo(req, res)
        expect(response.message).to.be.eq("code sd123 already exist")
    })
    


    it("should return message No data has been modified", async () => {
        const req ={
            params: {
                id: promoId
            },
            body: {}
        }

        const response = await promoController.updatePromo(req, res)
        expect(response.message).to.be.eq("No data has been modified")
    })



    it("should return message promo with id 2026 not found", async () => {
        const req = {
          params: {
            id: "2026",
          },
          body: {
            name: "example",
          },
        };

        const response = await promoController.updatePromo(req, res)
        expect(response.message).to.be.eq("promo with id 2026 not found")
    })

})




describe('delete promo', () => {
    it("should return message delete promo successfully", async () => {
        const req ={
            params: {
                id: promoId
            }
        }

        const response = await promoController.deletePromo(req, res)
        expect(response.message).to.be.eq("delete promo successfully")
    })



    it('should return message invalid input syntax for type integer: x', async() => {
        const req = {
            params: {
                id: "x"
            }
        }

        const response = await promoController.deletePromo(req, res)
        expect(response.message).to.be.eq("invalid input syntax for type integer: x")
    })



    it("should return message data with id 2 is still referenced from table orders", async () => {
        const req = {
          params: {
            id: "2",
          },
        };

        const response = await promoController.deletePromo(req, res)
        expect(response.message).to.be.eq("data with id 2 is still referenced from table orders")
    })
    


    it("should return message promo with id 2026 not found", async () => {
        const req = {
          params: {
            id: "2026",
          },
        };
          

        const response = await promoController.deletePromo(req, res)
        expect(response.message).to.be.eq("promo with id 2026 not found")
    })
})