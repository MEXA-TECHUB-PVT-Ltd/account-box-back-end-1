const router = require("express").Router();
const controller= require("../../Services/TycoonServices")

router.get("/get-all" ,controller.getAllTycoons)
router.get("/get-Tycoon-by-ID/:TycoonId" , controller.getSpecificTycoon)
router.delete("/delete/:TycoonId" , controller.deleteTycoon);
router.post("/create" , controller.createTycoon);
router.put("/update-credentials" , controller.updateTycoon);
router.put("/update-password" , controller.updateTycoonPassword);
router.put("/login" , controller.loginTycoon);
router.put("/logout" , controller.logoutTycoon);
router.post("/forget-password" , controller.forgetPasswordTycoon);
router.get("/monthly-data" , controller.getSpecificTycoonMonthly);



module.exports = router;