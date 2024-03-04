const express = require("express")
const router = express.Router()

const web_adminController = require("../web_controller/admin_controller")
const auth = require("../middleware/auth")

router.post("/login", web_adminController.admin_login)


router.get("/all_orders", web_adminController.total_orders)
router.get("/seller_earning", web_adminController.seller_earning)
router.get("/customers", web_adminController.customers_data)
router.get("/all_customers", web_adminController.all_customers)

router.get("/all_product", web_adminController.all_product)
// router.delete("/all_product", web_adminController)

router.get("/category/:id", web_adminController.fetchProductById)
router.get("/category", web_adminController.product_category)
router.post("/category", web_adminController.post_product_category)
router.delete("/category", web_adminController.delete_product_category)
router.put("/category", web_adminController.update_product_category)




module.exports = router
