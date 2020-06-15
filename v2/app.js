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
	image: String,
	description: String
});

let Campground = mongoose.model('Campground', campgroundSchema);

// Campground.create(
// 	{
// 		name: 'Granite Hill',
// 		image: 'https://pixabay.com/get/54e5dc474355a914f1dc84609620367d1c3ed9e04e507440772e7add934ac5_340.jpg',
// 		description: 'This is a huge granite hill, no bathrooms. No water. Beautiful granite!'
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

// INDEX - show all campgrounds
app.get('/campgrounds', (req, res) => {
	// Get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds) {
		if (err) {
			console.log(err);
		} else {
			res.render('index', { campgrounds: allCampgrounds });
		}
	});
});

// Create - add new campground to DB
app.post('/campgrounds', (req, res) => {
	// get data from form and add to campgrounds array
	let name = req.body.name;
	let image = req.body.image;
	let desc = req.body.description;
	let newCampground = { name: name, image: image, description: desc };
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

// NEW -  show form to create new campground
app.get('/campgrounds/new', (req, res) => {
	// render a new form
	res.render('new.ejs');
});

// SHOW - shows more info about
app.get('/campgrounds/:id', function(req, res) {
	// find the campground with provided ID
	Campground.findById(req.params.id, function(err, foundCampground) {
		if (err) {
			console.log(err);
		} else {
			// render show template with that campground
			res.render('show', { campground: foundCampground });
		}
	});
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
