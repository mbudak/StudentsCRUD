const express = require('express');
const routerHome = express.Router();

routerHome.route('/').get(function (req, res) {
    res.render("home");
})

module.exports = routerHome;