const Rectangle = require('../models/rectangle');									
									
// Controller để tính và trả về chu vi									
exports.calculatePerimeter = (req, res) => {									
const { width, height } = req.body;									
									
const rectangle = new Rectangle(Number(width), Number(height));									
const perimeter = rectangle.getPerimeter();									
									
res.render('index', { perimeter });									
};									