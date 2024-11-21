const categoryModel = require("../models/category.model");

module.exports = {
    createCategory: async (req, res) => {
        const body = req.body;
        const newCategory = await categoryModel.create(body);
        return res.status(201).json(newCategory);
    },
    getCategories: async (req, res) => {
        const categories = await categoryModel.find();
        return res.status(200).json(categories);
    },
    updateCategory: async (req, res) => {
        const id = req.params.id;
        const body = req.body;
        const updateCategory = await categoryModel.findByIdandUpdate(id, body, {new: true});
        return res.status(200).json(updateCategory);
    },
    deleleCategory: async (req, res) => {
        const id = req.params.id;
        const deleledCategory = await categoryModel.findByIdandUpdate(id);
        return res.status(200).json(deleledCategory);
    }
}