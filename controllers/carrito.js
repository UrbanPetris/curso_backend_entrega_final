const { Carrito } = require("../models/carrito");
const { findProduct } = require("./productos");

const findCarritoByid = async (id) => {
  return await Carrito.findById(id);
};

const emptyCarritoByid = async (id) => {
  return await Carrito.findOneAndUpdate(
    { _id: id },
    {
      // $set: { modifiedOn: new Date(), productos: (productos.length = 0) },
      modifiedOn: new Date(),
      productos: [],
    }
  );
};

const getCarritos = async (req, res) => {
  let carritos = await Carrito.find({});
  try {
    res.status(200).json(carritos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//este método queda deprecado... el carrito se crea automáticamente con el usuario y tienen el mismo id
// const addCarrito = async (req, res) => {
//   try {
//     const nuevoCarrito = new Carrito({ modifiedOn: new Date() });
//     await nuevoCarrito.save();
//     res.status(201).json({ id: nuevoCarrito._id });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

const deleteCarritoById = async (req, res) => {
  try {
    const carrito = await findCarritoByid(req.params.id);
    if (carrito) {
      await Carrito.deleteOne({ _id: req.params.id });

      res.status(200).json({ message: "Carrito eliminado" });
    } else {
      res.status(404).json({ error: "Carrito no encontrado" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addProductToCartById = async (req, res) => {
  try {
    const carrito = await findCarritoByid(req.params.id);
    if (carrito) {
      const producto = await findProduct(req.body.id);
      const quantity = parseInt(req.body.quantity);

      if (producto) {
        const carritoUrl = `/carrito/${req.user.id}/productos`;
        await Carrito.updateOne(
          { _id: req.params.id },
          {
            $set: { modifiedOn: new Date() },
            $push: {
              productos: {
                quantity,
                ...producto.toJSON(), //si no le pongo .toJSON() producto termina siendo un objeto específico de mongoose y no se fusiona con quantity
              },
            },
          }
        );
        res.redirect(carritoUrl);
        // res.status(200).json({ message: "Producto agregado" });
      } else {
        res.status(404).json({ error: "Producto no encontrado" });
      }
    } else {
      res.status(404).json({ error: "Carrito no encontrado" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProductsInCartById = async (req, res) => {
  try {
    const carrito = await findCarritoByid(req.params.id);
    if (carrito) {
      const totalPrice = carrito.productos.reduce((total, product) => {
        return total + product.price * product.quantity;
      }, 0);
      res.status(200).render("pages/cartProducts.ejs", {
        data: {
          total: totalPrice,
          productos: carrito.productos,
          id: req.user._id,
          firstname: req.user.firstname,
          avatar: req.user.avatar,
        },
      });
    } else {
      res.status(404).json({ error: "Carrito no encontrado" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteProductInCartById = async (req, res) => {
  try {
    const carrito = await findCarritoByid(req.params.id);
    if (carrito) {
      const producto = findProduct(req.params.id_prod);

      if (producto) {
        await Carrito.updateOne(
          { _id: req.params.id },
          {
            $pull: {
              productos: {
                _id: req.params.id_prod,
              },
            },
          }
        );

        res.status(200).json({ message: "Producto eliminado" });
      } else {
        res.status(404).json({ error: "Producto no encontrado" });
      }
    } else {
      res.status(404).json({ error: "Carrito no encontrado" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  // addCarrito,
  findCarritoByid,
  emptyCarritoByid,
  deleteCarritoById,
  getCarritos,
  addProductToCartById,
  getProductsInCartById,
  deleteProductInCartById,
};
