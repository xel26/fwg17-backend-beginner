const { describe } = require("mocha");
const { expect } = require("chai");

const categoryController = require('../../controllers/admin/categories.controller');

const res = {
    status: (status) => {
        return res
    },
    json: (param) => {
        return param
    },
}


describe("List all categories", () => {
    it("should return message List all categories", async () => {
        const req = {
            query: {
                order: "tidak ada",
            },
        }

        const response = await categoryController.getAllCategories(req, res)
        expect(response.message).to.be.eq("List all categories")
    })



    it("should return message data categories not found", async () => {
        const req = {
            query: {
                searchKey: "tidak ada"
            },
        }

        const response = await categoryController.getAllCategories(req, res)
        expect(response.message).to.be.eq("data categories not found")
    })



    it("should return nextPage null", async () => {
        const req = {
            query: {
                page: 2
            },
        }

        const response = await categoryController.getAllCategories(req, res)
        expect(response.pageInfo.nextPage).to.be.null
    })



    it("should return prevPage null", async () => {
        const req = {
            query: {
                page: 1
            },
        }

        const response = await categoryController.getAllCategories(req, res)
        expect(response.pageInfo.prevPage).to.be.null
    })
    
    

    it('should return message column tidak ada does not exist', async() => {
        const req = {
            query: {
                sortBy: 'tidak ada'
            }
        }

        const response = await categoryController.getAllCategories(req, res)
        expect(response.message).to.be.eq('column tidak ada does not exist')
    })
})





describe("detail category", () => {
    it("should return message detail category", async () => {
        const req = {
            params: {
                id: "2"
            },
        }

        const response = await categoryController.getDetailCategory(req, res)
        expect(response.message).to.be.eq("detail category")
    })



    it('should return message invalid input syntax for type integer: x', async() => {
        const req = {
          params: {
            id: "x"
          },
        }

        const response = await categoryController.getDetailCategory(req, res)
        expect(response.message).to.be.eq("invalid input syntax for type integer: x")
    })



    it("should return message category with id 2026 not found", async () => {
                const req = {
          params: {
            id: "2026"
          },
        }
        
        const response = await categoryController.getDetailCategory(req, res)
        expect(response.message).to.be.eq("category with id 2026 not found")
    })
})




describe("create category", () => {
    it("should return message create category successfully", async () => {
        const req = {
          body: {
            name: new Date().getTime(),
          },
        };

        const response = await categoryController.createCategory(req, res)
        expect(response.message).to.be.eq("create category successfully")
    })


    it("should return message name coFFee already exist", async () => {
        const req = {
            body: {
              name: "coFFee",
            },
          };

        const response = await categoryController.createCategory(req, res)
        expect(response.message).to.be.eq("name coFFee already exist")
    })


    it("should return message name cannot be empty", async () => {
        const req = {
            body: {
              name: undefined,
            },
          };

        const response = await categoryController.createCategory(req, res)
        expect(response.message).to.be.eq("name cannot be empty")
    })
})




describe("update category", () => {
    it("should return message update category successfully", async () => {
        const req ={
            params: {
                id: "32"
            },
            body: {
                name: new Date().getTime()
            }
        }

        const response = await categoryController.updateCategory(req, res)
        expect(response.message).to.be.eq("update category successfully")
    })



    it("should return message column tidakAda of relation categories does not exist", async () => {
        const req ={
            params: {
                id: "3"
            },
            body: {
                tidakAda: "update"
            }
        }

        const response = await categoryController.updateCategory(req, res)
        expect(response.message).to.be.eq("column tidakAda of relation categories does not exist")
    })
    


    it("should return message name foods already exist", async () => {
        const req ={
            params: {
                id: "3"
            },
            body: {
                name: "foods"
            }
        }

        const response = await categoryController.updateCategory(req, res)
        expect(response.message).to.be.eq("name foods already exist")
    })
    


    it("should return message No data has been modified", async () => {
        const req ={
            params: {
                id: "3"
            },
            body: {}
        }

        const response = await categoryController.updateCategory(req, res)
        expect(response.message).to.be.eq("No data has been modified")
    })



    it("should return message category with id 2026 not found", async () => {
        const req = {
          params: {
            id: "2026",
          },
          body: {
            name: "example",
          },
        };

        const response = await categoryController.updateCategory(req, res)
        expect(response.message).to.be.eq("category with id 2026 not found")
    })

})





describe('delete category', () => {
    it("should return message delete category successfully", async () => {
        const req ={
            params: {
                id: "51"
            }
        }

        const response = await categoryController.deleteCategory(req, res)
        expect(response.message).to.be.eq("delete category successfully")
    })



    it('should return message invalid input syntax for type integer: x', async() => {
        const req = {
            params: {
                id: "x"
            }
        }

        const response = await categoryController.deleteCategory(req, res)
        expect(response.message).to.be.eq("invalid input syntax for type integer: x")
    })



    it("should return message data with id 2 is still referenced from table productCategories", async () => {
        const req = {
          params: {
            id: "2",
          },
        };

        const response = await categoryController.deleteCategory(req, res)
        expect(response.message).to.be.eq("data with id 2 is still referenced from table productCategories")
    })
    


    it("should return message category with id 2026 not found", async () => {
        const req = {
          params: {
            id: "2026",
          },
        };
          

        const response = await categoryController.deleteCategory(req, res)
        expect(response.message).to.be.eq("category with id 2026 not found")
    })
})