const { describe } = require("mocha");
const { expect } = require("chai");

const productRatingController = require('../../controllers/admin/ProductRatings.controller');

const res = {
    status: (status) => {
        return res
    },
    json: (param) => {
        return param
    },
}


describe("List all productRatings", () => {
    it("should return message List all productRatings", async () => {
        const req = {
            user: {},
            query: {
                order: 'tidak ada',
            },
        }

        const response = await productRatingController.getAllProductRatings(req, res)
        expect(response.message).to.be.eq("List all productRatings")
    })



    it("should return message data productRatings not found", async () => {
        const req = {
            query: {
                page: 11
            },
        }

        const response = await productRatingController.getAllProductRatings(req, res)
        expect(response.message).to.be.eq("data productRatings not found")
    })



    it("should return nextPage null", async () => {
        const req = {
            query: {
                page: 10
            },
        }

        const response = await productRatingController.getAllProductRatings(req, res)
        expect(response.pageInfo.nextPage).to.be.null
    })



    it("should return prevPage null", async () => {
        const req = {
            query: {
                page: 1
            },
        }

        const response = await productRatingController.getAllProductRatings(req, res)
        expect(response.pageInfo.prevPage).to.be.null
    })
    
    

    it('should return message column tidak ada does not exist', async() => {
        const req = {
            query: {
                sortBy: 'tidak ada'
            }
        }

        const response = await productRatingController.getAllProductRatings(req, res)
        expect(response.message).to.be.eq('column tidak ada does not exist')
    })
})



describe("detail productRating", () => {
    it("should return message detail productRating", async () => {
        const req = {
            params: {
                id: "1"
            },
        }

        const response = await productRatingController.getDetailProductRating(req, res)
        expect(response.message).to.be.eq("detail productRating")
    })



    it('should return message invalid input syntax for type integer: x', async() => {
        const req = {
          params: {
            id: "x"
          },
        }

        const response = await productRatingController.getDetailProductRating(req, res)
        expect(response.message).to.be.eq("invalid input syntax for type integer: x")
    })



    it("should return message productRating with id 2026 not found", async () => {
        const req = {
          params: {
            id: 2026,
          },
        };

        const response = await productRatingController.getDetailProductRating(req, res)
        expect(response.message).to.be.eq("productRating with id 2026 not found")
    })
})



describe("create productRating", () => {
    it("should return message create productRating successfully", async () => {
        const req = {
          body: {
            productId: 1,
            userId: 1,
            rate: 5,
            reviewMessage: "unit test"
          },
        };

        const response = await productRatingController.createProductRating(req, res)
        expect(response.message).to.be.eq("create productRating successfully")
    })


    it("should return message not present", async () => {
        const req = {
            body: {
                productId: 2026,
                userId: 2026,
                rate: 5,
                reviewMessage: "unit test"
            },
          };

        const response = await productRatingController.createProductRating(req, res)
        expect(response.message).to.be.eq("data with productId 2026 is not present in table products")
    })


    it("should return message productId cannot be empty", async () => {
        const req = {
            body: {
                productId: undefined,
                userId: undefined,
                rate: undefined
            },
          };

        const response = await productRatingController.createProductRating(req, res)
        expect(response.message).to.be.eq("productId cannot be empty")
    })
})



describe("update productRating", () => {
    it("should return message update productRating successfully", async () => {
        const req ={
            params: {
                id: 59
            },
            body: {
                rate: 5
            }
        }

        const response = await productRatingController.updateProductRating(req, res)
        expect(response.message).to.be.eq("update productRating successfully")
    })



    it("should return message column tidakAda of relation productRatings does not exist", async () => {
        const req ={
            params: {
                id: 59
            },
            body: {
                tidakAda: "update"
            }
        }

        const response = await productRatingController.updateProductRating(req, res)
        expect(response.message).to.be.eq("column tidakAda of relation productRatings does not exist")
    })
    


    it("should return message data with productId 2026 is not present in table products", async () => {
        const req ={
            params: {
                id: 59
            },
            body: {
                productId: 2026
            }
        }

        const response = await productRatingController.updateProductRating(req, res)
        expect(response.message).to.be.eq("data with productId 2026 is not present in table products")
    })
    


    it("should return message No data has been modified", async () => {
        const req ={
            params: {
                id: 59
            },
            body: {}
        }

        const response = await productRatingController.updateProductRating(req, res)
        expect(response.message).to.be.eq("No data has been modified")
    })



    it("should return message productRating with id 2024 not found", async () => {
        const req = {
          params: {
            id: 2024,
          },
          body: {
            productId: 1,
          },
        };

        const response = await productRatingController.updateProductRating(req, res)
        expect(response.message).to.be.eq("productRating with id 2024 not found")
    })

})



describe('delete productRating', () => {
    it("should return message delete productRating successfully", async () => {
        const req ={
            params: {
                id: 71
            }
        }

        const response = await productRatingController.deleteProductRating(req, res)
        expect(response.message).to.be.eq("delete productRating successfully")
    })



    it('should return message invalid input syntax for type integer: x', async() => {
        const req = {
            params: {
                id: "x"
            }
        }

        const response = await productRatingController.deleteProductRating(req, res)
        expect(response.message).to.be.eq("invalid input syntax for type integer: x")
    })
    


    it("should return message productRating with id 2024 not found", async () => {
        const req = {
          params: {
            id: 2024,
          },
        };
          

        const response = await productRatingController.deleteProductRating(req, res)
        expect(response.message).to.be.eq("productRating with id 2024 not found")
    })
})