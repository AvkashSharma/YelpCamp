const express = require('express'),
	app = express(),
	port = 3000,
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	Campground = require('./models/campground'),
	Comment = require('./models/comment'),
	seedDB = require('./seeds');

mongoose.connect('mongodb://localhost/yelp_camp', { useUnifiedTopology: true, useNewUrlParser: true });
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
seedDB();

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
			res.render('campgrounds/index', { campgrounds: allCampgrounds });
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
	res.render('campgrounds/new');
});

// SHOW - shows more info about
app.get('/campgrounds/:id', function(req, res) {
	// find the campground with provided ID
	Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground) {
		if (err) {
			console.log(err);
		} else {
			// render show template with that campground
			res.render('campgrounds/show', { campground: foundCampground });
		}
	});
});

// ==============================
// COMMENTS ROUTE
// ==============================

app.get('/campgrounds/:id/comments/new', function(req, res) {
	// find campground by id
	Campground.findById(req.params.id, function(err, campground) {
		if (err) {
			console.log(err);
		} else {
			res.render('comments/new', { campground: campground });
		}
	});
});

app.post('/campgrounds/:id/comments', function(req, res) {
	//lookup campground using ID
	Campground.findById(req.params.id, function(err, campground) {
		if (err) {
			console.log(err);
			res.redirect('/campgrounds');
		} else {
			Comment.create(req.body.comment, function(err, comment) {
				if (err) {
					console.log(err);
				} else {
					campground.comments.push(comment);
					campground.save();
					res.redirect('/campgrounds/' + campground._id);
				}
			});
		}
	});
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
