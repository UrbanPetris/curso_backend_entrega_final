const router = require("express").Router();

const {
  addCarrito,
  getCarritos,
  deleteCarritoById,
  addProductToCartById,
  getProductsInCartById,
  deleteProductInCartById,
} = require("../controllers/carrito");
const { checkAuthentication } = require("../middlewares/checkAuthentication");

router.route("/").get(checkAuthentication, getCarritos);
// .post(checkAuthentication, addCarrito);
// el carrito se agregará automaticamente cuando se registra el usuario

// router.route("/:id").delete(checkAuthentication, deleteCarritoById);
// no implementar por ahora

router
  .route("/:id/productos")
  .get(checkAuthentication, getProductsInCartById)
  .post(checkAuthentication, addProductToCartById);

router
  .route("/:id/productos/:id_prod")
  .delete(checkAuthentication, deleteProductInCartById);

module.exports = router;
