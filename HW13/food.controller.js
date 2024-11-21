const foodModel = require("../models/food.model");

module.exports = {
    createFood: async (req, res) => {
        try {
            const body = req.body;
            const newFood = await foodModel.create(body);
            return res.status(201).json(newFood);
        } catch (error) {
            return res.status(500).json({ message: "Error creating food", error });
        }
    },

    getFoods: async (req, res) => {
        try {
            const foods = await foodModel.find().populate('category_id');
            return res.status(200).json(foods);
        } catch (error) {
            return res.status(500).json({ message: "Error fetching foods", error });
        }
    },

    getFoodById: async (req, res) => {
        try {
            const id = req.params.id;
            const food = await foodModel.findById(id).populate('category_id');
            if (!food) {
                return res.status(404).json({ message: "Food not found" });
            }
            return res.status(200).json(food);
        } catch (error) {
            return res.status(500).json({ message: "Error fetching food", error });
        }
    },

    updateFood: async (req, res) => {
        try {
            const id = req.params.id;
            const body = req.body;
            const updatedFood = await foodModel.findByIdAndUpdate(id, body, { new: true }).populate('category_id');
            if (!updatedFood) {
                return res.status(404).json({ message: "Food not found" });
            }
            return res.status(200).json(updatedFood);
        } catch (error) {
            return res.status(500).json({ message: "Error updating food", error });
        }
    },

    deleteFood: async (req, res) => {
        try {
            const id = req.params.id;
            const deletedFood = await foodModel.findByIdAndDelete(id);
            if (!deletedFood) {
                return res.status(404).json({ message: "Food not found" });
            }
            return res.status(200).json({ message: "Food deleted successfully", deletedFood });
        } catch (error) {
            return res.status(500).json({ message: "Error deleting food", error });
        }
    }
};