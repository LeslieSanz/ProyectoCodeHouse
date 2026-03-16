import express from "express";
import productRouter from "./routes/product-router.js";
import cartRouter from "./routes/cart-router.js";

const app = express();
const PORT = 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routers
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

app.listen(PORT, () => {
    console.log(`Servidor OK escuchando en puerto ${PORT}`);
});