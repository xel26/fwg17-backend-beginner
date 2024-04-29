const { describe, it } = require('mocha')
const { expect } = require('chai')

const productController = require('../../controllers/admin/product.controller')

const res = {
  status: (status) => {
    return res
  },
  json: (param) => {
    return param
  }
}

let productId

describe('list all products', () => {
  let lastPage

  it('should return message List all products', async () => {
    const req = {
      query: {
        sortBy: 'createdAt',
        category: 'coffee',
        isRecommended: true
      }
    }

    const response = await productController.getAllProducts(req, res)
    lastPage = response.pageInfo.totalPage
    expect(response.message).to.be.eq('List all products')
  })

  it('should return message no data found', async () => {
    const req = {
      query: {
        searchKey: 'tidak ada'
      }
    }

    const response = await productController.getAllProducts(req, res)
    expect(response.message).to.be.eq('data products not found')
  })

  it('should return nextPage null', async () => {
    const req = {
      query: {
        page: lastPage,
        sortBy: 'createdAt',
        category: 'coffee',
        isRecommended: true
      }
    }

    const response = await productController.getAllProducts(req, res)
    expect(response.pageInfo.nextPage).to.be.null
  })

  it('should return prevPage null', async () => {
    const req = {
      query: {
        page: 1
      }
    }

    const response = await productController.getAllProducts(req, res)
    expect(response.pageInfo.prevPage).to.be.null
  })

  it('should return message column p.tidak ada does not exist', async () => {
    const req = {
      query: {
        sortBy: 'tidak ada'
      }
    }

    const response = await productController.getAllProducts(req, res)
    expect(response.message).to.be.eq('column p.tidak ada does not exist')
  })
})

describe('detail product', () => {
  it('should return message detail product', async () => {
    const req = {
      params: {
        id: '1'
      }
    }

    const response = await productController.getDetailProduct(req, res)
    expect(response.message).to.be.eq('detail product')
  })

  it('should return message invalid input syntax for type integer: x', async () => {
    const req = {
      params: {
        id: 'x'
      }
    }

    const response = await productController.getDetailProduct(req, res)
    expect(response.message).to.be.eq('invalid input syntax for type integer: x')
  })

  it('should return message product with id 2026 not found', async () => {
    const req = {
      params: {
        id: '2026'
      }
    }

    const response = await productController.getDetailProduct(req, res)
    expect(response.message).to.be.eq('product with id 2026 not found')
  })
})

describe('create product', () => {
  it('should return message create product successfully', async () => {
    const req = {
      body: {
        name: new Date().getTime(),
        basePrice: 1000
      }
    }

    const response = await productController.createProduct(req, res)
    productId = response.results.id
    expect(response.message).to.be.eq('create product successfully')
  })

  it('should return message name vanilla syrup already exist', async () => {
    const req = {
      body: {
        name: 'vanilla syrup',
        basePrice: 1000
      }
    }

    const response = await productController.createProduct(req, res)
    expect(response.message).to.be.eq('name vanilla syrup already exist')
  })

  it('should return message name cannot be empty', async () => {
    const req = {
      body: {
        name: undefined,
        basePrice: undefined
      }
    }

    const response = await productController.createProduct(req, res)
    expect(response.message).to.be.eq('name cannot be empty')
  })
})

describe('create product images', () => {
  it('should return message insert product images successfully', async () => {
    const req = {
      body: {
        imageUrl: 'https://res.cloudinary.com/dgtv2r5qh/image/upload/v1706338210/coffee-shop-be/products/be46829e-8733-444d-a1dc-766aa2d6582c.png',
        productId: 1
      }
    }

    const response = await productController.createProductImages(req, res)
    expect(response.message).to.be.eq('insert product images successfully')
  })

  it('data with productId 3 is not present in table products', async () => {
    const req = {
      body: {
        imageUrl: 'https://res.cloudinary.com/dgtv2r5qh/image/upload/v1706338210/coffee-shop-be/products/be46829e-8733-444d-a1dc-766aa2d6582c.png',
        productId: 3
      }
    }

    const response = await productController.createProductImages(req, res)
    expect(response.message).to.be.eq('data with productId 3 is not present in table products')
  })

  it('should return message productId cannot be empty', async () => {
    const req = {
      body: {
        productId: undefined,
        imageUrl: undefined
      }
    }

    const response = await productController.createProductImages(req, res)
    expect(response.message).to.be.eq('productId cannot be empty')
  })
})

describe('update product', () => {
  it('should return message update product successfully', async () => {
    const req = {
      params: {
        id: productId
      },
      body: {
        basePrice: 70000
      }
    }

    const response = await productController.updateProduct(req, res)
    expect(response.message).to.be.eq('update product successfully')
  })

  it('should return message invalid input syntax for type integer: x', async () => {
    const req = {
      params: {
        id: productId
      },
      body: {
        basePrice: 'x'
      }
    }

    const response = await productController.updateProduct(req, res)
    expect(response.message).to.be.eq('invalid input syntax for type integer: x')
  })

  it('should return message column tidakAda of relation products does not exist', async () => {
    const req = {
      params: {
        id: productId
      },
      body: {
        tidakAda: 'update'
      }
    }

    const response = await productController.updateProduct(req, res)
    expect(response.message).to.be.eq('column tidakAda of relation products does not exist')
  })

  it('should return message name vanilla syrup already exist', async () => {
    const req = {
      params: {
        id: productId
      },
      body: {
        name: 'vanilla syrup'
      }
    }

    const response = await productController.updateProduct(req, res)
    expect(response.message).to.be.eq('name vanilla syrup already exist')
  })

  it('should return message No data has been modified', async () => {
    const req = {
      params: {
        id: productId
      },
      body: {}
    }

    const response = await productController.updateProduct(req, res)
    expect(response.message).to.be.eq('No data has been modified')
  })

  it('should return message products with id 2026 not found', async () => {
    const req = {
      params: {
        id: '2026'
      },
      body: {
        basePrice: 70000
      }
    }

    const response = await productController.updateProduct(req, res)
    expect(response.message).to.be.eq('product with id 2026 not found')
  })
})

describe('delete product', () => {
  it('should return message delete product successfully', async () => {
    const req = {
      params: {
        id: productId
      }
    }

    const response = await productController.deleteProduct(req, res)
    expect(response.message).to.be.eq('delete product successfully')
  })

  it('should return message invalid input syntax for type integer: x', async () => {
    const req = {
      params: {
        id: 'x'
      }
    }

    const response = await productController.deleteProduct(req, res)
    expect(response.message).to.be.eq('invalid input syntax for type integer: x')
  })

  it('should return message data with id 1 is still referenced from table orderDetails', async () => {
    const req = {
      params: {
        id: '1'
      }
    }

    const response = await productController.deleteProduct(req, res)
    expect(response.message).to.be.eq('data with id 1 is still referenced from table orderDetails')
  })

  it('should return message products with id 2026 not found', async () => {
    const req = {
      params: {
        id: '2026'
      }
    }

    const response = await productController.deleteProduct(req, res)
    expect(response.message).to.be.eq('product with id 2026 not found')
  })
})
