var path = require("path");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose');

app.use(bodyParser.urlencoded());
// static content
//app.use(express.static(path.join(__dirname, "./static")));

// set the views folder and set up ejs
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
 res.render('index');
})

app.get('/quote', function(req, res) {
  Quote.find({}, function(err, users) {
  if (err) {return console.error(err);}
    // notice how the first parameter is the options for what to find and the second is the callback function that has an error (if any) and all of the users
    // keep in mind that everything you want to do AFTER you get the data from the database must happen inside of this callback for it to be synchronous 
    // Make sure you handle the case for when there is an error as well as the case for when there is no error
  })

 res.render('main');
})

app.post('/quote', function(req, res) {

 console.log("POST DATA", req.body);

  var quote = new Quote({name: req.body.name, quote: req.body.quote});
  quote.save(function(err) {
    if(err) {
      console.log('something went wrong');
    } else { // else console.log that we did well and then redirect to the root route
      console.log('successfully added quote');
      //res.redirect('/');
    }
  })
 res.redirect('/quote');
})

// how we connect to mongodb database using mongoose -- "basic_mongoose" is the name of our db in mongodb -this should match the name of your DB
mongoose.connect('mongodb://localhost/quote_dojo');

var QuoteSchema = new mongoose.Schema({
 name: String,
 quote: String
})

var Quote = mongoose.model('Quote', QuoteSchema);


// listen on 8000
app.listen(8000, function() {
 console.log("listening on port 8000");
})
