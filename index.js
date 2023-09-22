require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const apiRouter = require('./routes/urlRouter');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const app = express();

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI);
		console.log('MongoDB Connected');
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', apiRouter);

app.use((req, res) => {
	res.status(404).json({ message: 'Invalid route' });
});
app.use((err, req, res, next) => {
	console.log(err);
	res.status(500).json({ message: 'Internal server error' });
});

connectDB().then(() => {
	app.listen(PORT, () => {
		console.log('listening for requests');
	});
});
