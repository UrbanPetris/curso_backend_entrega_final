const router = require("express").Router();

const {
  getCarritos,
  deleteCarritoById,
  addProductToCartById,
  getCartById,
  deleteProductInCartById,
} = require("../controllers/carrito");
const { checkAuthentication } = require("../middlewares/checkAuthentication");

router.route("/").get(checkAuthentication, getCarritos);
// no hay POST porque el carrito se agregará automaticamente cuando se registra el usuario

// router.route("/:id").delete(checkAuthentication, deleteCarritoById);
// no implementar por ahora

router
  .route("/productos")
  .get(checkAuthentication, getCartById)
  .post(checkAuthentication, addProductToCartById);

router
  .route("/productos/:id_prod")
  .delete(checkAuthentication, deleteProductInCartById);

module.exports = router;
