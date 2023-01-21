const router = require("express").Router();
const controller= require("../../Services/daily_reportingServices")

router.get("/get-all" ,controller.getAlldaily_reportings)
router.get("/get-daily_reportings-by-ID/:daily_reportingsId" , controller.getSpecificdaily_reporting)
router.get("/get-daily_reportings-by-shopId/:shop_id" , controller.getFundsByShopId)
router.get("/get-daily_reportings-by-date" , controller.getFundsByDate)
router.get("/get-daily_reportings-by-shopId-and-date" , controller.getFundsByDateAndShopId)
router.post("/get-daily_reportings-by-shopId-and-status" , controller.getFundsByShopIdAndStatus)

router.delete("/delete/:daily_reportingsId" , controller.deletedaily_reporting);
router.post("/create" , controller.createdaily_reporting);
router.put("/update" , controller.updatedaily_reporting);
router.put("/update-editable" , controller.updatedaily_reportingEditable);
router.put("/update-turnoverId" , controller.updateturnoverId);
router.put("/update-winningId" , controller.updatewinningId);

module.exports = router;