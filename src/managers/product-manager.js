import fs from "fs";
import path from "path";

class ProductManager {

    constructor() {
        this.path = path.resolve("data/products.json");
    }

    /* ===============================
       Método privado para generar los pids
    =============================== */
    #getId(products) {
        let maxId = 0;
        products.forEach(product => {
            if (product.id > maxId) {
                maxId = product.id;
            }
        });
        return maxId + 1;
    }

    /* ===============================
       Obtener todos los productos
    =============================== */
    getProducts() {
        const data = fs.readFileSync(this.path, "utf-8");
        return JSON.parse(data);
    }

    /* ===============================
       Guardar productos en el archivo
    =============================== */
    saveProducts(products) {
        fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
    }

    /* ===============================
       Agregar producto
    =============================== */
    addProduct(productData) {

        const products = this.getProducts();

        const {
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails
        } = productData;

        // Validar campos obligatorios
        if (!title || !description || !code || !price || !stock || !category) {
            throw new Error("Todos los campos obligatorios deben enviarse");
        }

        // Validar que el code no se repita
        const existe = products.find(p => p.code === code);
        if (existe) {
            throw new Error("El código ya existe");
        }

        const newProduct = {
            id: this.#getId(products),
            title,
            description,
            code,
            price,
            status: status ?? true,
            stock,
            category,
            thumbnails: thumbnails ?? []
        };

        products.push(newProduct);
        this.saveProducts(products);

        return newProduct;
    }

    /* ===============================
       Obtener producto por pid
    =============================== */
    getProductById(id) {
        const products = this.getProducts();
        const product = products.find(p => p.id === parseInt(id));

        if(!product) throw new Error('Producto NO encontrado');

        return product;
    }

    /* ===============================
       Actualizar producto 
    =============================== */
    updateProduct(id, updatedFields) {

        const products = this.getProducts();
        const index = products.findIndex(p => p.id === parseInt(id));

        if (index === -1) {
            throw new Error("Producto no encontrado");
        }

        // No permitir modificar el id
        if (updatedFields.id) {
            delete updatedFields.id;
        }

        products[index] = {
            ...products[index],
            ...updatedFields
        };

        this.saveProducts(products);
        return products[index];
    }

    /* ===============================
       Eliminar producto
    =============================== */
    deleteProduct(id) {
        const products = this.getProducts();
        const filteredProducts = products.filter(p => p.id !== parseInt(id));
        if (products.length === filteredProducts.length) {
            throw new Error("Producto no encontrado");
        }
        
        this.saveProducts(filteredProducts);
        return "Producto eliminado correctamente";
    }
}

export default ProductManager;
