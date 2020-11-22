const express = require('express');
const https = require('https');
const bodyParser= require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));


app.get("/",(req,res)=>{
    res.sendFile(__dirname+ "/index.html");   
    });

    app.post("/",(req,res)=>{
       
        const city= req.body.cityName;
        const id= "18df6127b1593917391c3f082389663d";
        const url= "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&units=metric&appid=" + id ;
       
   
    //    const url ="https://api.openweathermap.org/data/2.5/weather?q=thoothukudi&appid=18df6127b1593917391c3f082389663d&units=metric"
   
       https.get(url,(response)=>{
   
           console.log(response.statusCode);
           response.on("data", (data)=>{
              const weatherData = JSON.parse(data);
              const temperature= weatherData.main.temp;
              const weatherDescription= weatherData.weather[0].description;
              const icon =weatherData.weather[0].icon;
              const imgURL =  "https://openweathermap.org/img/wn/"+icon+"@2x.png"
              
              res.write("<h1>The climate in " +city + " is "+ temperature +"degree celcius</h1>");
              res.write("<h3>The weather is "+ weatherDescription+ "</h3>");
              res.write("<img src=" +imgURL + ">");
              res.send();
           });
    })
   
})

    


app.listen(3000,(req,res)=>{
    console.log("Server Connected to Server 3000")
});