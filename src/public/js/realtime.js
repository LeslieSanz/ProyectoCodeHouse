const socket = io();

const form = document.getElementById("form");
const productsContainer = document.getElementById("products");


//Completando datos del producto en el formulario para crearlo
form.addEventListener("submit", (e) => {

    e.preventDefault();

    const product = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        code: document.getElementById("code").value,
        price: document.getElementById("price").value,
        stock: document.getElementById("stock").value,
        category: document.getElementById("category").value
    };

    socket.emit("newProduct", product);
    
    form.reset();


});


//Mostrar los productos en una tabla y con un botón de eliminar
socket.on("products", (products) => {
    let html = "";
    products.forEach(p => {

        html += `
        <tr>
            <td>${p.id}</td>
            <td>${p.title}</td>
            <td>${p.price}</td>
            <td>${p.stock}</td>
            <td>${p.category}</td>
            <td>
                <button onclick="deleteProduct(${p.id})">
                    Eliminar
                </button>
            </td>
        </tr>
        `;

    });

    productsContainer.innerHTML = html;
});

//Función para eliminar un producto
function deleteProduct(id) {
    socket.emit("deleteProduct", id);
}