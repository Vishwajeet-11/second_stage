const Joi = require("joi")
const { fetchAdminByEmail, total_orders, seller_earning,customers, fetchAllCustomers } = require("../web_models/admin");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.admin_login = async(req, res) => {
  const { email, password } = req.body;
  const schema = Joi.alternatives(
    Joi.object({
      email: [Joi.string().empty().required()],
      password: Joi.string().min(6).max(15).required().messages({
        "any.required": "{{#label}} is required!!",
        "string.empty": "can't be empty!!",
        "string.min": "minimum 6 value required",
        "string.max": "maximum 15 values allowed",
      }),
    })
  );
  const result = schema.validate({email, password})
  if (result.error) {
      const message = result.error.details.map((i) => i.message).join(",");
      return res.json({
        message: result.error.details[0].message,
        error: message,
        missingParams: result.error.details[0].message,
        status: 400,
        success: false,
      });
    }
    else{
        const data = await fetchAdminByEmail(email)
        return res.status(200).json({
            message: 'user fetched',
            user: data
        })
    }
};

exports.total_orders = async(req, res) => {
    await total_orders()
    await console.log(total_orders)
    const data = await total_orders()
    return res.status(200).json({
        message : "total orders fetched",
        total_orders: data
    })
}

exports.seller_earning = async(req, res) => {
    await seller_earning()
    const sell = await seller_earning()
    return res.status(200).json({
        message: "total seller earning",
        seller_earning: sell
    })
}

exports.customers_data = async (req, res) => {
    await customers()
    const customers_data = await customers()
    return res.status(200).json({
        message: " all customers count fetched",
        customers: customers_data
    })
}

exports.all_customers = async (req, res) => {
    await fetchAllCustomers()
    const all_customers_data = await fetchAllCustomers()
    return res.status(200).json({
        message: "all customers data from tbl_buyer",
        customers: all_customers_data
    })
}

