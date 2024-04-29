const { describe, it, before, after } = require('mocha')
const { expect } = require('chai')
const supertest = require('supertest')
const app = require('../../../..')

const request = supertest(app)

const orderModel = require('../../../models/order.model')
const orderDetailsModel = require('../../../models/orderDetails.model')

describe('/checkout endpoint testing', () => {
  let userToken = ''
  let orderId

  before(async () => {
    const form = new URLSearchParams({
      email: 'shellaananda2636@gmail.com',
      password: '123'
    })
    const res = await request
      .post('/login')
      .send(form.toString())
    userToken = res.body.results.token
  })

  after(async () => {
    await orderDetailsModel.deleteByOrderId(orderId)
    await orderModel.delete(orderId)
  })

  const form = new URLSearchParams({
    productId: '',
    sizeProduct: '',
    variantProduct: '',
    quantityProduct: '',
    deliveryShipping: ''
  })

  it('should return message create order successfully', async () => {
    form.set('productId', '1,2,4')
    form.set('sizeProduct', 'Regular,Large,Medium')
    form.set('variantProduct', 'cold,hot,cold')
    form.set('quantityProduct', '1,2,2')
    form.set('deliveryShipping', 'Pick Up')

    const res = await request.post('/checkout')
      .auth(userToken, {
        type: 'bearer'
      })
      .send(form.toString())

    orderId = res.body.results.id
    expect(res.body.message).to.be.eq('create order successfully')
  })

  it('should return message data with productId 3 is not present in table products', async () => {
    form.set('productId', '3')
    form.set('sizeProduct', 'Regular')
    form.set('variantProduct', 'cold')
    form.set('quantityProduct', '1')

    const res = await request.post('/checkout')
      .auth(userToken, {
        type: 'bearer'
      })
      .send(form.toString())

    expect(res.body.message).to.be.eq('data with productId 3 is not present in table products')
  })

  it('should return message size small not found', async () => {
    form.set('productId', '4')
    form.set('sizeProduct', 'small')

    const res = await request.post('/checkout')
      .auth(userToken, {
        type: 'bearer'
      })
      .send(form.toString())

    expect(res.body.message).to.be.eq('size small not found')
  })

  it('should return message variant extra spicy not found', async () => {
    form.set('sizeProduct', 'regular')
    form.set('variantProduct', 'extra spicy')

    const res = await request.post('/checkout')
      .auth(userToken, {
        type: 'bearer'
      })
      .send(form.toString())

    expect(res.body.message).to.be.eq('variant extra spicy not found')
  })
})
