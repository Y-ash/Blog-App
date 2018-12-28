var express    = require('express'),
    app        = express(),
    mongoose   = require('mongoose'),
    bodyParser = require('body-parser');

//App Configuration
mongoose.connect('mongodb://localhost/Blog_App', {useNewUrlParser: true});
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//Mongoose/Model Configuration
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model('Blog', blogSchema);

//RestFul Routes

app.get('/', function(req, res){
    res.redirect('/blogs');
});

app.get('/blogs', function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log('Error!!');
        } else{
            res.render('index', {blogs: blogs});
        }
    });
});

// New
app.get('/blogs/new', function(req, res){
    res.render('new');
});

// Create 

app.post('/blogs', function(req, res){
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render('new');
        } else {
            res.redirect('/blogs');
        }
    })
});


//title
//image
//body
//created

app.listen(3000, function(){
    console.log("BlogApp server has been started");
})