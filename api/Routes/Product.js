const router = require("express").Router();
const controller= require("../../Services/productsServices")

router.get("/get-all" ,controller.getAllProducts)
router.get("/get-Product-by-ID/:ProductId" , controller.getSpecificProduct)
router.delete("/delete/:ProductId" , controller.deleteProduct);
router.post("/create" , controller.createProduct);
router.put("/update" , controller.updateProduct);
router.delete("/delete-all" ,controller.deleteAll)

module.exports = router;