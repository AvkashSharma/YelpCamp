const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/yelp_camp', { useUnifiedTopology: true, useNewUrlParser: true });

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// SCHEMA SETUP
const campgroundSchema = new mongoose.Schema({
	name: String,
	image: String
});

let Campground = mongoose.model('Campground', campgroundSchema);

// Campground.create(
// 	{
// 		name: 'Granite Hill',
// 		image: 'https://pixabay.com/get/57e8d1454b56ae14f1dc84609620367d1c3ed9e04e50744074267fd49648cd_340.jpg'
// 	},
// 	function(err, campground) {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			console.log('NEWLY CREATED CAMPGROUND: ');
// 			console.log(campground);
// 		}
// 	}
// );

app.get('/', (req, res) => {
	res.render('landing');
});

app.get('/campgrounds', (req, res) => {
	// Get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds) {
		if (err) {
			console.log(err);
		} else {
			res.render('campgrounds', { campgrounds: allCampgrounds });
		}
	});
});

app.post('/campgrounds', (req, res) => {
	// get data from form and add to campgrounds array
	let name = req.body.name;
	let image = req.body.image;
	let newCampground = { name: name, image: image };
	// campgrounds.push(newCampground);
	// Create a new campground and save to the DB
	Campground.create(newCampground, function(err, newlyCreated) {
		if (err) {
			console.log(err);
		} else {
			// redirect to campgrounds page
			res.redirect('/campgrounds');
		}
	});
});

app.get('/campgrounds/new', (req, res) => {
	// render a new form
	res.render('new.ejs');
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
