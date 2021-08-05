//jshint esversion: 6
const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const request = require('request');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html")
});

app.post("/", function (req, res) {

    const firstname = req.body.firstName;
    const lastname = req.body.lastName;
    const email = req.body.email;


    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstname,
                    LNAME: lastname
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us5.api.mailchimp.com/3.0/lists/08663537a0";
    const options = {
        method: "POST",
        auth: "abhay10:704779ea234f7e46d416bd49fa891c98-us5"
    };
    const request = https.request(url, options, function(response) {
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }


        response.on("data", function(data) {
            console.log(JSON.parse(data));
        })
    });

    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req, res){
    res.redirect("/");
})



app.listen(3000, function(){
    console.log("server is started on the port 3000");
});

//API KEY
// 704779ea234f7e46d416bd49fa891c98-us5
//ListID 
// 08663537a0