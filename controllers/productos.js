const { Productos } = require("../models/productos");
const { loguear } = require("../lib/logger");

const getProducts = async (req, res) => {
  let productos = await Productos.find({});
  try {
    res.status(200).render("pages/indexProducts.ejs", {
      data: {
        productos: productos,
        id: req.user._id,
        email: req.user.email,
        firstname: req.user.firstname,
        avatar: req.user.avatar,
      },
    });
    loguear(`${req.method} en ${req.originalUrl}`, "info");
  } catch (err) {
    loguear(`Error obteniendo productos ${err}`, "error");
    loguear(`Error obteniendo productos ${err}`, "error", "devError");
    res.status(500).json({ message: err.message });
  }
};

const addProduct = async (req, res) => {
  const product = new Productos({
    ...req.body,
  });
  try {
    await product.save();
    res.status(201).json(product);
    loguear(`${req.method} en ${req.originalUrl}`, "info");
  } catch (err) {
    loguear(`Error agregando producto ${err}`, "error");
    loguear(`Error agregando producto ${err}`, "error", "devError");

    res.status(500).json({ message: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const producto = await Productos.findById(req.params.id);

    if (producto) {
      res.status(201).render("pages/productDetails.ejs", {
        data: {
          id: req.user._id,
          firstname: req.user.firstname,
          avatar: req.user.avatar,
          producto: producto,
        },
      });
      loguear(`${req.method} en ${req.originalUrl}`, "info");
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
      loguear(`Error por producto no encontrado ${err}`, "error");
      loguear(`Error por producto no encontrado ${err}`, "error", "devError");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
    loguear(`Error buscando producto ${err}`, "error");
    loguear(`Error buscando producto ${err}`, "error", "devError");
  }
};

const getProductsByCategory = async (req, res) => {
  let productos = await Productos.find({
    category: req.params.category,
  }).exec();

  try {
    res.status(200).render("pages/indexProducts.ejs", {
      data: {
        productos: productos,
        id: req.user._id,
        firstname: req.user.firstname,
        avatar: req.user.avatar,
      },
    });
    loguear(`${req.method} en ${req.originalUrl}`, "info");
  } catch (err) {
    loguear(`Error obteniendo productos ${err}`, "error");
    loguear(`Error obteniendo productos ${err}`, "error", "devError");

    res.status(500).json({ message: err.message });
  }
};

const updateProductById = async (req, res) => {
  try {
    const producto = await Productos.findByIdAndUpdate(req.params.id, {
      $set: { ...req.body },
    });

    if (!producto) {
      res.status(404).json({ error: "Producto no encontrado" });
      loguear(`Error por producto no encontrado ${err}`, "error");
      loguear(`Error por producto no encontrado ${err}`, "error", "devError");
    } else {
      res.status(200).json({ message: "Producto actualizado" });
      loguear(`${req.method} en ${req.originalUrl}`, "info");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
    loguear(`Error buscando producto ${err}`, "error");
    loguear(`Error buscando producto ${err}`, "error", "devError");
  }
};

const deleteProductById = async (req, res) => {
  try {
    const producto = await Productos.findByIdAndDelete(req.params.id);

    if (!producto) {
      res.status(404).json({ error: "Producto no encontrado" });
      loguear(`Error por producto no encontrado ${err}`, "error");
      loguear(`Error por producto no encontrado ${err}`, "error", "devError");
    } else {
      res.status(200).json({ message: "Producto eliminado" });
      loguear(`${req.method} en ${req.originalUrl}`, "info");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
    loguear(`Error buscando producto para eliminar ${err}`, "error");
    loguear(
      `Error buscando producto para eliminar ${err}`,
      "error",
      "devError"
    );
  }
};

module.exports = {
  getProducts,
  addProduct,
  getProductById,
  getProductsByCategory,
  updateProductById,
  deleteProductById,
};
