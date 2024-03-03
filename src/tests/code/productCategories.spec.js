const { describe } = require("mocha");
const { expect } = require("chai");

const productCategoriesController = require('../controllers/admin/productCategories.controller');

const res = {
    status: (status) => {
        return res
    },
    json: (param) => {
        return param
    },
}


describe("List all productCategories", () => {
    it("should return message List all productCategories", async () => {
        const req = {
            user: {},
            query: {
                order: 'tidak ada',
            },
        }

        const response = await productCategoriesController.getAllProductCategories(req, res)
        expect(response.message).to.be.eq("List all productCategories")
    })



    it("should return message data orderDetails not found", async () => {
        const req = {
            query: {
                page: 6
            },
        }

        const response = await productCategoriesController.getAllProductCategories(req, res)
        expect(response.message).to.be.eq("data productCategories not found")
    })



    it("should return nextPage null", async () => {
        const req = {
            query: {
                page: 5
            },
        }

        const response = await productCategoriesController.getAllProductCategories(req, res)
        expect(response.pageInfo.nextPage).to.be.null
    })



    it("should return prevPage null", async () => {
        const req = {
            query: {
                page: 1
            },
        }

        const response = await productCategoriesController.getAllProductCategories(req, res)
        expect(response.pageInfo.prevPage).to.be.null
    })
    
    

    it('should return message column tidak ada does not exist', async() => {
        const req = {
            query: {
                sortBy: 'tidak ada'
            }
        }

        const response = await productCategoriesController.getAllProductCategories(req, res)
        expect(response.message).to.be.eq('column tidak ada does not exist')
    })
})



describe("detail productCategories", () => {
    it("should return message detail ProductCategories", async () => {
        const req = {
            params: {
                id: "1"
            },
        }

        const response = await productCategoriesController.getDetailProductCategories(req, res)
        expect(response.message).to.be.eq("detail ProductCategories")
    })



    it('should return message invalid input syntax for type integer: x', async() => {
        const req = {
          params: {
            id: "x"
          },
        }

        const response = await productCategoriesController.getDetailProductCategories(req, res)
        expect(response.message).to.be.eq("invalid input syntax for type integer: x")
    })



    it("should return message productCategories with id 2026 not found", async () => {
        const req = {
          params: {
            id: "2026",
          },
        };
        
        const response = await productCategoriesController.getDetailProductCategories(req, res)
        expect(response.message).to.be.eq("productCategory with id 2026 not found")
    })
})



describe("create productCategories", () => {
    it("should return message create order successfully", async () => {
        const req = {
          body: {
            productId: 1,
            categoryId: 56,
          },
        };

        const response = await productCategoriesController.createProductCategories(req, res)
        expect(response.message).to.be.eq("create productCategory successfully")
    })


    it("should return message productCategory with productId 1 and categoryId 2 already exist", async () => {
        const req = {
          body: {
            productId: 1,
            categoryId: 2,
          },
        };

        const response = await productCategoriesController.createProductCategories(req, res)
        expect(response.message).to.be.eq("productCategory with productId 1 and categoryId 2 already exist")
    })


    it("should return message not present", async () => {
        const req = {
            body: {
                categoryId: 2026,
                productId: 2026,
            },
          };

        const response = await productCategoriesController.createProductCategories(req, res)
        expect(response.message).to.be.eq("data with categoryId 2026 is not present in table categories")
    })


    it("should return message productId cannot be empty", async () => {
        const req = {
            body: {
                productId: undefined,
                categoryId: undefined,
            },
          };

        const response = await productCategoriesController.createProductCategories(req, res)
        expect(response.message).to.be.eq("productId cannot be empty")
    })
})



describe("update productCategories", () => {
    it("should return message update productCategory successfully", async () => {
        const req ={
            params: {
                id: "62"
            },
            body: {
                productId: 1
            }
        }

        const response = await productCategoriesController.updateProductCategories(req, res)
        expect(response.message).to.be.eq("update productCategory successfully")
    })



    it("should return message column tidakAda of relation productCategories does not exist", async () => {
        const req ={
            params: {
                id: "62"
            },
            body: {
                tidakAda: "update"
            }
        }

        const response = await productCategoriesController.updateProductCategories(req, res)
        expect(response.message).to.be.eq("column tidakAda of relation productCategories does not exist")
    })
    


    it("should return message data with productId 2026 is not present in table products", async () => {
        const req ={
            params: {
                id: "62"
            },
            body: {
                productId: 2026
            }
        }

        const response = await productCategoriesController.updateProductCategories(req, res)
        expect(response.message).to.be.eq("data with productId 2026 is not present in table products")
    })
    


    it("should return message No data has been modified", async () => {
        const req ={
            params: {
                id: "62"
            },
            body: {}
        }

        const response = await productCategoriesController.updateProductCategories(req, res)
        expect(response.message).to.be.eq("No data has been modified")
    })



    it("should return message productCategory with id 2024 not found", async () => {
        const req = {
          params: {
            id: 2024,
          },
          body: {
            productId: 1,
          },
        };

        const response = await productCategoriesController.updateProductCategories(req, res)
        expect(response.message).to.be.eq("productCategory with id 2024 not found")
    })

})



describe('delete productCategories', () => {
    it("should return message delete productCategory successfully", async () => {
        const req ={
            params: {
                id: "73"
            }
        }

        const response = await productCategoriesController.deleteProductCategories(req, res)
        expect(response.message).to.be.eq("delete productCategory successfully")
    })



    it('should return message invalid input syntax for type integer: x', async() => {
        const req = {
            params: {
                id: "x"
            }
        }

        const response = await productCategoriesController.deleteProductCategories(req, res)
        expect(response.message).to.be.eq("invalid input syntax for type integer: x")
    })
    


    it("should return message productCategory with id 2026 not found", async () => {
        const req = {
          params: {
            id: 2026,
          },
        };
          

        const response = await productCategoriesController.deleteProductCategories(req, res)
        expect(response.message).to.be.eq("productCategory with id 2026 not found")
    })
})