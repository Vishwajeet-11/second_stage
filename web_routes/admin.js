const express = require("express")
const router = express.Router()

const web_adminController = require("../web_controller/admin_controller")
const auth = require("../middleware/auth")

router.post("/login", web_adminController.admin_login)
router.get("/all_orders", web_adminController.total_orders)
router.get("/seller_earning", web_adminController.seller_earning)
router.get("/customers", web_adminController.customers_data)
router.get("/all_customers", web_adminController.all_customers)
module.exports = router
