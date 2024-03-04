const db = require("../utils/database");

module.exports = {
  fetchAdminByEmail: async (email) => {
    console.log("email ======>>>", email)
    return db.query(`SELECT * FROM admin WHERE email = '${email}'`);
    
  },

  total_orders: async (payment_status, cart) => {
    return db.query("SELECT COUNT(?) FROM ?", [payment_status, cart]);
  },

  seller_earning: async (cart_price, cart, payment_status) => {
    return db.query("select SUM(?) FROM ? WHERE ? = 1", [
      cart_price,
      cart,
      payment_status,
    ]);
  },

  customers: async (buyer_name, tbl_buyer) => {
    return db.query("SELECT COUNT(?) FROM ?", [buyer_name, tbl_buyer]);
  },

  fetchAllCustomers: async (tbl_buyer) => {
    return db.query("SELECT * FROM ?", [tbl_buyer]);
  },

  fetchAllProducts: async () => {
    return db.query("SELECT * FROM product");
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

  deleteProduct: async(id) => {
    return db.query('DELETE FROM product WHERE id = ?', [id])
  }

};
