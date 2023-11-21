const promoRouter = require('express').Router()

const promoController = require('../controllers/promo.controller')                // import module user.controller yg berbentuk object yg berisi logika program

promoRouter.get('/', promoController.getAllPromo)                                 // client mengirim permintaan pengambilan data, lalu server menjalankan logika program
promoRouter.get('/:id', promoController.getDetailPromo)                         // client mengirim permintaan pengambilan data, ~
promoRouter.post('/', promoController.createPromo)                                 // client mengirim permintaan memasukan data, ~
promoRouter.patch('/:id', promoController.updatePromo)                             // client mengirim permintaan merubah data, ~
promoRouter.delete('/:id', promoController.deletePromo)                            // client mengirim permintaan menghapus data, ~

module.exports = promoRouter                                                     