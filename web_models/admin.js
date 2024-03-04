const db = require("../utils/database")

module.exports = {
    fetchAdminByEmail: async(email) => {
        return db.query('SELECT * FROM admin WHERE email = ?', [email])
    },
    
    total_orders: async() => {
        return db.query('SELECT COUNT(payment_status) FROM cart')
    },

    seller_earning : async() => {
        return db.query('select SUM(cart_price) FROM cart WHERE payment_status = 1')
    },

    customers : async() => {
        return db.query('SELECT COUNT(buyer_name) FROM tbl_buyer')
    },

    fetchAllCustomers: async() => {
        return db.query('SELECT * FROM tbl_buyer')
    },

    save: async() => {

    },

}