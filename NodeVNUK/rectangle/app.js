const express = require('express');									
const bodyParser = require('body-parser');									
const rectangleRoutes = require('./routes/rectangleRoutes');									
									
const app = express();									
const PORT = process.env.PORT || 3000;									
									
// Sử dụng EJS làm view engine									
app.set('view engine', 'ejs');									
app.set('views', './views');									
									
// Middleware									
app.use(bodyParser.urlencoded({ extended: true }));									
									
// Sử dụng routes									
app.use('/', rectangleRoutes);									
									
// Chạy ứng dụng									
app.listen(PORT, () => {									
console.log(`Server is running on http://localhost:${PORT}`);									
});									