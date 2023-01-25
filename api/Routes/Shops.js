const router = require("express").Router();
const controller= require("../../Services/shopsServices")

router.get("/get-all" ,controller.getAllShops)
router.get("/get-all-tycoon-shops/:tycoon_id" , controller.getTycoonShops)
router.get("/get-Shop-by-ID/:ShopId" , controller.getSpecificShop)
router.get("/get-all-manager-shops/:ManagerId" , controller.getManagerShops)
router.delete("/delete/:ShopId" , controller.deleteShop);
router.post("/create" , controller.createShop);
router.put("/update" , controller.updateShop);
router.delete("/delete-all" ,controller.deleteAll)

module.exports = router;