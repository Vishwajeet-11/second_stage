const db = require("../utils/database");

module.exports = {
  fetchAdminByEmail: async (email) => {
    console.log("email ======>>>", email);
    return db.query(`SELECT * FROM admin WHERE email = '${email}'`);
  },

  total_orders: async () => {
    return db.query("SELECT COUNT(payment_status) AS total_orders FROM cart");
  },

  seller_earning: async () => {
    return db.query(
      "select SUM(cart_price) AS total_earning FROM cart WHERE payment_status = 1"
    );
  },

  customers: async () => {
    return db.query(
      "SELECT COUNT(buyer_name) AS total_customers FROM tbl_buyer"
    );
  },

  fetchAllCustomers: async (tbl_buyer) => {
    return db.query("SELECT * FROM tbl_buyer");
  },

  fetchAllProducts: async () => {
    return db.query("SELECT * FROM product");
  },

  fetchAllCart: async () => {
    return db.query("SELECT * FROM cart");
  },

  postAddProductAdmin: async (data) => {
    return db.query("INSERT INTO product set ?", [data]);
  },

  putAllProduct: async (
    id,
    seller_id,
    size_standard,
    product_buy_rent,
    location,
    product_brand,
    product_category,
    product_image,
    featured_product,
    product_name,
    price_sale_lend_price,
    product_replacement_price,
    product_rental_period,
    wishlist_like,
    product_description
  ) => {
    return db.query(
      "UPDATE product SET seller_id = ?, size_standard = ?, product_buy_rent = ?, location = ?, product_brand = ?, product_category = ?, product_image = ?, featured_product = ?, product_name = ?, price_sale_lend_price = ?, product_replacement_price = ?, product_rental_period = ?, wishlist_like = ?, product_description = ? WHERE id = ?",
      [
        seller_id,
        size_standard,
        product_buy_rent,
        location,
        product_brand,
        product_category,
        product_image,
        featured_product,
        product_name,
        price_sale_lend_price,
        product_replacement_price,
        product_rental_period,
        wishlist_like,
        product_description,
        id,
      ]
    );
  },

  deleteAllProduct: async (id) => {
    return db.query("DELETE FROM product WHERE id =?", [id]);
  },

  getAdminCategory: async () => {
    return db.query("SELECT * FROM product_category");
  },

  PostAdminCategory: async (
    product_id,
    product_category,
    product_description
  ) => {
    return db.query(
      "INSERT INTO product_category (product_id, product_category, product_description) VALUES(?,?,?)",
      [product_id, product_category, product_description]
    );
  },

  deleteAdminCategory: async (id) => {
    return db.query("DELETE FROM product_category WHERE id = ?", [id]);
  },

  putAdminCategory: async (id, productCategory, productDescription) => {
    return db.query(
      "UPDATE product_category SET product_category = ?, product_description = ? WHERE id = ?",
      [productCategory, productDescription, id]
    );
  },

  fetchProductById: async (id) => {
    return db.query("SELECT * FROM product_category WHERE id =?", [id]);
  },

  deleteProduct: async (id) => {
    return db.query("DELETE FROM product WHERE id = ?", [id]);
  },

  fetchCategoryByProductId: async () => {
    return db.query("SELECT * FROM product_category");
  },

  getAdminOrders: async () => {
    return db.query("SELECT * FROM order_checkout");
  },

  deleteAdminOrder: async (id) => {
    return db.query("DELETE FROM order_checkout WHERE id = ?", [id]);
  },

  fetchOrderById: async (id) => {
    return db.query("SELECT * FROM order_checkout where id = ?", [id]);
  },

  getCartDataBYId: async (data) => {
    return db.query("select * from cart where buyer_id = ?", [data]);
  },
  total_spend: async (data) => {
    return db.query(
      "SELECT SUM(cart_price) AS total_spend FROM cart WHERE buyer_id = ? AND payment_status = 1",
      [data]
    );
  },

  fetchBuyer: async (data) => {
    return db.query("SELECT * FROM tbl_buyer WHERE id = ?", [data]);
  },

  fetchProductIdById: async (data) => {
    return db.query("SELECT * FROM product WHERE id = ?", [data]);
  },

  updateAdminOrder: async (
    id,
    // buyer_id,
    // order_number,
    // order_date,
    // payment_method,
    payment_status
    // cart_id
  ) => {
    return db.query(
      "UPDATE order_checkout SET payment_status = ? WHERE id =?",
      [payment_status, id]
    );
  },

  order_count: async () => {
    return db.query("SELECT COUNT(buyer_id) FROM");
  },

  fetchOrderByOrderNumber: async (
    buyer_name,
    payment_status,
    payment_method,
    order_date,
    order_number,
    price
  ) => {
    return db.query(
      "UPDATE order_checkout SET buyer_name = (SELECT buyer_name FROM tbl_buyer WHERE buyer_id = (SELECT buyer_id FROM cart WHERE order_number = '63946' AND payment_status = 1)), payment_status = NULL, payment_method = NULL, order_date = NULL, price = (SELECT SUM(cart_price) AS total_spend FROM cart WHERE buyer_id = (SELECT buyer_id FROM cart WHERE order_number = '63946' AND payment_status = 1)) WHERE order_number = '63946';",
      [
        buyer_name,
        payment_status,
        payment_method,
        order_date,
        order_number,
        order_number,
        order_number,
        price,
      ]
    );
  },

  fetchProductfromCart: async (product_id) => {
    return db.query(
      "SELECT COUNT(product_id) as sales FROM cart WHERE product_id = ?",
      [product_id]
    );
  },

  fetchPriceFromCart: async (product_id) => {
    return db.query(
      "SELECT cart_price FROM cart as price WHERE product_id = ?",
      [product_id]
    );
  },

  fetchFilteredData: async () => {
    const result = await db.query(
      "SELECT YEAR(createdAt) AS year, MONTH(createdAt) AS month, COUNT(*) AS count FROM cart GROUP BY YEAR(createdAt), MONTH(createdAt) ORDER BY YEAR(createdAt), MONTH(createdAt)"
    );
    return result[0].count;
  },

  fetchYearly: async () => {
    return db.query(
      "SELECT YEAR(createdAt) AS year, COUNT(*) AS count FROM cart GROUP BY YEAR(createdAt) ORDER BY(YEAR)"
    );
  },

  fetchMonthly: async () => {
    return db.query(
      "SELECT MONTHNAME(createdAt) AS month, COUNT(*) AS count FROM cart GROUP BY MONTHNAME(createdAt) ORDER BY MONTHNAME(createdAt);"
    );
  },

  fetchWeekly: async () => {
    return db.query(
      "SELECT WEEK(createdAt) as week, COUNT(*) AS count FROM cart GROUP BY WEEK(createdAt) ORDER BY WEEK(createdAt)"
    );
  },

  fetchCartIdCount: async (cart_id) => {
    return db.query(
      "SELECT COUNT(cart_id) AS products FROM cart WHERE cart_id = ?",
      [cart_id]
    );
  },

  fetchProductCount: async (data) => {
    return db.query(
      "SELECT * from cart where cart_id = ?",[data]
    );
  },
};
