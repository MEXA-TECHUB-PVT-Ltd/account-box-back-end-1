const router = require("express").Router();
const controller= require("../../Services/balance_accountServices")

router.get("/get-all" ,controller.getAllbalance_accounts)
router.get("/get-BalanceAccount-by-ID/:balance_accountsId" , controller.getSpecificbalance_account)
router.get("/get-Shop-BalanceAccount/:shop_id" , controller.getAllBalanceAccountByShopId)
router.get("/get-BalanceAccount-by-date/:date" , controller.getAllBalanceAccountByDate)

router.delete("/delete/:balance_accountsId" , controller.deletebalance_account);
router.post("/create" , controller.createbalance_account);
router.put("/update" , controller.updatebalance_account);
router.delete("/delete-all" ,controller.deleteAll)
router.get("/get-balance-account-by-manager_id/:manager_id" , controller.getbalance_accountByMangerId)

module.exports = router;