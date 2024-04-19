const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

  var options = {
    headers: {
      "Authorization": "adnan 8966f47e5a0754205d98048e5a49139d-us18"
  }
};

  // Create an object representing the data to be sent to Mailchimp
  const data = {
    members:[
      {
    email_address: email,
    status: "subscribed",
    merge_fields: {
      FNAME: firstName,
      LNAME: lastName
    }
  }
]
  };


  axios.post("https://us18.api.mailchimp.com/3.0/lists/98ed368e63", data, options)
    .then(function (response) {
      if (response.status === 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    })
    .catch(function (error) {
      console.error(error);
      res.sendFile(__dirname + "/failure.html");
    });
});
app.post("/failure", function(req,res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, function () {
  console.log("Server Started at port 3000");
});

//8966f47e5a0754205d98048e5a49139d-us18
//98ed368e63
