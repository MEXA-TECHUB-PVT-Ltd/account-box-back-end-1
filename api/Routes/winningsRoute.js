const router = require("express").Router();
const controller= require("../../Services/winningsServices")

router.get("/get-all" ,controller.getAllwinnings)
router.get("/get-winnings-by-ID/:winningsId" , controller.getSpecificwinning)
router.get("/get-winnings-by-shopId/:shop_id" , controller.getWinningsByShopId)
router.get("/get-winnings-by-date/:created_at" , controller.getWinningsByDate)
router.delete("/delete/:winningsId" , controller.deletewinning);
router.post("/create" , controller.createwinning);
router.put("/update" , controller.updatewinning);
router.delete("/delete-all" ,controller.deleteAll)
router.get("/get-winnings-by-managerId/:manager_id" , controller.getWinningsByManagerId)
router.get("/get-winnings-by-tycoonId/:tycoon_id" , controller.getWinningsByTycoonId)

module.exports = router;