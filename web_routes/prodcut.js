const express = require("express");
const productController = require("../web_controller/productController");
const auth = require("../middleware/auth");
const router = express.Router();
const upload = require("../middleware/product_image");
// const upload = require("../middleware/productImage_upload");

// *******product code for router kaif start****

router.post(
  "/add_product",
  upload.array("files"),
  productController.add_product
);

// router.get("/product_details", productController.getProductDetails);


router.post("/get_all_Product", productController.get_all_Product);

router.post("/get_my_product", productController.get_my_product);

router.post(
  "/getProductDetails_by_id",
  productController.getProductDetails_by_id
);

router.post(
  "/getProductDetails_by_Category/:product_category/:sort",
  productController.getProductDetails_by_Category
);

router.post(
  "/filterAllProduct",
  productController.get_all_filter_Product
);
router.post("/fetch_categories", productController.fetchProCategories);

//***********product code for router kaif end****************

router.get("/ProductDetailsById/:id", productController.getProductDetailsById);
router.delete(
  "/deleteProductDetails/:id",
  productController.deleteProductDetails
);

//product
router.delete("/deleteProduct/:id", productController.deleteProduct);
router.post("/updateProduct/:id", productController.editProduct);
router.post("/createProduct", productController.addProduct);
router.get("/getProduct", productController.get_Product);
router.get("/getProductById/:id", productController.getProductById);
router.get("/getAllProdcut", productController.get_all_Product);
// router.post(
//   "/edit_product",
//   upload.array("files", 10),
//   productController.edit_product
// );

module.exports = router;
