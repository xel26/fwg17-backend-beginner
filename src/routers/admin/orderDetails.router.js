const orderDetail = require('express').Router()

const orderDetailController = require('../../controllers/admin/orderDetail.controller')                // import module user.controller yg berbentuk object yg berisi logika program

orderDetail.get('/', orderDetailController.getAllOrderDetail)                                 // client mengirim permintaan pengambilan data, lalu server menjalankan logika program
orderDetail.get('/:id', orderDetailController.getDetailOrderDetail)                         // client mengirim permintaan pengambilan data, ~
orderDetail.post('/', orderDetailController.createOrderDetail)                                 // client mengirim permintaan memasukan data, ~
orderDetail.patch('/:id', orderDetailController.updateOrderDetail)                             // client mengirim permintaan merubah data, ~
orderDetail.delete('/:id', orderDetailController.deleteOrderDetail)                            // client mengirim permintaan menghapus data, ~

module.exports = orderDetail                                                     