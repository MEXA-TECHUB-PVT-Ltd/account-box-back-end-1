const router = require("express").Router();
const controller= require("../../Services/subscriptionPlanServices")

router.get("/get-all" ,controller.getAllSubscriptionPlans)
router.get("/get-subscription-plan-by-ID/:SubscriptionPlanId" , controller.getSpecificSubscriptionPlan)
router.delete("/delete/:SubscriptionPlanId" , controller.deleteSubscriptionPlan);
router.post("/create" , controller.createSubscriptionPlan);
router.put("/update" , controller.updateSubscriptionPlan);
router.delete("/delete-all" ,controller.deleteAll)

module.exports = router;