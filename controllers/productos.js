const { Productos } = require("../models/productos");
const { log, logerror } = require("../lib/logger");

const findProduct = async (id) => {
  return await Productos.findById(id);
};

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
    res.status(201).render("pages/addProduct.ejs", {
      data: {
        id: req.user._id,
        firstname: req.user.firstname,
        avatar: req.user.avatar,
      },
    });
    log.info(`${req.method} en ${req.originalUrl}`);
  } catch (err) {
    log.error(`Error agregando productos ${err}`);
    logerror.error(`Error agregando productos ${err}`);
    res.status(500).json({ message: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const producto = await findProduct(req.params.id);

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

const updateProductById = async (req, res) => {
  try {
    const producto = await findProduct(req.params.id);
    if (producto) {
      await Productos.updateOne({ _id: req.params.id }, req.body);
      res.status(200).json({ message: "Producto actualizado" });
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

const deleteProductById = async (req, res) => {
  try {
    const producto = await findProduct(req.params.id);
    if (producto) {
      await Productos.deleteOne({ _id: req.params.id });
      res.status(200).json({ message: "Producto eliminado" });
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

module.exports = {
  getProducts,
  addProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  findProduct,
};
