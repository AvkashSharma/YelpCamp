YelpCamp
# Tasks

### Layout and Basic Styling 
- Create header and footer partials
- Add in Bootstrap


### Creating New Campgrounds
- Setup new campground POST ROUTE
- Add in body-parser
- Setup route to show form
- Add basic unstyled form

### Style the campgrounds page
- Add a better header/title
- Make campgrounds display in a grid

### Add Mongoose 
- Install and configure Mongoose 
- Setup campground model
- Use campground model inside of our routes

### Show Page
- Review the RESTful routes we've seen so far
- Add description to out campground model
- Show db.collection.drop()
- Add a show route/template


### RESTFUL ROUTES

| Name  |     url                            |   verb  |         description                           |
--------|:-----------------------------------|:-------:|:---------------------------------------------:|
INDEX   |   /campgrounds                     |   GET   |   Display a list of all campgrounds           |
NEW     |   /campgrounds/new                 |   GET   |   Displays form to make a new campground      |
CREATE  |   /campgrounds                     |   POST  |   Add new campground to DB                    |
SHOW    |   /campgrounds/:id                 |   GET   |   Show info about one campground              |
NEW     |   campgrounds/:id/comments/new     |   GET   |   Show comments added to campground           |
CREATE  |   campgrounds/:id/comments         |   GET   |   Add new comment to DB                       |





### Comment New/Create
- Discuss nested routes
- Add the comment new and create routes
- Add the new comment form


### Tools Used
- Passport
- Passport Local
- Passport Local Mongoose

#### auth flow
#### Express-Session