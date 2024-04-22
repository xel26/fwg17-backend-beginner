const { describe, it } = require('mocha')
const { expect } = require('chai')

const testimonialController = require('../../controllers/admin/testimonial.controller')

const res = {
  status: (status) => {
    return res
  },
  json: (param) => {
    return param
  }
}

let testimonialId

describe('List all testimonial', () => {
  let lastPage

  it('should return message List all testimonial', async () => {
    const req = {
      query: {
        order: 'tidak ada'
      }
    }

    const response = await testimonialController.getAllTestimonial(req, res)
    lastPage = response.pageInfo.totalPage
    expect(response.message).to.be.eq('List all testimonial')
  })

  it('should return message data testimonial not found', async () => {
    const req = {
      query: {
        searchKey: 'tidak ada'
      }
    }

    const response = await testimonialController.getAllTestimonial(req, res)
    expect(response.message).to.be.eq('data testimonial not found')
  })

  it('should return nextPage null', async () => {
    const req = {
      query: {
        page: lastPage
      }
    }

    const response = await testimonialController.getAllTestimonial(req, res)
    expect(response.pageInfo.nextPage).to.be.null
  })

  it('should return prevPage null', async () => {
    const req = {
      query: {
        page: 1
      }
    }

    const response = await testimonialController.getAllTestimonial(req, res)
    expect(response.pageInfo.prevPage).to.be.null
  })

  it('should return message column tidak ada does not exist', async () => {
    const req = {
      query: {
        sortBy: 'tidak ada'
      }
    }

    const response = await testimonialController.getAllTestimonial(req, res)
    expect(response.message).to.be.eq('column tidak ada does not exist')
  })
})

describe('create testimonial', () => {
  it('should return message create testimonial successfully', async () => {
    const req = {
      body: {
        fullName: 'unit test',
        role: 'test',
        feedback: 'example',
        rate: '5'
      }
    }

    const response = await testimonialController.createTestimonial(req, res)
    testimonialId = response.results.id
    expect(response.message).to.be.eq('create testimonial successfully')
  })

  it('should return message fullName cannot be empty', async () => {
    const req = {
      body: {
        fullName: undefined,
        role: undefined,
        feedback: undefined,
        rate: undefined
      }
    }

    const response = await testimonialController.createTestimonial(req, res)
    expect(response.message).to.be.eq('fullName cannot be empty')
  })
})

describe('detail testimonial', () => {
  it('should return message detail size', async () => {
    const req = {
      params: {
        id: testimonialId
      }
    }

    const response = await testimonialController.getDetailTestimonial(req, res)
    expect(response.message).to.be.eq('detail testimonial')
  })

  it('should return message invalid input syntax for type integer: x', async () => {
    const req = {
      params: {
        id: 'x'
      }
    }

    const response = await testimonialController.getDetailTestimonial(req, res)
    expect(response.message).to.be.eq('invalid input syntax for type integer: x')
  })

  it('should return message testimonial with id 2026 not found', async () => {
    const req = {
      params: {
        id: '2026'
      }
    }

    const response = await testimonialController.getDetailTestimonial(req, res)
    expect(response.message).to.be.eq('testimonial with id 2026 not found')
  })
})

describe('update testimonial', () => {
  it('should return message update testimonial successfully', async () => {
    const req = {
      params: {
        id: testimonialId
      },
      body: {
        fullName: 'unit test',
        role: 'test',
        feedback: 'example',
        rate: '4'
      }
    }

    const response = await testimonialController.updateTestimonial(req, res)
    expect(response.message).to.be.eq('update testimonial successfully')
  })

  it('should return message column tidakAda of relation testimonial does not exist', async () => {
    const req = {
      params: {
        id: testimonialId
      },
      body: {
        tidakAda: 'update'
      }
    }

    const response = await testimonialController.updateTestimonial(req, res)
    expect(response.message).to.be.eq('column tidakAda of relation testimonial does not exist')
  })

  it('should return message No data has been modified', async () => {
    const req = {
      params: {
        id: testimonialId
      },
      body: {}
    }

    const response = await testimonialController.updateTestimonial(req, res)
    expect(response.message).to.be.eq('No data has been modified')
  })

  it('should return message testimonial with id 2026 not found', async () => {
    const req = {
      params: {
        id: '2026'
      },
      body: {
        fullName: 'unit test'
      }
    }

    const response = await testimonialController.updateTestimonial(req, res)
    expect(response.message).to.be.eq('testimonial with id 2026 not found')
  })
})

describe('delete testimonial', () => {
  it('should return message delete testimonial successfully', async () => {
    const req = {
      params: {
        id: testimonialId
      }
    }

    const response = await testimonialController.deleteTestimonial(req, res)
    expect(response.message).to.be.eq('delete testimonial successfully')
  })

  it('should return message invalid input syntax for type integer: x', async () => {
    const req = {
      params: {
        id: 'x'
      }
    }

    const response = await testimonialController.deleteTestimonial(req, res)
    expect(response.message).to.be.eq('invalid input syntax for type integer: x')
  })

  it('should return message testimonial with id 2026 not found', async () => {
    const req = {
      params: {
        id: '2026'
      }
    }

    const response = await testimonialController.deleteTestimonial(req, res)
    expect(response.message).to.be.eq('testimonial with id 2026 not found')
  })
})
