var bodyParser = require("body-parser");
var express = require("express");
var path = require("path");

var app = express();

// ROUTES

var friends = require("../data/friends.js");

module.exports = function(app) {
  // Return all friends found in friends.js as JSON
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    console.log(req.body.scores);

    // Receive user details (name, photo, scores)
    var user = req.body;

    // parseInt for scores
    for(var i = 0; i < user.scores.length; i++) {
      user.scores[i] = parseInt(user.scores[i]);
    }

    // Result will be whoever has the minimum difference in scores
    var friendIndex = 0;
    var minDiff = 40;

    
    //  whatever the difference is, add to the total difference
    for(var i = 0; i < friends.length; i++) {
      var totalDiff = 0;
      for(var j = 0; j < friends[i].scores.length; j++) {
        var difference = Math.abs(user.scores[j] - friends[i].scores[j]);
        totalDiff += difference;
      }

      // if there is a new minimum, change the best friend index
      if(totalDiff < minDiff) {
        friendIndex = i;
        minDiff = totalDiff;
      }
    }

    // after finding match, add user to friend array
    friends.push(user);

    
    res.json(friends[friendIndex]);
  });
};
