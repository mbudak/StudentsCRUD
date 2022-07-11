const express = require('express');
const routerHome = express.Router();

routerHome.route('/').get(function (req, res) {
    students.find({}, function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.render()
            res.send(result);
        }
      });
})

module.exports = routerHome;

