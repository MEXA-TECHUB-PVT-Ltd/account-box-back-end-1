const router = require("express").Router();
const controller= require("../../Services/shopCashierServices")

router.get("/get-all" ,controller.getAllShopCashiers)
router.get("/get-all-shop-cashiers/:shop_id" , controller.getSingleShopProduct)
router.get("/get-ShopCashier-by-ID/:ShopCashierId" , controller.getSpecificShopCashier)
router.delete("/delete/:ShopCashierId" , controller.deleteShopCashier);
router.post("/create" , controller.createShopCashier);
router.delete("/delete-all" ,controller.deleteAll)
router.post("/get-ShopCashier-by-tycoonId" , controller.getSpecificShopCashierByTycoonId)

module.exports = router;