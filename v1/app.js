const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('landing');
});

app.get('/campgrounds', (req, res) => {
	let campgrounds = [
		{
			name: 'Salmon Creek',
			image: 'https://pixabay.com/get/57e8d1464d53a514f1dc84609620367d1c3ed9e04e50744074267fd49648cd_340.jpg'
		},
		{
			name: 'Granite Hill',
			image: 'https://pixabay.com/get/57e8d1454b56ae14f1dc84609620367d1c3ed9e04e50744074267fd49648cd_340.jpg'
		},
		{
			name: "Mountain Goat's Rest ",
			image: 'https://pixabay.com/get/57e0d6424b56ad14f1dc84609620367d1c3ed9e04e50744074267fd49648cd_340.jpg'
		}
	];
	res.render('campgrounds', { campgrounds: campgrounds });
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
