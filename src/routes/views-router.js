import { Router } from "express";
import ProductManager from "../managers/product-manager.js";

const router = Router();
const productManager = new ProductManager();

/* Vista Home */
router.get("/home", (req, res) => {

    const products = productManager.getProducts();

    res.render("home", { products });

});

/* Vista realtime */
router.get("/realtimeproducts", (req, res) => {
    res.render("realTimeProducts");
});

export default router;