const router = require("express").Router();
const controller= require("../../Services/managersServices")

router.get("/get-all" ,controller.getAllManagers)
router.get("/get-Manager-by-ID/:ManagerId" , controller.getSpecificManager)
router.delete("/delete/:ManagerId" , controller.deleteManager);
router.post("/create" , controller.createManager);
router.put("/update-credentials" , controller.updateManager);
router.put("/update-password" , controller.updateManagerPassword);

router.put("/login" , controller.loginManager);
router.post("/forget-password" , controller.forgetPasswordManager);
router.delete("/delete-all" ,controller.deleteAll)
router.post("/get-managers-by-tycoon-id" , controller.getManagerByTycoonId)


module.exports = router;