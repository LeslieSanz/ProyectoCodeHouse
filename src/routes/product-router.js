import { Router } from "express";
import ProductManager from "../managers/product-manager.js";

const router = Router();
const productManager = new ProductManager();

/* =====================================================
   Crear nuevo producto
===================================================== */
router.post("/", (req, res) => {
    const response = productManager.addProduct(req.body);
    res.json(response);
});

/* =====================================================
   Listar todos los productos
===================================================== */
router.get("/", (req, res) => {
    const response = productManager.getProducts();
    res.json(response);
});

/* =====================================================
   Obtener producto por ID
===================================================== */
router.get("/:pid", (req, res) => {
    const { pid } = req.params;
    const response = productManager.getProductById(pid);
    res.json(response);
});

/* =====================================================
   Actualizar producto
===================================================== */
router.put("/:pid", (req, res) => {
    const { pid } = req.params;
    const response = productManager.updateProduct(pid, req.body);
    res.json(response);
});

/* =====================================================
   Eliminar producto
===================================================== */
router.delete("/:pid", (req, res) => {
    const { pid } = req.params;
    const response = productManager.deleteProduct(pid);
    res.json(response);
});

export default router;
