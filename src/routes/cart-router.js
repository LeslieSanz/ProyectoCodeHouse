import { Router } from "express";
import CartManager from "../managers/cart-manager.js";
import ProductManager from "../managers/product-manager.js";

const router = Router();

const productManager = new ProductManager();
const cartManager = new CartManager(productManager);

/* =====================================================
   Crear nuevo carrito
===================================================== */
router.post("/", (req, res) => {
    const response = cartManager.create();
    res.json(response);
});

/* =====================================================
   Obtener los productos de un carrito
===================================================== */
router.get("/:cid", (req, res) => {
    const response = cartManager.getProductsById(req.params.cid);
    res.json(response);
});

/* =====================================================
   Agregar producto a un carrito
===================================================== */
router.post("/:cid/product/:pid", (req, res) => {
    const response = cartManager.addProductToCart(
        req.params.cid,
        req.params.pid
    );
    res.json(response);
});

export default router;