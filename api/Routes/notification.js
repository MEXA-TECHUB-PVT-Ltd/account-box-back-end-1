const router = require("express").Router();
const controller= require("../../Services/notificationServices")

router.get("/get-all" ,controller.getAllnotifications)
router.get("/get-notication-by-ID/:notificationId" , controller.getSpecificnotification)
router.delete("/delete/:subscription_historyId" , controller.deletenotification);
router.post("/create" , controller.createnotification);
router.put("/update" , controller.updatenotification);
router.delete("/delete-all" ,controller.deleteAll)
router.post("/get-user-notification" ,controller.getUsernotification)

module.exports = router;