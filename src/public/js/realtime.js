const socket = io();

const form = document.getElementById("form");
const productsContainer = document.getElementById("products");

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

socket.on("products", (products) => {

    let html = "";

    products.forEach(p => {
        html += `<p>${p.title} - $${p.price}</p>`;
    });

    productsContainer.innerHTML = html;

});