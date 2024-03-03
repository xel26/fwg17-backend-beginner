const publicRouter = require("express").Router();

const productController = require("../../controllers/admin/product.controller");
const testimonilaController = require("../../controllers/admin/testimonial.controller");
const checkoutController = require("../../controllers/checkout.controller");

publicRouter.get("/products", productController.getAllProducts);
publicRouter.get("/product/:id", productController.getDetailProduct);
publicRouter.get("/testimonial", testimonilaController.getAllTestimonial);
publicRouter.get("/data-size", checkoutController.getDataSize);
publicRouter.get("/data-variant", checkoutController.getDataVariant);

module.exports = publicRouter;