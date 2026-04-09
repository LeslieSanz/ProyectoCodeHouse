import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import productRouter from "./routes/product-router.js";
import cartRouter from "./routes/cart-router.js";
import viewsRouter from "./routes/views-router.js";
import ProductManager from "./managers/product-manager.js";
//Conexión con MongoDB
import { connectDB } from './config/db.js';


const app = express();
const PORT = 8080;

const productManager = new ProductManager();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", `${process.cwd()}/src/views`);
app.set("view engine", "handlebars");

app.use(express.static(`${process.cwd()}/src/public`));

// Routers
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);

/*
app.listen(PORT, () => {
    console.log(`Servidor OK escuchando en puerto ${PORT}`);
});
*/

//Conexión 
connectDB();

const serverHttp = app.listen(PORT, () => {
    console.log(`Servidor OK escuchando en puerto ${PORT}`);
});

console.log('URI:', process.env.MONGO_URI);

const io = new Server(serverHttp);

//Confirmacion de conexion
io.on("connection", (socket) => {

    console.log("Cliente conectado");
    const products = productManager.getProducts();
    socket.emit("products", products);

});


//Lógica para agregar productos usando el productManager
io.on("connection", (socket) => {
    socket.emit("products", productManager.getProducts());

    socket.on("newProduct", (product) => {
        productManager.addProduct(product);
        io.emit("products", productManager.getProducts());
    });

    socket.on("deleteProduct", (id) => {
        productManager.deleteProduct(id);
        const products = productManager.getProducts();
        io.emit("products", products);
    });

});