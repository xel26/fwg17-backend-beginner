const { describe } = require("mocha");
const { expect } = require("chai");

const tagController = require('../../controllers/admin/tags.controller');

const res = {
    status: (status) => {
        return res
    },
    json: (param) => {
        return param
    },
}

let tagId

describe("List all tags", () => {
    let lastPage

    it("should return message List all tags", async () => {
        const req = {
            query: {
                order: "tidak ada",
            },
        }

        const response = await tagController.getAllTags(req, res)
        lastPage = response.pageInfo.totalPage
        expect(response.message).to.be.eq("List all tags")
    })



    it("should return message data tags not foud", async () => {
        const req = {
            query: {
                searchKey: "tidak ada"
            },
        }

        const response = await tagController.getAllTags(req, res)
        expect(response.message).to.be.eq("data tags not foud")
    })



    it("should return nextPage null", async () => {
        const req = {
            query: {
                page: lastPage
            },
        }

        const response = await tagController.getAllTags(req, res)
        expect(response.pageInfo.nextPage).to.be.null
    })



    it("should return prevPage null", async () => {
        const req = {
            query: {
                page: 1
            },
        }

        const response = await tagController.getAllTags(req, res)
        expect(response.pageInfo.prevPage).to.be.null
    })
    
    

    it('should return message column tidak ada does not exist', async() => {
        const req = {
            query: {
                sortBy: 'tidak ada'
            }
        }

        const response = await tagController.getAllTags(req, res)
        expect(response.message).to.be.eq('column tidak ada does not exist')
    })
})




describe("create tag", () => {
    it("should return message create tag successfully", async () => {
        const req = {
          body: {
            name: new Date().getTime(),
          },
        };

        const response = await tagController.createTag(req, res)
        tagId = response.results.id
        expect(response.message).to.be.eq("create tag successfully")
    })



    it("should return message name flashsale! already exist", async () => {
        const req = {
            body: {
              name: "flashsale!",
            },
          };

        const response = await tagController.createTag(req, res)
        expect(response.message).to.be.eq("name flashsale! already exist")
    })



    it("should return message name cannot be empty", async () => {
        const req = {
            body: {
              name: undefined,
            },
          };

        const response = await tagController.createTag(req, res)
        expect(response.message).to.be.eq("name cannot be empty")
    })
})




describe("detail tag", () => {
    it("should return message detail tag", async () => {
        const req = {
            params: {
                id: tagId
            },
        }

        const response = await tagController.getDetailTag(req, res)
        expect(response.message).to.be.eq("detail tag")
    })



    it('should return message invalid input syntax for type integer: x', async() => {
        const req = {
          params: {
            id: "x"
          },
        }

        const response = await tagController.getDetailTag(req, res)
        expect(response.message).to.be.eq("invalid input syntax for type integer: x")
    })



    it("should return message tag with id 2026 not found", async () => {
                const req = {
          params: {
            id: "2026"
          },
        }
        
        const response = await tagController.getDetailTag(req, res)
        expect(response.message).to.be.eq("tag with id 2026 not found")
    })
})




describe("update tag", () => {
    it("should return message update tag successfully", async () => {
        const req ={
            params: {
                id: tagId
            },
            body: {
                name: new Date().getTime()
            }
        }

        const response = await tagController.updateTag(req, res)
        expect(response.message).to.be.eq("update tag successfully")
    })



    it("should return message column tidakAda of relation tags does not exist", async () => {
        const req ={
            params: {
                id: tagId
            },
            body: {
                tidakAda: "update"
            }
        }

        const response = await tagController.updateTag(req, res)
        expect(response.message).to.be.eq("column tidakAda of relation tags does not exist")
    })
    


    it("should return message name flashsale! already exist", async () => {
        const req ={
            params: {
                id: tagId
            },
            body: {
                name: "flashsale!"
            }
        }

        const response = await tagController.updateTag(req, res)
        expect(response.message).to.be.eq("name flashsale! already exist")
    })
    


    it("should return message No data has been modified", async () => {
        const req ={
            params: {
                id: tagId
            },
            body: {}
        }

        const response = await tagController.updateTag(req, res)
        expect(response.message).to.be.eq("No data has been modified")
    })



    it("should return message tag with id 2026 not found", async () => {
        const req = {
          params: {
            id: "2026",
          },
          body: {
            name: "example",
          },
        };

        const response = await tagController.updateTag(req, res)
        expect(response.message).to.be.eq("tag with id 2026 not found")
    })

})




describe('delete tag', () => {
    it("should return message delete tag successfully", async () => {
        const req ={
            params: {
                id: tagId
            }
        }

        const response = await tagController.deleteTag(req, res)
        expect(response.message).to.be.eq("delete tag successfully")
    })



    it('should return message invalid input syntax for type integer: x', async() => {
        const req = {
            params: {
                id: "x"
            }
        }

        const response = await tagController.deleteTag(req, res)
        expect(response.message).to.be.eq("invalid input syntax for type integer: x")
    })



    it("should return message data with id 1 is still referenced from table products", async () => {
        const req = {
          params: {
            id: "1"
          },
        };

        const response = await tagController.deleteTag(req, res)
        expect(response.message).to.be.eq("data with id 1 is still referenced from table products")
    })
    


    it("should return message tag with id 2026 not found", async () => {
        const req = {
          params: {
            id: "2026",
          },
        };
          

        const response = await tagController.deleteTag(req, res)
        expect(response.message).to.be.eq("tag with id 2026 not found")
    })
})