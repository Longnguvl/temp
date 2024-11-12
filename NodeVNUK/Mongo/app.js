require('dotenv').config();															
const express = require('express');															
const bodyParser = require('body-parser');															
const mongoose = require('mongoose');															
const squareRoutes = require('./routes/squareRoutesMongo');															
															
const app = express();															
const PORT = process.env.PORT || 3000;															
															
// Kết nối MongoDB															
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })															
.then(() => console.log('MongoDB connected'))															
.catch(err => console.log(err));															
															
// Sử dụng EJS làm view engine															
app.set('view engine', 'ejs');															
app.set('views', './views');															
															
// Middleware															
app.use(bodyParser.urlencoded({ extended: true }));															
															
// Sử dụng routes															
app.use('/', squareRoutes);															
															
// Chạy ứng dụng															
app.listen(PORT, () => {															
console.log(`Server is running on http://localhost:${PORT}`);															
});															