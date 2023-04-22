const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");

const app=express();

app.use(express.static("Public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname +"/signup.html");
});

app.post("/", function(req, res){

    const firstName=req.body.fName;
    const lastName=req.body.lName;
    const email=req.body.email;
    
const data={
    members:[
        {
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName
            }
        }
    ]
}; 
const jsonData=JSON.stringify(data);

const url="https://us17.api.mailchimp.com/3.0/lists/f2356de632";

const options={
    method:"POST",
    auth:"Aniket1:0ba0b900750fa0c17598b2208d73352a-us17"
}
const request=https.request(url, options, function(response){

    if(response.statusCode===200)
    {
        res.sendFile(__dirname+"/success.html");
    }
    else
    {
        res.sendFile(__dirname+"/failure.html");
    }

    response.on("data", function(data){
        console.log(JSON.parse(data))
    });
});

request.write(jsonData);
request.end();

});

app.post("/failure", function(req, res){
    res.redirect("/");
})

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});


// Api Key
//664b96d7ade76891da5ff62a95a3b960-us17

//List ID
//f2356de632
