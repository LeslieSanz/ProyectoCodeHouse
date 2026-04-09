import { Router } from "express";
import { cartRepository } from "../repositories/cart-repository.js";

const router = Router();

/* =====================================================
   Crear carrito
===================================================== */
router.post("/", async (req, res) => {
  try {
    const cart = await cartRepository.create();
    res.json({ status: "success", payload: cart });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

/* =====================================================
   Obtener carrito con populate
===================================================== */
router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartRepository.getById(cid);

    res.json({ status: "success", payload: cart });
  } catch (error) {
    res.status(404).json({ status: "error", message: error.message });
  }
});

/* =====================================================
   Agregar producto al carrito
===================================================== */
router.post("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const cart = await cartRepository.getById(cid);

    const existingProduct = cart.products.find(
      p => p.product._id.toString() === pid
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push({
        product: pid,
        quantity: 1
      });
    }

    await cartRepository.save(cart);

    res.json({ status: "success", payload: cart });

  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});

/* =====================================================
   PUT actualizar todo el carrito
===================================================== */
router.put("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const { products } = req.body;

    const updated = await cartRepository.update(cid, products);

    res.json({ status: "success", payload: updated });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});

/* =====================================================
   PUT actualizar solo la cantidad de un producto
===================================================== */
router.put("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const cart = await cartRepository.getById(cid);

    const product = cart.products.find(
      p => p.product._id.toString() === pid
    );

    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "Producto no está en el carrito"
      });
    }

    product.quantity = quantity;

    await cartRepository.save(cart);

    res.json({ status: "success", payload: cart });

  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});

/* =====================================================
   DELETE producto del carrito
===================================================== */
router.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const cart = await cartRepository.getById(cid);

    cart.products = cart.products.filter(
      p => p.product._id.toString() !== pid
    );

    await cartRepository.save(cart);

    res.json({ status: "success", payload: cart });

  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});

/* =====================================================
   DELETE vaciar carrito
===================================================== */
router.delete("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;

    const cart = await cartRepository.clear(cid);

    res.json({ status: "success", payload: cart });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});

export default router;