const { isValidObjectId } = require("mongoose");
const discountsModel = require("../models/discounts");
const productsModel = require("../models/products");

exports.getAll = async (req,res) => {
    
}
exports.set = async (req,res) => {
    const {productID , discount} = req.body
}
exports.setAll = async (req,res) => {

}
exports.remove = async (req,res) => {

}
exports.edit = async (req,res) => {

}