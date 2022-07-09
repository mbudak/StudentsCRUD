// Requires
const express = require("express");

// Defaults
const port = process.env.PORT || 3000;



// App
const app = express();


// Set EJS as templating engine
app.set('view engine', 'ejs');


// Middlewares


// Routes
app.use(require("./routes/home"));


// Listen
app.listen(port, () => {
    console.log(`App ready on http://localhost:${port}`)
})

