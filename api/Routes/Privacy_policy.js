const router = require("express").Router();
const controller= require("../../Services/privacy_policyServices")

router.get("/get-all" ,controller.getAllPrivacy_Policys)
router.get("/get-policy-by-ID/:Privacy_PolicyId" , controller.getSpecificPrivacy_Policy)
router.delete("/delete/:Privacy_PolicyId" , controller.deletePrivacy_Policy);
router.post("/create" , controller.createPrivacy_Policy);
router.put("/update" , controller.updatePrivacy_Policy);

module.exports = router;