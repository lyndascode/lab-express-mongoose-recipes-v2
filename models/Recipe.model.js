// Your code here ...
const mongoose = require('mongoose');


const recipeSchema = new mongoose.Schema(
    {
        title: String,
        instructions:
        {
            type: String,
            required: yes,
        },
        level: {
            type: String, enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
        },
        ingredients: { type: [String] },
        image: { type: String, default: "https://images.media-allrecipes.com/images/75131.jpg" },
        duration: { type: Number, min: 0 },
        isArchived: { type: Boolean, default: false },
        created: { type: Date, default: Date.now }
    }
)


module.exports = mongoose.model("Recipe", recipeSchema);
