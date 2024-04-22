const testiModel = require('../../models/testimonial.model')
const { errorHandler, updateColumn } = require('../../moduls/handling')
const { v2: cloudinary } = require('cloudinary')

exports.getAllTestimonial = async (req, res) => {
  try {
    const { searchKey, sortBy, order, page = 1, limit } = req.query
    const limitData = parseInt(limit) || 5

    const count = await testiModel.countAll(searchKey)
    const listTestimonial = await testiModel.findAll(searchKey, sortBy, order, page, limitData)

    const totalPage = Math.ceil(count / limitData)
    const nextPage = parseInt(page) + 1
    const prevPage = parseInt(page) - 1

    return res.json({
      success: true,
      message: 'List all testimonial',
      pageInfo: {
        currentPage: parseInt(page),
        nextPage: nextPage <= totalPage ? nextPage : null,
        totalPage,
        prevPage: prevPage >= 1 ? prevPage : null,
        totalData: parseInt(count)
      },
      results: listTestimonial
    })
  } catch (error) {
    return errorHandler(error, res)
  }
}

exports.getDetailTestimonial = async (req, res) => {
  try {
    const testi = await testiModel.findOne(req.params.id)
    return res.json({
      success: true,
      message: 'detail testimonial',
      results: testi
    })
  } catch (error) {
    return errorHandler(error, res)
  }
}

exports.createTestimonial = async (req, res) => {
  try {
    const testi = await testiModel.insert(req.body)
    return res.json({
      success: true,
      message: 'create testimonial successfully',
      results: testi
    })
  } catch (error) {
    return errorHandler(error, res)
  }
}

exports.updateTestimonial = async (req, res) => {
  try {
    const data = await testiModel.findOne(req.params.id)

    if (req.file) {
      // if(data.image){                                                                             // jika data sebelumnya mempunyai gambar, maka gambar akan di hapus dan di ganti dengna gambar yg baru di upload
      //     const imagePath = path.join(global.path, 'uploads', 'testimonial', data.image)             // mengambil jalur path gambar
      //     console.log(imagePath)
      //     fs.access(imagePath, fs.constants.R_OK).then(() => {
      //         fs.rm(imagePath)                                                                  // menghapus file berdasarkan jalur path
      //     }).catch(() => {});                                                                  // menghapus file berdasarkan jalur path
      // }

      if (data.image) {
        cloudinary.search
          .expression(`${encodeURIComponent(data.image)}`)
          .max_results(1)
          .execute()
          .then(result => {
            cloudinary.uploader.destroy(result.resources[0].public_id)
              .then(result => console.log({ ...result, message: 'delete image success' }))
              .catch(err => console.log(err))
          }).catch(err => console.log(err))
      }

      console.log(req.file)
      // req.body.image = req.file.filename
      req.body.image = req.file.path
    }

    const testi = await updateColumn(req.params.id, req.body, 'testimonial')

    return res.json({
      success: true,
      message: 'update testimonial successfully',
      results: testi
    })
  } catch (error) {
    return errorHandler(error, res)
  }
}

exports.deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await testiModel.delete(req.params.id)

    // if(product.image){
    //     const imagePath = path.join(global.path, "uploads", "products", product.image)              // mengambil jalur path image
    //     console.log(imagePath)
    //     fs.access(imagePath, fs.constants.R_OK).then(() => {
    //         fs.rm(imagePath)                                                                  // menghapus file berdasarkan jalur path
    //     }).catch(() => {});                                                                      // menghapus file berdasarkan jalur path
    // }

    if (testimonial.image) {
      cloudinary.search
        .expression(`${encodeURIComponent(testimonial.image)}`)
        .max_results(1)
        .execute()
        .then(result => {
          cloudinary.uploader.destroy(result.resources[0].public_id)
            .then(result => console.log({ ...result, message: 'delete image success' }))
            .catch(() => {})
        }).catch(() => {})
    }

    return res.json({
      success: true,
      message: 'delete testimonial successfully',
      results: testimonial
    })
  } catch (error) {
    return errorHandler(error, res)
  }
}
