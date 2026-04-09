# 🚀 Backend Ecommerce - Entrega Final

## 📌 Descripción

Este proyecto corresponde a la entrega final del curso, donde se implementa un backend de ecommerce utilizando **Node.js, Express y MongoDB (Mongoose)** como sistema de persistencia.

Se migró completamente la lógica previamente desarrollada con archivos JSON a una arquitectura basada en base de datos, manteniendo la lógica de negocio y mejorando la escalabilidad.

---

## ⚙️ Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- mongoose-paginate-v2

---

## 🧩 Funcionalidades principales

### 🛍️ Productos
- CRUD completo
- Filtros por categoría y disponibilidad
- Paginación (`limit`, `page`)
- Ordenamiento por precio (`asc`, `desc`)

### 🛒 Carrito
- Creación de carrito
- Agregar productos
- Actualizar cantidad
- Eliminar productos
- Vaciar carrito
- Uso de `populate` para obtener información completa de productos

---

## 🔗 Endpoints principales

### 🛍️ Productos

| Método | Endpoint | Descripción |
|------|--------|------------|
| GET | `/api/products` | Listar productos |
| GET | `/api/products?limit=5&page=1&sort=asc&query=hardware` | Consulta avanzada |
| GET | `/api/products/:pid` | Obtener producto |
| POST | `/api/products` | Crear producto |
| PUT | `/api/products/:pid` | Actualizar producto |
| DELETE | `/api/products/:pid` | Eliminar producto |

---

### 🛒 Carrito

| Método | Endpoint | Descripción |
|------|--------|------------|
| POST | `/api/carts` | Crear carrito |
| GET | `/api/carts/:cid` | Obtener carrito (populate) |
| POST | `/api/carts/:cid/products/:pid` | Agregar producto |
| PUT | `/api/carts/:cid/products/:pid` | Actualizar cantidad |
| PUT | `/api/carts/:cid` | Reemplazar carrito |
| DELETE | `/api/carts/:cid/products/:pid` | Eliminar producto |
| DELETE | `/api/carts/:cid` | Vaciar carrito |

---

## 🧪 Ejemplo de uso

```bash
GET /api/products?limit=5&page=1&sort=desc&query=hardware
