const { describe } = require("mocha");
const { expect } = require("chai");

const sizeController = require('../../controllers/admin/sizes.controller');

const res = {
    status: (status) => {
        return res
    },
    json: (param) => {
        return param
    },
}

let sizeId

describe("List all sizes", () => {
    let lastPage

    it("should return message List all sizes", async () => {
        const req = {
            query: {
                order: "tidak ada",
            },
        }

        const response = await sizeController.getAllSize(req, res)
        lastPage = response.pageInfo.totalPage
        expect(response.message).to.be.eq("List all sizes")
    })



    it("should return message data sizes not found", async () => {
        const req = {
            query: {
                searchKey: "tidak ada"
            },
        }

        const response = await sizeController.getAllSize(req, res)
        expect(response.message).to.be.eq("data sizes not found")
    })



    it("should return nextPage null", async () => {
        const req = {
            query: {
                page: lastPage
            },
        }

        const response = await sizeController.getAllSize(req, res)
        expect(response.pageInfo.nextPage).to.be.null
    })



    it("should return prevPage null", async () => {
        const req = {
            query: {
                page: 1
            },
        }

        const response = await sizeController.getAllSize(req, res)
        expect(response.pageInfo.prevPage).to.be.null
    })
    
    

    it('should return message column tidak ada does not exist', async() => {
        const req = {
            query: {
                sortBy: 'tidak ada'
            }
        }

        const response = await sizeController.getAllSize(req, res)
        expect(response.message).to.be.eq('column tidak ada does not exist')
    })
})



describe("create size", () => {
    it("should return message create size successfully", async () => {
        const req = {
          body: {
            size: new Date().getTime(),
          },
        };

        const response = await sizeController.createSize(req, res)
        sizeId = response.results.id
        expect(response.message).to.be.eq("create size successfully")
    })



    it("should return message size regular already exist", async () => {
        const req = {
            body: {
              size: "regular",
            },
          };

        const response = await sizeController.createSize(req, res)
        expect(response.message).to.be.eq("size regular already exist")
    })



    it("should return message size cannot be empty", async () => {
        const req = {
            body: {
              size: undefined,
            },
          };

        const response = await sizeController.createSize(req, res)
        expect(response.message).to.be.eq("size cannot be empty")
    })
})



describe("detail size", () => {
    it("should return message detail size", async () => {
        const req = {
            params: {
                id: sizeId
            },
        }

        const response = await sizeController.getDetailSize(req, res)
        expect(response.message).to.be.eq("detail size")
    })



    it('should return message invalid input syntax for type integer: x', async() => {
        const req = {
          params: {
            id: "x"
          },
        }

        const response = await sizeController.getDetailSize(req, res)
        expect(response.message).to.be.eq("invalid input syntax for type integer: x")
    })



    it("should return message size with id 2026 not found", async () => {
                const req = {
          params: {
            id: "2026"
          },
        }
        
        const response = await sizeController.getDetailSize(req, res)
        expect(response.message).to.be.eq("size with id 2026 not found")
    })
})



describe("update size", () => {
    it("should return message update size successfully", async () => {
        const req ={
            params: {
                id: sizeId
            },
            body: {
                additionalPrice: 1000
            }
        }

        const response = await sizeController.updateSize(req, res)
        expect(response.message).to.be.eq("update size successfully")
    })



    it("should return message column tidakAda of relation sizes does not exist", async () => {
        const req ={
            params: {
                id: sizeId
            },
            body: {
                tidakAda: "update"
            }
        }

        const response = await sizeController.updateSize(req, res)
        expect(response.message).to.be.eq("column tidakAda of relation sizes does not exist")
    })
    


    it("should return message size regular already exist", async () => {
        const req ={
            params: {
                id: sizeId
            },
            body: {
                size: "regular"
            }
        }

        const response = await sizeController.updateSize(req, res)
        expect(response.message).to.be.eq("size regular already exist")
    })
    


    it("should return message No data has been modified", async () => {
        const req ={
            params: {
                id: sizeId
            },
            body: {}
        }

        const response = await sizeController.updateSize(req, res)
        expect(response.message).to.be.eq("No data has been modified")
    })



    it("should return message size with id 2026 not found", async () => {
        const req = {
          params: {
            id: "2026",
          },
          body: {
            size: "example",
          },
        };

        const response = await sizeController.updateSize(req, res)
        expect(response.message).to.be.eq("size with id 2026 not found")
    })

})




describe('delete size', () => {
    it("should return message delete size successfully", async () => {
        const req ={
            params: {
                id: sizeId
            }
        }

        const response = await sizeController.deleteSize(req, res)
        expect(response.message).to.be.eq("delete size successfully")
    })



    it('should return message invalid input syntax for type integer: x', async() => {
        const req = {
            params: {
                id: "x"
            }
        }

        const response = await sizeController.deleteSize(req, res)
        expect(response.message).to.be.eq("invalid input syntax for type integer: x")
    })



    it("should return message data with id 1 is still referenced from table orderDetails", async () => {
        const req = {
          params: {
            id: "1"
          },
        };

        const response = await sizeController.deleteSize(req, res)
        expect(response.message).to.be.eq("data with id 1 is still referenced from table orderDetails")
    })
    


    it("should return message size with id 2026 not found", async () => {
        const req = {
          params: {
            id: "2026",
          },
        };
          

        const response = await sizeController.deleteSize(req, res)
        expect(response.message).to.be.eq("size with id 2026 not found")
    })
})