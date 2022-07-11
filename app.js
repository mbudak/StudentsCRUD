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

app.post("/data/create", async (request, response) => {
    const student = new studentModel(request.body);
    try {
      await student.save();
      response.send(student);
    } catch (error) {
      response.status(500).send(error);
    }
  });
  

  app.patch("/data/student/:id", async (request, response) => {
    try {
      await studentModel.findByIdAndUpdate(request.params.id, request.body);
      await studentModel.save();
      response.send(studentModel);
    } catch (error) {
      response.status(500).send(error);
    }
  });
  

  app.delete("/data/student/:id", async (request, response) => {
    try {
      const student = await studentModel.findByIdAndDelete(request.params.id);
  
      if (!student) response.status(404).send("No item found");
      response.status(200).send();
    } catch (error) {
      response.status(500).send(error);
    }
  });
  
  


// Listen
app.listen(port, () => {
    
    console.log(`App ready on http://localhost:${port}`)
})

