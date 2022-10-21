const { Carrito } = require("../models/carrito");
const { Productos } = require("../models/productos");
let ObjectId = require("mongoose").Types.ObjectId;

//CHEQUEADO TODO

//addCarrito: no hay porque el carrito se crea automáticamente con el usuario y tienen el mismo id

const getCarritos = async (req, res) => {
  let carritos = await Carrito.find({});
  try {
    res.status(200).json(carritos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCartById = async (req, res) => {
  try {
    const carrito = await Carrito.findById(req.user._id);
    if (carrito) {
      res.status(200).render("pages/cartProducts.ejs", {
        data: {
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

const deleteCarritoById = async (req, res) => {
  try {
    const carrito = await Carrito.findByIdAndDelete({ _id: req.params.id });
    if (!carrito) {
      res.status(404).json({ error: "Carrito no encontrado" });
    } else {
      res.status(200).json({ message: "Carrito eliminado" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addProductToCartById = async (req, res) => {
  //vendría a ser un updateCartById

  try {
    const quantityToBuy = parseInt(req.body.quantity);
    const producto = await Productos.findById(req.body.id);

    if (producto) {
      //si no encuentra devuelve null y si encuentra devuelve el id del Object
      const productoEnCarrito = await Carrito.exists({
        id: req.user._id,
        "productos._id": new ObjectId(req.body.id),
      });

      if (!productoEnCarrito) {
        //agrego
        let carrito = await Carrito.findByIdAndUpdate(req.user._id, {
          $set: { modifiedOn: new Date() },
          $push: {
            productos: {
              quantity: quantityToBuy,
              ...producto.toJSON(), //si no le pongo .toJSON() producto termina siendo un objeto específico de mongoose y no se fusiona con quantity
            },
          },
        });

        if (!carrito) {
          res.status(404).json({ error: "Carrito no encontrado" });
        } else {
          res.redirect("/carrito/productos");
        }
      } else {
        //actualizo cantidad

        let carrito = await Carrito.updateOne(
          { id: req.user._id, "productos._id": new ObjectId(req.body.id) },
          {
            $set: { modifiedOn: new Date() },
            $inc: { "productos.$.quantity": quantityToBuy },
          }
        );

        if (!carrito) {
          res.status(404).json({ error: "Carrito no encontrado" });
        } else {
          res.redirect("/carrito/productos");
        }
      }
    } else {
      res
        .status(404)
        .json({ error: "Producto a agregar no encontrado en el catálogo" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteProductInCartById = async (req, res) => {
  //vendría a ser un updateCartById
  try {
    const carrito = await Carrito.findByIdAndUpdate(
      req.user._id,
      {
        $pull: {
          productos: { _id: new ObjectId(req.params.id_prod) },
        },
      },
      { new: true }
    );
    if (!carrito) {
      res.status(404).json({ error: "Carrito no encontrado" });
    } else {
      res.status(200).json({ message: "Producto eliminado" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  deleteCarritoById,
  getCarritos,
  addProductToCartById,
  getCartById,
  deleteProductInCartById,
};
