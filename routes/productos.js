const router = require("express").Router();
const {
  getProducts,
  addProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  getProductsByCategory,
} = require("../controllers/productos");
const { checkAuthentication } = require("../middlewares/checkAuthentication");

router
  .route("/")
  .get(checkAuthentication, getProducts)
  .post(checkAuthentication, addProduct);

router
  .route("/category/:category")
  .get(checkAuthentication, getProductsByCategory);

router
  .route("/:id")
  .get(checkAuthentication, getProductById)
  .put(checkAuthentication, updateProductById)
  .delete(checkAuthentication, deleteProductById);

module.exports = router;
