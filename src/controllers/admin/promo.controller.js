const promoModel = require('../../models/promo.model')
const { errorHandler } = require('../../moduls/handling')


exports.getAllPromo = async (req, res) => {       
    const {searchKey, sortBy, order, page} = req.query      
    try {
        const listPromo = await promoModel.findAll(searchKey, sortBy, order, page)
        if(!listPromo.length){
            return res.status(404).json({
                success: false,
                message: `no data found`
            })
        }
        return res.json({                                                              
            success: true,
            message: `List all promo`,
            results: listPromo                                                    
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.getDetailPromo = async (req, res) => {                                        
    try {
        const promo = await promoModel.findOne(parseInt(req.params.id))
        return res.json({                                                              
            success: true,
            message: 'detail promo',
            result: promo                                                  
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.createPromo = async (req, res) => {
    try {
        const promo = await promoModel.insert(req.body) 
        return res.json({                                                              
            success: true,
            message: 'create promo successfully',
            result: promo                                                   
        })
        
    } catch (error) {
        return errorHandler(error, res, 'name or code already exist')
    }
}


exports.updatePromo = async (req, res) => {
    try {
        const promo = await promoModel.update(parseInt(req.params.id), req.body)
        if(promo === "No data has been modified"){
            return res.status(200).json({                                                              
                success: true,
                message: promo                                                 
            })
        }
        return res.json({                                                              
            success: true,
            message: 'update promo successfully',
            result: promo                                                   
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.deletePromo = async (req, res) => {
    try {
        const promo = await promoModel.delete(parseInt(req.params.id)) 
        return res.json({                                                              
            success: true,
            message: 'delete promo successfully',
            result: promo                                                   
        })
    } catch (error) {
        errorHandler(error, res)
    }
}