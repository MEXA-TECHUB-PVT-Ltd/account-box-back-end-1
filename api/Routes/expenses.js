const router = require("express").Router();
const controller= require("../../Services/expensesServices")

router.get("/get-all" ,controller.getAllexpenses)
router.get("/get-expenses-by-ID/:expensesId" , controller.getSpecificexpense)
router.get("/get-expenses-by-shopId/:shop_id" , controller.getFundsByShopId)
router.get("/get-expenses-by-date/:created_at" , controller.getFundsByDate)
router.delete("/delete/:expensesId" , controller.deleteexpense);
router.post("/create" , controller.createexpense);
router.put("/update" , controller.updateexpense);
router.delete("/delete-all" ,controller.deleteAll)
router.get("/get-expenses-by-managerId/:manager_id" , controller.getExpensesByManagerId)
router.get("/get-expenses-by-tycoonId/:tycoon_id" , controller.getExpensesByTycoonId)


module.exports = router;