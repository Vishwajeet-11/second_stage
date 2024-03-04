const Joi = require("joi");
const {
  fetchAdminByEmail,
  total_orders,
  seller_earning,
  customers,
  fetchAllCustomers,
  fetchAllProducts,
  getAdminCategory,
  PostAdminCategory,
  deleteAdminCategory,
  fetchProductById,
  putAdminCategory,
  deleteProduct,
} = require("../web_models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.admin_login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const schema = Joi.alternatives(
      Joi.object({
        email: [Joi.string().email().empty().required()],
        password: Joi.string().min(6).max(15).required().messages({
          "any.required": "{{#label}} is required!!",
          "string.empty": "can't be empty!!",
          "string.min": "minimum 6 value required",
          "string.max": "maximum 15 values allowed",
        }),
      })
    );
    const result = schema.validate({ email, password });
    if (result.error) {
      const message = result.error.details.map((i) => i.message).join(",");
      return res.status(201).json({
        message: result.error.details[0].message,
        error: message,
        missingParams: result.error.details[0].message,
        status: false,
        success: false,
      });
    } else {
      const data = await fetchAdminByEmail(email);

      if (data.length > 0) {
        if (password == data[0].password) {
          return res.status(200).json({
            message: "user fetched",
            // user: data,
            success: "true",
          });
        } else {
          return res.status(201).json({
            message: "incorrect email or password",
            status: "false",
          });
        }
      } else {
        return res.status(201).json({
          message: "email or password incorrect",
          success: "false",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

exports.total_orders = async (req, res) => {
  try {
    await total_orders();
    await console.log(total_orders);
    const data = await total_orders();
    return res.status(200).json({
      message: "total orders fetched",
      total_orders: data,
      success: "true",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.seller_earning = async (req, res) => {
  try {
    await seller_earning();
    const sell = await seller_earning();
    return res.status(200).json({
      message: "total seller earning",
      seller_earning: sell,
      success: "true",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.customers_data = async (req, res) => {
  try {
    await customers();
    const customers_data = await customers();
    return res.status(200).json({
      message: " all customers count fetched",
      customers: customers_data,
      success: "true",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.all_customers = async (req, res) => {
  try {
    await fetchAllCustomers();
    const all_customers_data = await fetchAllCustomers();
    return res.status(200).json({
      message: "all customers data from tbl_buyer",
      customers: all_customers_data,
      success: "true",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.all_product = async (req, res) => {
  try {
    await fetchAllProducts();
    const all_products_data = await fetchAllProducts();
    return res.status(200).json({
      message: "all products data",
      products: all_products_data,
      success: "true",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.product_category = async (req, res) => {
  try {
    await getAdminCategory();
    const all_product_category = await getAdminCategory();
    return res.status(200).json({
      message: "all products category fetched",
      product: all_product_category,
      success: "true",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.post_product_category = async (req, res) => {
  try {
    const { product_id, product_category, product_description } = req.body;
    await PostAdminCategory(product_id, product_category, product_description);
    Joi.object({
      product_id: [Joi.string().empty().required()],
      product_category: [Joi.string().empty().required()],
      product_description: [Joi.string().empty().required],
    });
    return res.status(201).json({
      message: "product category created",
      success: "true",
      product: product_id,
      product_category,
      product_description,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.delete_product_category = async (req, res) => {
  try {
    const { id } = req.body;

    const deletedProduct = await deleteAdminCategory(id);
    return res.status(204).json({
      message: "product category deleted",
      product: deletedProduct,
      success: "true",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.fetchProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const fetch_product = await fetchProductById(id);
    res.status(200).json({
      message: "single product fetched",
      product: fetch_product,
      success: "true",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.update_product_category = async (req, res) => {
  try {
    const { id, product_category, product_description } = req.body;
    Joi.object({
      id: [Joi.string().empty().required()],
      product_category: [Joi.string.empty().required()],
      product_description: [Joi.string().empty().require()],
    });
    const existingCategory = await fetchProductById(id);
    if (existingCategory.length !== 0) {
      const updated_product = await putAdminCategory(
        id,
        product_category,
        product_description
      );
      return res.status(200).json({
        message: "Product updated",
        product: updated_product,
        success: "true",
      });
    } else {
      return res.status(404).json({
        message: "Product not found or id mismatch",
        success: "false",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
