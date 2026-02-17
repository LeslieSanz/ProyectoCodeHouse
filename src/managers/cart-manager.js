import fs from "fs";
import path from "path";

class CartManager {

    constructor(productManager) {
        this.path = path.resolve("data/carts.json");
        this.productManager = productManager;
    }

    /* ===============================
       Método privado para generar los ids
    =============================== */
    #getId(carts) {
        let maxId = 0;
        carts.forEach(cart => {
            if (cart.id > maxId) {
                maxId = cart.id;
            }
        });
        return maxId + 1;
    }

    /* ===============================
    Obtener todos los productos
    =============================== */
    getCarts() {
        const data = fs.readFileSync(this.path, "utf-8");
        return JSON.parse(data);
    }
    
    /* ===============================
    Guardar productos en el archivo
    =============================== */
    saveCarts(carts) {
        fs.writeFileSync(this.path, JSON.stringify(carts, null, 2));
    }

    /* ===============================
       Crear carrito
    =============================== */
    create(){
        const carts = this.getCarts();
        const newCart = {
            id: this.#getId(carts),
            products: []
        };

        carts.push(newCart);
        this.saveCarts(carts);
        return newCart;
    }

    /* ===============================
       Listar los productos por id del cart
    =============================== */
    getProductsById(id) {
        const carts = this.getCarts();
        const cart = carts.find(p => p.id === parseInt(id));

        if(!cart) throw new Error('Carrito no encontrado');

        const detailedProducts = cart.products.map(item => {
        const productData = this.productManager.getProductById(item.product);
            if (!productData) {
                throw new Error(`Producto con id ${item.product} no existe`);
            }
            return {
                product: productData,
                quantity: item.quantity
            };
        });

        return detailedProducts;
    }

     /* ===============================
       Agregar un producto al carrito
    =============================== */

    addProductToCart(cid, pid) {
        const carts = this.getCarts();

        //Validar que el producto exista
        const product = this.productManager.getProductById(parseInt(pid));
        
        const cartIndex = carts.findIndex(c => c.id === parseInt(cid));

        if (cartIndex === -1) {
            throw new Error("Carrito no encontrado");
        }

        const cart = carts[cartIndex];

        const productIndex = cart.products.findIndex(
            p => p.product === parseInt(pid)
        );

        if (productIndex === -1) {
            // Producto no existe en el carrito, se agrega
            cart.products.push({
                product: parseInt(pid),
                quantity: 1
            });
        } else {
            // Producto ya existe, se incrementa cantidad en 1
            cart.products[productIndex].quantity += 1;
        }

        carts[cartIndex] = cart;
        this.saveCarts(carts);

        return cart;
    }
}

export default CartManager;