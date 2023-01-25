const router = require("express").Router();
const controller= require("../../Services/debts_recoveryServices")

router.get("/get-all" ,controller.getAlldebts_recovery)
router.get("/get-debtRecovery-by-ID/:debtRecoveryId" , controller.getSpecificdebt_recovery)
router.get("/get-debtRecovery-by-debtId/:debtId" , controller.getShopdebt_recovery)
router.get("/get-debtRecovery-by-shopId/:shopId" , controller.getDebtRecoveryByShopId)

router.get("/get-debtRecovery-by-recoveryDate" , controller.getDebtRecoveryByRecoveryDate)

router.delete("/delete/:debtId" , controller.deletedebt_recovery);
router.post("/create" , controller.createdebt_recovery);
router.put("/update" , controller.updatedebt_recovery);
router.delete("/delete-all" ,controller.deleteAll)

module.exports = router;