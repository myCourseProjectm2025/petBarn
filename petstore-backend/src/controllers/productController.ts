import productModel from "../model/productModel";

const createProduct = async (req: any, res: any) => {
  try {
    const {id} = req.token;
    const { amount, description, quantity, brand, image_url, product_name } = req.body;
    const result = await productModel.createProduct({
      amount,
      description,
      quantity,
      brand,
      image_url,
      product_name,
      user_id: id,
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
    const { amount, description, quantity, brand, image_url, product_name, productId } = req.body;
    const result = await productModel.updateProduct({
      amount,
      description,
      quantity,
      brand,
      image_url,
      product_name,
      user_id: 0,
    },productId);
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




export {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
};
