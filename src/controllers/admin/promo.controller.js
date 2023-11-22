const promoModel = require('../../models/promo.model')
const { errorHandler, listAllData } = require('../../moduls/handling')


exports.getAllPromo = async (req, res) => {       
    return results = await listAllData(promoModel, "promo", res)
}


exports.getDetailPromo = async (req, res) => {                                        
    try {
        const listPromo = await promoModel.findOne(req.body)
        return res.json({                                                              
            success: true,
            messages: 'detail promo',
            results: listPromo                                                  
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.createPromo = async (req, res) => {
    try {
        const listPromo = await promoModel.insert(req.body) 
        return res.json({                                                              
            success: true,
            messages: 'create promo successfully',
            results: listPromo                                                   
        })
        
    } catch (error) {
        return errorHandler(error, res, 'name or code already exist')
    }
}


exports.updatePromo = async (req, res) => {
    try {
        const listPromo = await promoModel.update(parseInt(req.params.id), req.body) 
        return res.json({                                                              
            success: true,
            messages: 'update promo successfully',
            results: listPromo                                                   
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.deletePromo = async (req, res) => {
    try {
        const listPromo = await promoModel.delete(parseInt(req.params.id)) 
        return res.json({                                                              
            success: true,
            messages: 'delete promo successfully',
            results: listPromo                                                   
        })
    } catch (error) {
        errorHandler(error, res)
    }
}