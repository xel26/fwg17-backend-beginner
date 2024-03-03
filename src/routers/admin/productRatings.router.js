const prRouter = require("express").Router();

const prController = require("../../controllers/admin/ProductRatings.controller");

prRouter.get("/", prController.getAllProductRatings);
prRouter.get("/:id", prController.getDetailProductRating);
prRouter.post("/", prController.createProductRating);
prRouter.patch("/:id", prController.updateProductRating);
prRouter.delete("/:id", prController.deleteProductRating);

module.exports = prRouter;
