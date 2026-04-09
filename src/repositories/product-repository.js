import { ProductModel } from "../models/product-model.js";

class ProductRepository {
  constructor(model) {
    this.model = model;
  }

  // Obtener todos los productos
  getAll = async () => {
    try {
      return await this.model.find();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Ehhh
  getPaginated = async ({ filter, options }) => {
    try {
      return await this.model.paginate(filter, options);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Obtener producto por ID
  getById = async (id) => {
    try {
      const product = await this.model.findById(id);
      if (!product) throw new Error("Producto no encontrado");
      return product;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Crear producto
  create = async (body) => {
    try {
      return await this.model.create(body);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Actualizar producto
  update = async (id, body) => {
    try {
      const product = await this.model.findByIdAndUpdate(id, body, { new: true });
      if (!product) throw new Error("Producto no encontrado");
      return product;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Eliminar producto
  delete = async (id) => {
    try {
      const product = await this.model.findByIdAndDelete(id);
      if (!product) throw new Error("Producto no encontrado");
      return product;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

export const productRepository = new ProductRepository(ProductModel);