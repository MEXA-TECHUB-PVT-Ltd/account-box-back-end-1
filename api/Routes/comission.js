const router = require("express").Router();
const controller= require("../../Services/comissionServices")

router.get("/get-all" ,controller.getAllcomissions)
router.get("/get-comission-by-ID/:comissionId" , controller.getSpecificcomission)
router.delete("/delete/:comissionId" , controller.deletecomission);
router.post("/create" , controller.createcomission);
router.put("/update" , controller.updatecomission);
router.delete("/delete-all" ,controller.deleteAll)

module.exports = router;