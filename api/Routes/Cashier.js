const router = require("express").Router();
const controller= require("../../Services/cashierServices")

router.get("/get-all" ,controller.getAllCashiers)
router.get("/get-Cashier-by-ID/:CashierId" , controller.getSpecificCashier)
router.delete("/delete/:CashierId" , controller.deleteCashier);
router.post("/create" , controller.createCashier);
router.put("/update" , controller.updateCashier);
router.delete("/delete-all" ,controller.deleteAll)

module.exports = router;