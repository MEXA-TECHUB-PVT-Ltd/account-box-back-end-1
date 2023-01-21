const router = require("express").Router();
const controller= require("../../Services/terms_And_conditionsServices")

router.get("/get-all" ,controller.getAllterms_and_conditionss)
router.get("/get-terms_and_conditions-by-ID/:terms_and_conditionsId" , controller.getSpecificterms_and_conditions)
router.delete("/delete/:terms_and_conditionsId" , controller.deleteterms_and_conditions);
router.post("/create" , controller.createterms_and_conditions);
router.put("/update" , controller.updateterms_and_conditions);

module.exports = router;