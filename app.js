const express= require("express");
const app = express();

const https = require("https"); //Use to get all the JSON function

const bodyParser= require("body-parser"); //npm i body-parser in order to be able to get the text from the html




app.use(bodyParser.urlencoded({extended:true}))

app.get("/", function(req, res){

	res.sendFile(__dirname+"/index.html");


});

app.post("/", function (req, res){

		const query = req.body.cityName; //Retrieving the city text from html using body parser
		const appId = "656c0c997eb578383f29d37c9ecf2d30"
		const unit = "metric";
		const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+appId+"&units="+unit+"";

		https.get(url , function(response){

			response.on("data", function(data){
				
				//Retrieving all the JSON API data into a const.
				const weatherData = JSON.parse(data);
				
				//Retrieving the Weather Icon.Weather Temperature and Weather Description form the JSON stored in weatherData
				const weatherIcon = weatherData.weather[0].icon;
				const imageURL= "http://openweathermap.org/img/wn/" + weatherIcon+"@2x.png";
				const weatherTemp = weatherData.main.temp;
				const weatherDescription  = weatherData.weather[0].description
				
				console.log(weatherTemp, weatherDescription);
				
				res.write("<h1> The temperature in "+query+" is: " + weatherTemp + " degrees Celcius.</h1>");
				res.write("<p>The weather is currently: " + weatherDescription+ "</p>");
				res.write("<img src= "+ imageURL +">");

				res.send();
				
			});

		
		});


	})


app.listen(3000, function (){
    console.log("Sever is running on port 3000");
});