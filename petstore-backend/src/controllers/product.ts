import productModel from "../model/product";

const createProduct = async (req: any, res: any) => {
  try {
    const { name, location, day_price } = req.body;
    const result = await productModel.createProduct({
      name,
      location,
      day_price,
    });
    res.status(201).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getProducts = async (req: any, res: any) => {
  try {
    const result = await productModel.getProducts();
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getProductById = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const result = await productModel.getProductById(id);
    if(result){

      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req: any, res: any) => {
  try {
    const {id,  name, location, day_price,in_maintenance } = req.body;
    const result = await productModel.updateProduct({
      id,
      name,
      location,
      day_price,
      in_maintenance,
    });
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const result = await productModel.deleteProduct(id);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const updateProductMaintenanceStatus = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const result = await productModel.updateProductMaintenanceStatus(id,);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getProductsLocation = async (req: any, res: any) => {
  try {
    const result = await productModel.getProductsLocation();
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
  updateProductMaintenanceStatus,
  getProductsLocation
};
