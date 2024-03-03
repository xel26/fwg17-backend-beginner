const categoriesRouter = require("express").Router();

const categoriesController = require("../../controllers/admin/categories.controller");

categoriesRouter.get("/", categoriesController.getAllCategories);
categoriesRouter.get("/:id", categoriesController.getDetailCategory);
categoriesRouter.post("/", categoriesController.createCategory);
categoriesRouter.patch("/:id", categoriesController.updateCategory);
categoriesRouter.delete("/:id", categoriesController.deleteCategory);

module.exports = categoriesRouter;