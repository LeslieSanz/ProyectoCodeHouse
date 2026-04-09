import { Router } from "express";
import { productRepository } from "../repositories/product-repository.js";

const router = Router();

/* =====================================================
   Crear nuevo producto
===================================================== */
router.post("/", async (req, res) => {
  try {
    const response = await productRepository.create(req.body);
    res.json({ status: "success", payload: response });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});

/* =====================================================
   Listar todos los productos (aqui puede recibir un query params con un limit, page, sort y query)
===================================================== */
router.get("/", async (req, res) => {
  try {
    // Obtener query params
    let { limit = 10, page = 1, sort, query } = req.query;

    limit = parseInt(limit);
    page = parseInt(page);

    // Construir filtro por categoria y disponibilidad
    let filter = {};

    if (query) {
      filter = {
        $or: [
          { category: query },
          { status: query === "true" }
        ]
      };
    }

    // Construir ordenamiento en base al precio
    let sortOption = {};
    if (sort === "asc") sortOption.price = 1;
    if (sort === "desc") sortOption.price = -1;

    // Opciones de paginate
    const options = {
      limit,
      page,
      sort: sortOption,
      lean: true
    };

    // Llamar al repository
    const result = await productRepository.getPaginated({
      filter,
      options
    });

    // Construir links
    const baseUrl = "http://localhost:8080/api/products";

    const prevLink = result.hasPrevPage
      ? `${baseUrl}?page=${result.prevPage}`
      : null;

    const nextLink = result.hasNextPage
      ? `${baseUrl}?page=${result.nextPage}`
      : null;

    // Output
    res.json({
      status: "success",
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink,
      nextLink
    });

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
});

/* =====================================================
   Obtener producto por ID
===================================================== */
router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const response = await productRepository.getById(pid);
    res.json({ status: "success", payload: response });
  } catch (error) {
    res.status(404).json({ status: "error", message: error.message });
  }
});

/* =====================================================
   Actualizar producto
===================================================== */
router.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const response = await productRepository.update(pid, req.body);
    res.json({ status: "success", payload: response });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});

/* =====================================================
   Eliminar producto
===================================================== */
router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const response = await productRepository.delete(pid);
    res.json({ status: "success", payload: response });
  } catch (error) {
    res.status(404).json({ status: "error", message: error.message });
  }
});

export default router;