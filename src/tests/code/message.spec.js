const { describe } = require("mocha");
const { expect } = require("chai");

const messageController = require('../../controllers/admin/message.controller');

const res = {
    status: (status) => {
        return res
    },
    json: (param) => {
        return param
    },
}

let messageId

describe("List all message", () => {
    let lastPage

    it("should return message List all messages", async () => {
        const req = {
            query: {
                order: "tidak ada",
            },
        }

        const response = await messageController.getAllMessages(req, res)
        lastPage = response.pageInfo.totalPage
        expect(response.message).to.be.eq("List all messages")
    })



    it("should return nextPage null", async () => {
        const req = {
            query: {
                page: lastPage
            },
        }

        const response = await messageController.getAllMessages(req, res)
        expect(response.pageInfo.nextPage).to.be.null
    })



    it("should return prevPage null", async () => {
        const req = {
            query: {
                page: 1
            },
        }

        const response = await messageController.getAllMessages(req, res)
        expect(response.pageInfo.prevPage).to.be.null
    })
    
    

    it('should return message column tidak ada does not exist', async() => {
        const req = {
            query: {
                sortBy: 'tidak ada'
            }
        }

        const response = await messageController.getAllMessages(req, res)
        expect(response.message).to.be.eq('column tidak ada does not exist')
    })
})




describe("detail message", () => {
    it("should return message detail message", async () => {
        const req = {
            params: {
                id: "1"
            },
        }

        const response = await messageController.getDetailMessage(req, res)
        expect(response.message).to.be.eq("detail message")
    })



    it('should return message invalid input syntax for type integer: x', async() => {
        const req = {
          params: {
            id: "x"
          },
        }

        const response = await messageController.getDetailMessage(req, res)
        expect(response.message).to.be.eq("invalid input syntax for type integer: x")
    })



    it("should return message with id 2026 not found", async () => {
                const req = {
          params: {
            id: "2026"
          },
        }
        
        const response = await messageController.getDetailMessage(req, res)
        expect(response.message).to.be.eq("message with id 2026 not found")
    })
})




describe("create message", () => {
    it("should return message create message successfully", async () => {
        const req = {
          body: {
            recipientId: 2,
            senderId: 7,
            text: "unit test"
          },
        };

        const response = await messageController.createMessage(req, res)
        messageId = response.results.id
        expect(response.message).to.be.eq("create message successfully")
    })


    it("should return message not present", async () => {
        const req = {
          body: {
            recipientId: 2024,
            senderId: 2026,
            text: "unit test"
          },
        };

        const response = await messageController.createMessage(req, res)
        expect(response.message).to.be.eq("data with recipientId 2024 is not present in table users")
    })



    it("should return message invalid input", async () => {
        const req = {
            body: {
                recipientId: "x",
                senderId: "x",
                text: "unit test"
            },
          };

        const response = await messageController.createMessage(req, res)
        expect(response.message).to.be.eq("invalid input syntax for type integer: x")
    })


    it("should return message recipientId cannot be empty", async () => {
        const req = {
            body: {
                recipientId: undefined,
                senderId: undefined,
                text: undefined
            },
          };

        const response = await messageController.createMessage(req, res)
        expect(response.message).to.be.eq("recipientId cannot be empty")
    })
})




describe("update message", () => {
    it("should return message update message successfully", async () => {
        const req ={
            params: {
                id: messageId
            },
            body: {
                recipientId: 4,
                senderId: 10,
                text: "unit test"
            }
        }

        const response = await messageController.updateMessage(req, res)
        expect(response.message).to.be.eq("update message successfully")
    })



    it("should return message column tidakAda of relation message does not exist", async () => {
        const req ={
            params: {
                id: messageId
            },
            body: {
                tidakAda: "update"
            }
        }

        const response = await messageController.updateMessage(req, res)
        expect(response.message).to.be.eq("column tidakAda of relation message does not exist")
    })
    


    it("should return message not present", async () => {
        const req ={
            params: {
                id: messageId
            },
            body: {
                recipientId: 2024,
                senderId: 2026,
            }
        }

        const response = await messageController.updateMessage(req, res)
        expect(response.message).to.be.eq("data with recipientId 2024 is not present in table users")
    })
    


    it("should return message No data has been modified", async () => {
        const req ={
            params: {
                id: messageId
            },
            body: {}
        }

        const response = await messageController.updateMessage(req, res)
        expect(response.message).to.be.eq("No data has been modified")
    })



    it("should return message with id 2026 not found", async () => {
        const req = {
          params: {
            id: "2026",
          },
          body: {
            recipientId: 4,
            senderId: 10,
            text: "unit test"
          },
        };

        const response = await messageController.updateMessage(req, res)
        expect(response.message).to.be.eq("message with id 2026 not found")
    })

})





describe('delete promo', () => {
    it("should return message delete message successfully", async () => {
        const req ={
            params: {
                id: messageId
            }
        }

        const response = await messageController.deleteMessage(req, res)
        expect(response.message).to.be.eq("delete message successfully")
    })



    it('should return message invalid input syntax for type integer: x', async() => {
        const req = {
            params: {
                id: "x"
            }
        }

        const response = await messageController.deleteMessage(req, res)
        expect(response.message).to.be.eq("invalid input syntax for type integer: x")
    })
    


    it("should return message with id 2026 not found", async () => {
        const req = {
          params: {
            id: "2026",
          },
        };
          

        const response = await messageController.deleteMessage(req, res)
        expect(response.message).to.be.eq("message with id 2026 not found")
    })
})