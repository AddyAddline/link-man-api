const shortid = require('shortid');
const bcrypt = require('bcryptjs');
const URL = require('../models/Url');

function ensureHttps(link) {
	if (!link.startsWith('https://' || 'http://')) {
		link = 'https://' + link;
	}
	return link;
}

async function generateUrl(req, res) {
	try {
		const { url, password } = req.body;

		const secureLink = ensureHttps(url);
		const shortId = shortid.generate();
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		const newUrl = new URL({
			shortId,
			redirectedUrl: secureLink,
			password: hashedPassword
		});
		await newUrl.save();
		res.status(200).json({ message: 'Url generated successfully', shortId });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Internal server error' });
	}
}

async function redirectToUrl(req, res) {
	const { shortId, password } = req.body;

	try {
		if (!shortId) {
			return res.status(400).json({ message: 'Short id is required' });
		}
		const urlData = await URL.findOne({ shortId });
		if (!urlData) {
			return res.status(404).json({ message: 'Url not found' });
		}
		if (urlData.password === null) {
			return res.status(200).json({ message: 'Redirecting to url', url: urlData.redirectedUrl });
		}

		const isMatch = await bcrypt.compare(password, urlData.password);

		if (!isMatch) {
			return res.status(401).json({ message: 'Invalid password' });
		}

		res.status(200).json({ message: 'Redirecting to url', url: urlData.redirectedUrl });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Internal server error in redirect' });
	}
}
async function checkUrl(req, res) {
	const { shortId } = req.body;
	try {
		if (!shortId) {
			return res.status(400).json({ message: 'Short id is required' });
		}
		const urlData = await URL.findOne({ shortId });
		if (!urlData) {
			return res.status(404).json({ message: 'Url not found' });
		}
		res.status(200).json({ message: 'Url found' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Internal server error in redirect' });
	}
}
module.exports = { generateUrl, redirectToUrl, checkUrl };
