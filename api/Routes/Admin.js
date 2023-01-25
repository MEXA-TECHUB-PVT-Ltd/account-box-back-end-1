const router = require("express").Router();
const controller= require("../../Services/adminServices")

router.get("/get-all" ,controller.getAlladmins)
router.get("/get-admin-by-ID/:adminId" , controller.getSpecificadmin)
router.delete("/delete/:adminId" , controller.deleteadmin);
router.post("/create" , controller.createadmin);
router.put("/update-credentials" , controller.updateadmin);
router.put("/logout" , controller.logoutAdmin);
router.put("/login" , controller.loginAdmin);
router.post("/forget-password" , controller.forgetPasswordAdmin);
router.delete("/delete-all" ,controller.deleteAll)

module.exports = router;