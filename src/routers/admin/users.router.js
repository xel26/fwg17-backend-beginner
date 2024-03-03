const userRouter = require("express").Router();

const userController = require("../../controllers/admin/user.controller");

const uploadMiddleware = require("../../middleware/upload.middleware");

const multerErrorHandler = require("../../middleware/multerErrorHandler.middleware");

userRouter.get("/", userController.getAllUsers);
userRouter.get("/:id", userController.getDetailUser);
userRouter.post(
  "/",
  uploadMiddleware("users").single("picture"),
  multerErrorHandler,
  userController.createUser
);
userRouter.patch(
  "/:id",
  uploadMiddleware("users").single("picture"),
  multerErrorHandler,
  userController.updateUser
);
userRouter.delete("/:id", userController.deleteUser);

module.exports = userRouter;
