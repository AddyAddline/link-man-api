require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const apiRouter = require('./routes/urlRouter');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const app = express();

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch((err) => {
		console.log(err);
	});
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', apiRouter);

app.get('/ping', (req, res) => {
	res.json({ message: 'pong' });
});

app.use((req, res) => {
	res.status(404).json({ message: 'Invalid route' });
});
app.use((err, req, res, next) => {
	console.log(err);
	res.status(500).json({ message: 'Internal server error' });
});

app.listen(PORT, () => {
	console.log('Server is running on port ' + PORT);
});
