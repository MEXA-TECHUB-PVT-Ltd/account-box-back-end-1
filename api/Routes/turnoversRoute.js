const router = require("express").Router();
const controller= require("../../Services/turnoverServices")

router.get("/get-all" ,controller.getAllturnovers)
router.get("/get-turnovers-by-ID/:turnoversId" , controller.getSpecificturnover)
router.get("/get-turnovers-by-shopId/:shop_id" , controller.getTurnoverByShopId)
router.get("/get-turnovers-by-date/:created_at" , controller.getTurnoverByDate)
router.get("/get-turnovers-by-date-and-product" , controller.getTurnoverByDateAndProductId)
router.delete("/delete/:turnoversId" , controller.deleteturnover);
router.post("/create" , controller.createturnover);
router.put("/update" , controller.updateturnover);
router.delete("/delete-all" ,controller.deleteAll)
router.post("/get-turnovers-by-date-range-and-product" , controller.getTurnoverByDateRangeAndProductId)

module.exports = router;