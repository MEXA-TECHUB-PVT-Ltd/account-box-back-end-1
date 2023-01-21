const express = require('express');
const router = express.Router();

//Required api's 
const ImageUpload = require('./Routes/ImageUpload')
const Admin = require('./Routes/Admin')
const SubscriptionPlan = require('./Routes/SubscriptionPlan')
const subscription_history = require('./Routes/subscription_history')

const Tycoon = require('./Routes/Tycoon')
const Managers = require('./Routes/Managers')
const Shop = require('./Routes/Shops')
const Products = require('./Routes/Product')
const Cashier = require('./Routes/Cashier')
const ShopProducts = require('./Routes/ShopProduct')
const ShopCashiers = require('./Routes/ShopCashier')
const Inventory = require('./Routes/Inventory')
const daily_Assigned_fund = require('./Routes/daily_Assigned_fundRoute')
const expenses = require('./Routes/expenses')
const balance_account = require('./Routes/balance_account')
const turnovers = require('./Routes/turnoversRoute')
const winnings = require('./Routes/winningsRoute')
const daily_reporting = require('./Routes/daily_reporting')
const debt = require('./Routes/debts')
const debts_recovery = require('./Routes/debts_recovery')
const notification = require('./Routes/notification')
const privacy_policy = require('./Routes/Privacy_policy')
const terms_and_conditions = require('./Routes/terms_And_conditions')
const about_us = require('./Routes/about_us')








/*********Main Api**********/

router.use('/Upload', ImageUpload);
router.use('/admin',Admin);
router.use('/subscriptionPlan',SubscriptionPlan);
router.use('/subscription_history',subscription_history);

router.use('/tycoon',Tycoon);
router.use('/managers',Managers);
router.use('/shop',Shop);
router.use('/product',Products);
router.use('/cashier',Cashier);
router.use('/shopProducts',ShopProducts);
router.use('/shopCashiers',ShopCashiers);
router.use('/inventory',Inventory);
router.use('/daily_Assigned_fund',daily_Assigned_fund);
router.use('/expenses',expenses);
router.use('/balance_account',balance_account);
router.use('/turnovers',turnovers);
router.use('/winnings',winnings);
router.use('/daily_reporting',daily_reporting);
router.use('/debts',debt);
router.use('/debts_recovery',debts_recovery);
router.use('/notification',notification);
router.use('/privacy_policy',privacy_policy);
router.use('/terms_and_conditions',terms_and_conditions);
router.use('/about_us',about_us);


















module.exports = router;