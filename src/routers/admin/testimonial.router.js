const testimonialRouter = require("express").Router();

const testimonialController = require("../../controllers/admin/testimonial.controller");

const uploadMiddleware = require("../../middleware/upload.middleware");

const multerErrorHandler = require("../../middleware/multerErrorHandler.middleware");

testimonialRouter.get("/", testimonialController.getAllTestimonial);
testimonialRouter.get("/:id", testimonialController.getDetailTestimonial);
testimonialRouter.post(
  "/",
  uploadMiddleware("testimonial").single("image"),
  multerErrorHandler,
  testimonialController.createTestimonial
);
testimonialRouter.patch(
  "/:id",
  uploadMiddleware("testimonial").single("image"),
  multerErrorHandler,
  testimonialController.updateTestimonial
);
testimonialRouter.delete("/:id", testimonialController.deleteTestimonial);

module.exports = testimonialRouter;