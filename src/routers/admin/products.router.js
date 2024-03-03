const productRouter = require("express").Router();

const productController = require("../../controllers/admin/product.controller");

const uploadMiddleware = require("../../middleware/upload.middleware");

const multerErrorHandler = require("../../middleware/multerErrorHandler.middleware");

productRouter.get("/", productController.getAllProducts);
productRouter.get("/:id", productController.getDetailProduct);
productRouter.post(
  "/",
  uploadMiddleware("products").single("image"),
  multerErrorHandler,
  productController.createProduct
);
productRouter.post(
  "/create-product-images",
  uploadMiddleware("productImages").single("imageUrl"),
  multerErrorHandler,
  productController.createProductImages
);
productRouter.patch(
  "/:id",
  uploadMiddleware("products").single("image"),
  multerErrorHandler,
  productController.updateProduct
);
productRouter.delete("/:id", productController.deleteProduct);

module.exports = productRouter;