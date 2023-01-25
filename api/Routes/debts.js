const router = require("express").Router();
const controller= require("../../Services/debtsServices")

router.get("/get-all" ,controller.getAlldebts)
router.get("/get-debt-by-ID/:debtId" , controller.getSpecificdebt)
router.get("/get-debt-by-ShopId/:shop_id" , controller.getShopdebt)
router.get("/get-debt-by-status" , controller.getShopdebtStatus)
router.get("/get-debt-by-shopId-and-date" , controller.getShopdebtAndDate)
router.delete("/delete/:debtId" , controller.deletedebt);
router.post("/create" , controller.createdebt);
router.put("/update" , controller.updatedebt);
router.delete("/delete-all" ,controller.deleteAll)
router.get("/get-debt-by-ManagerId/:manager_id" , controller.getdebtbyManagerId)
router.get("/get-debt-by-TycoonId/:tycoon_id" , controller.getdebtbyTycoonId)


module.exports = router;