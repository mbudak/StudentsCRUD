// Requires
const express = require("express");

// Defaults
const port = process.env.PORT || 3000;
const router = express.Router();


// Models
const students = require('./models/student')

// MongoDB
const mongoose = require('mongoose');

var uri = "mongodb+srv://dbuserforstudent:q4Ebb4HkuHr5d1FY@cluster0.uspdezj.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", function() {
    console.log("MongoDB database connection established successfully");
});




// App
const app = express();


// Set EJS as templating engine
app.set('view engine', 'ejs');


// Middlewares
// app.use(express.json());
app.use(express.urlencoded( { extended: true }));


// Routes
// app.use(require("./routes/home"));
// app.use("/", router);

app.get('/', (req, res) => {
  students.find({}, function(err, result) {
    if (err) {
      console.log('error', err);
    } else {
      res.render('home.ejs', { students : result});
    }
  })
})

app.get('/new-student', (req, res) => {
  res.render('new-student.ejs');
})

app.post("/new-student",  (req, res) => {
    // const student = new studentModel(req.body); // fix it later    
    const { name, age, email, avatar } = req.body;
    var student = { 
      name: name,
      age: age,
      email: email,
      avatar: avatar
    }
    
    try {
      students.create(student);
    } catch (error) {
      res.status(500).send(error);
    }
    res.redirect("/");
  });

  app.post("/delete-student/:id",  (req, res) => {
    let { id } = req.params;
    students.findByIdAndDelete(id).then((student) => {
      console.log('student deleted', id);
    }).catch(err => {
      console.log('err', err.message);
    })
    res.redirect("/");
  });

// Listen
app.listen(port, () => {
    
    console.log(`App ready on http://localhost:${port}`)
})

