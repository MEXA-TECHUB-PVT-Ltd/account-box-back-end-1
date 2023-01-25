const router = require("express").Router();
const controller= require("../../Services/subscription_historyServices")

router.get("/get-all" ,controller.getAllsubscription_historys)
router.get("/get-subscription-history-by-ID/:subscription_historyId" , controller.getSpecificsubscription_history)
router.get("/get-subscription-history-by-TycoonId/:tycoon_id" , controller.getSpecificsubscription_historyByTycoon)
router.delete("/delete/:subscription_historyId" , controller.deletesubscription_history);
router.post("/create" , controller.createsubscription_history);
router.put("/update" , controller.updatesubscription_history);
router.delete("/delete-all" ,controller.deleteAll)

module.exports = router;