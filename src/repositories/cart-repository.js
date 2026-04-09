import { CartModel } from "../models/cart-model.js";

class CartRepository {
  constructor(model) {
    this.model = model;
  }

  // Crear carrito
  create = async () => {
    try {
      return await this.model.create({ products: [] });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Obtener carrito con populate
  getById = async (id) => {
    try {
      const cart = await this.model
        .findById(id)
        .populate("products.product");

      if (!cart) throw new Error("Carrito no encontrado");

      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Actualizar TODO el carrito
  update = async (id, products) => {
    try {
      return await this.model.findByIdAndUpdate(
        id,
        { products },
        { new: true }
      );
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Vaciar carrito
  clear = async (id) => {
    try {
      return await this.model.findByIdAndUpdate(
        id,
        { products: [] },
        { new: true }
      );
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Guardar cambios manuales 
  save = async (cart) => {
    try {
      return await cart.save();
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

export const cartRepository = new CartRepository(CartModel);