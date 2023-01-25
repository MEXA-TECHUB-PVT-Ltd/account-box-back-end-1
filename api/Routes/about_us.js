const router = require("express").Router();
const controller= require("../../Services/about_usServices")

router.get("/get-all" ,controller.getAllabout_uss)
router.get("/get-about_us-by-ID/:about_usId" , controller.getSpecificabout_us)
router.delete("/delete/:about_usId" , controller.deleteabout_us);
router.post("/create" , controller.createabout_us);
router.put("/update" , controller.updateabout_us);
router.delete("/delete-all" ,controller.deleteAll)


module.exports = router;