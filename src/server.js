import express from "express";
import ProductManager from "./managers/product-manager.js";
import CartManager from "./managers/cart-manager.js";

const app = express();
const PORT = 8080;

const productManager = new ProductManager();
const cartManager = new CartManager(productManager);

// Middleware para leer JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de prueba
app.get("/", (req, res) => {
    res.send("Servidor de primera practica funcionando correctamente!");
});

app.listen(PORT, () => {
    console.log(`Servidor de primera practica escuchando en puerto ${PORT}`);
});

/*--------------------------------- Rutas para Manejo de Productos (/api/products/ )-------------------------------------------------*/

/* =====================================================
   Crear nuevo producto
===================================================== */
app.post("/api/products", (req, res) => {
    const response = productManager.addProduct(req.body);
    res.json(response)
});

/* =====================================================
   Listar todos los productos
===================================================== */
app.get("/api/products", (req, res) => {
    const response = productManager.getProducts();
    res.json(response);
});

/* =====================================================
   Obtener producto por ID
===================================================== */
app.get("/api/products/:pid", (req, res) => {
    const { pid } = req.params;
    const response = productManager.getProductById(pid);
    res.json(response);

});

/* =====================================================
   Actualizar producto
===================================================== */
app.put("/api/products/:pid", (req, res) => {
    const { pid } = req.params;
    const response = productManager.updateProduct(pid, req.body);
    res.json(response);

});

/* =====================================================
   Eliminar producto
===================================================== */
app.delete("/api/products/:pid", (req, res) => {
    const { pid } = req.params;
    const response = productManager.deleteProduct(pid);
    res.json(response)
});

/*--------------------------------- Rutas para Manejo de Carts (/api/carts/ )-------------------------------------------------*/

/* =====================================================
   Crear nuevo carrito
===================================================== */
app.post("/api/carts", (req, res) => {
    const response = cartManager.create();
    res.json(response);
});

/* =====================================================
   Obtener los productos de un carrito
===================================================== */
app.get("/api/carts/:cid", (req, res) => {
    const response = cartManager.getProductsById(req.params.cid);
    res.json(response);
});

/* =====================================================
   Agregar producto a un carrito
===================================================== */
app.post("/api/carts/:cid/product/:pid", (req, res) => {
    const response = cartManager.addProductToCart(
        req.params.cid,
        req.params.pid
    );
    res.json(response);
});


