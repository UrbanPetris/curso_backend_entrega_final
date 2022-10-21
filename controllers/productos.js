const { Productos } = require("../models/productos");
const { log, logerror } = require("../lib/logger");

//CHEQUEADO TODO

const getProducts = async (req, res) => {
  let productos = await Productos.find({});
  try {
    res.status(200).render("pages/indexProducts.ejs", {
      data: {
        productos: productos,
        id: req.user._id,
        firstname: req.user.firstname,
        avatar: req.user.avatar,
      },
    });
    log.info(`${req.method} en ${req.originalUrl}`);
  } catch (err) {
    log.error(`Error obteniendo productos ${err}`);
    logerror.error(`Error obteniendo productos ${err}`);
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
    log.info(`${req.method} en ${req.originalUrl}`);
  } catch (err) {
    log.error(`Error agregando producto ${err}`);
    logerror.error(`Error agregando producto ${err}`);
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
      log.info(`${req.method} en ${req.originalUrl}`);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
      log.error(`Error por producto no encontrado ${err}`);
      logerror.error(`Error por producto no encontrado ${err}`);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
    log.error(`Error buscando producto ${err}`);
    logerror.error(`Error buscando producto ${err}`);
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
    log.info(`${req.method} en ${req.originalUrl}`);
  } catch (err) {
    log.error(`Error obteniendo productos ${err}`);
    logerror.error(`Error obteniendo productos ${err}`);
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
      log.error(`Error por producto no encontrado ${err}`);
      logerror.error(`Error por producto no encontrado ${err}`);
    } else {
      res.status(200).json({ message: "Producto actualizado" });
      log.info(`${req.method} en ${req.originalUrl}`);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
    log.error(`Error buscando producto ${err}`);
    logerror.error(`Error buscando producto ${err}`);
  }
};

const deleteProductById = async (req, res) => {
  try {
    const producto = await Productos.findByIdAndDelete(req.params.id);

    if (!producto) {
      res.status(404).json({ error: "Producto no encontrado" });
      log.error(`Error por producto no encontrado ${err}`);
      logerror.error(`Error por producto no encontrado ${err}`);
    } else {
      res.status(200).json({ message: "Producto eliminado" });
      log.info(`${req.method} en ${req.originalUrl}`);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
    log.error(`Error buscando producto para eliminar ${err}`);
    logerror.error(`Error buscando producto para eliminar ${err}`);
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
