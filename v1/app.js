const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/yelp_camp', { useNewUrlParser: true });

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

let campgrounds = [
	{
		name: 'Salmon Creek',
		image: 'https://pixabay.com/get/57e8d1454b56ae14f1dc84609620367d1c3ed9e04e507440772f78d79748c7_340.jpg'
	},
	{
		name: 'Granite Hill',
		image: 'https://pixabay.com/get/50e9d4474856b10ff3d8992ccf2934771438dbf85254784b752c78d4924f_340.jpg'
	},
	{
		name: "Mountain Goat's Rest ",
		image: 'https://pixabay.com/get/52e8d4444255ae14f1dc84609620367d1c3ed9e04e507440772f78d79748c7_340.jpg'
	}
];

app.get('/', (req, res) => {
	res.render('landing');
});

app.get('/campgrounds', (req, res) => {
	res.render('campgrounds', { campgrounds: campgrounds });
});

app.post('/campgrounds', (req, res) => {
	// get data from form and add to campgrounds array
	let name = req.body.name;
	let image = req.body.image;
	let newCampground = { name: name, image: image };
	campgrounds.push(newCampground);
	// redirect to campgrounds page
	res.redirect('/campgrounds');
});

app.get('/campgrounds/new', (req, res) => {
	// render a new form
	res.render('new.ejs');
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
