const router = require("express").Router();
const controller= require("../../Services/daily_assigned_fundServices")

router.get("/get-all" ,controller.getAlldaily_assigned_funds)
router.get("/get-daily_assigned_funds-by-ID/:daily_assigned_fundsId" , controller.getSpecificdaily_assigned_fund)
router.get("/get-funds-by-tycoonId/:tycoon_id" , controller.getFundsByTycoonId)
router.post("/get-funds-by-tycoonId-and-date" , controller.getFundsByTycoonIdAndDate)
router.post("/get-funds-by-shopId-and-date" , controller.getFundsByShopIdAndDate)

router.get("/get-funds-by-shopId/:shop_id" , controller.getFundsByShopId)
router.delete("/delete/:daily_assigned_fundsId" , controller.deletedaily_assigned_fund);
router.post("/create" , controller.createdaily_assigned_fund);
router.put("/update" , controller.updatedaily_assigned_fund);
router.delete("/delete-all" ,controller.deleteAll)
router.post("/get-funds-by-shopId-and-Current-Year" , controller.getFundsByShopIdAndCurrentYear)

module.exports = router;