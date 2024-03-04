const db = require("../utils/database")

module.exports = {
    fetchAdminByEmail: async(email) => {
        return db.query('SELECT * FROM admin WHERE email = ?', [email])
    },
    
    total_orders: async(payment_status, cart) => {
        return db.query('SELECT COUNT(?) FROM ?', [payment_status, cart])
    },

    seller_earning : async(cart_price, cart, payment_status) => {
        return db.query('select SUM(?) FROM ? WHERE ? = 1',[cart_price, cart, payment_status])
    },

    customers : async(buyer_name, tbl_buyer) => {
        return db.query('SELECT COUNT(?) FROM ?',[buyer_name, tbl_buyer])
    },

    fetchAllCustomers: async(tbl_buyer) => {
        return db.query('SELECT * FROM ?', [tbl_buyer])
    },

}