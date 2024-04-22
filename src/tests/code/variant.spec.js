const { describe, it } = require('mocha')
const { expect } = require('chai')

const variantController = require('../../controllers/admin/variant.controller')

const res = {
  status: (status) => {
    return res
  },
  json: (param) => {
    return param
  }
}

let variantId

describe('List all variants', () => {
  let lastPage

  it('should return message List all variants', async () => {
    const req = {
      query: {
        order: 'tidak ada'
      }
    }

    const response = await variantController.getAllVariant(req, res)
    lastPage = response.pageInfo.totalPage
    expect(response.message).to.be.eq('List all variants')
  })

  it('should return message data variants not found', async () => {
    const req = {
      query: {
        searchKey: 'tidak ada'
      }
    }

    const response = await variantController.getAllVariant(req, res)
    expect(response.message).to.be.eq('data variants not found')
  })

  it('should return nextPage null', async () => {
    const req = {
      query: {
        page: lastPage
      }
    }

    const response = await variantController.getAllVariant(req, res)
    expect(response.pageInfo.nextPage).to.be.null
  })

  it('should return prevPage null', async () => {
    const req = {
      query: {
        page: 1
      }
    }

    const response = await variantController.getAllVariant(req, res)
    expect(response.pageInfo.prevPage).to.be.null
  })

  it('should return message column tidak ada does not exist', async () => {
    const req = {
      query: {
        sortBy: 'tidak ada'
      }
    }

    const response = await variantController.getAllVariant(req, res)
    expect(response.message).to.be.eq('column tidak ada does not exist')
  })
})

describe('create variant', () => {
  it('should return message create variant successfully', async () => {
    const req = {
      body: {
        name: new Date().getTime()
      }
    }

    const response = await variantController.createVariant(req, res)
    variantId = response.results.id
    expect(response.message).to.be.eq('create variant successfully')
  })

  it('should return message name Cold already exist', async () => {
    const req = {
      body: {
        name: 'Cold'
      }
    }

    const response = await variantController.createVariant(req, res)
    expect(response.message).to.be.eq('name Cold already exist')
  })

  it('should return message name cannot be empty', async () => {
    const req = {
      body: {
        name: undefined
      }
    }

    const response = await variantController.createVariant(req, res)
    expect(response.message).to.be.eq('name cannot be empty')
  })
})

describe('detail variant', () => {
  it('should return message detail variant', async () => {
    const req = {
      params: {
        id: variantId
      }
    }

    const response = await variantController.getDetailVariant(req, res)
    expect(response.message).to.be.eq('detail variant')
  })

  it('should return message invalid input syntax for type integer: x', async () => {
    const req = {
      params: {
        id: 'x'
      }
    }

    const response = await variantController.getDetailVariant(req, res)
    expect(response.message).to.be.eq('invalid input syntax for type integer: x')
  })

  it('should return message variant with id 2026 not found', async () => {
    const req = {
      params: {
        id: '2026'
      }
    }

    const response = await variantController.getDetailVariant(req, res)
    expect(response.message).to.be.eq('variant with id 2026 not found')
  })
})

describe('update variant', () => {
  it('should return message update variant successfully', async () => {
    const req = {
      params: {
        id: variantId
      },
      body: {
        additionalPrice: 0
      }
    }

    const response = await variantController.updateVariant(req, res)
    expect(response.message).to.be.eq('update variant successfully')
  })

  it('should return message column tidakAda of relation variant does not exist', async () => {
    const req = {
      params: {
        id: variantId
      },
      body: {
        tidakAda: 'update'
      }
    }

    const response = await variantController.updateVariant(req, res)
    expect(response.message).to.be.eq('column tidakAda of relation variant does not exist')
  })

  it('should return message name Cold already exist', async () => {
    const req = {
      params: {
        id: variantId
      },
      body: {
        name: 'Cold'
      }
    }

    const response = await variantController.updateVariant(req, res)
    expect(response.message).to.be.eq('name Cold already exist')
  })

  it('should return message No data has been modified', async () => {
    const req = {
      params: {
        id: variantId
      },
      body: {}
    }

    const response = await variantController.updateVariant(req, res)
    expect(response.message).to.be.eq('No data has been modified')
  })

  it('should return message variant with id 2026 not found', async () => {
    const req = {
      params: {
        id: '2026'
      },
      body: {
        name: 'example'
      }
    }

    const response = await variantController.updateVariant(req, res)
    expect(response.message).to.be.eq('variant with id 2026 not found')
  })
})

describe('delete variant', () => {
  it('should return message delete variant successfully', async () => {
    const req = {
      params: {
        id: variantId
      }
    }

    const response = await variantController.deleteVariant(req, res)
    expect(response.message).to.be.eq('delete variant successfully')
  })

  it('should return message invalid input syntax for type integer: x', async () => {
    const req = {
      params: {
        id: 'x'
      }
    }

    const response = await variantController.deleteVariant(req, res)
    expect(response.message).to.be.eq('invalid input syntax for type integer: x')
  })

  it('should return message data with id 1 is still referenced from table orderDetails', async () => {
    const req = {
      params: {
        id: '1'
      }
    }

    const response = await variantController.deleteVariant(req, res)
    expect(response.message).to.be.eq('data with id 1 is still referenced from table orderDetails')
  })

  it('should return message variant with id 2026 not found', async () => {
    const req = {
      params: {
        id: '2026'
      }
    }

    const response = await variantController.deleteVariant(req, res)
    expect(response.message).to.be.eq('variant with id 2026 not found')
  })
})
