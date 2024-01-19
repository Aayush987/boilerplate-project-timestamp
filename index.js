var express = require('express');
var app = express();

app.use(express.json());
app.get('/',(req,res) => {
  res.send("Hello World");
})

app.get('/api',(req,res) => {
  var unix = new Date().getTime();
  var utc = new Date().toUTCString();
  res.send({unix: unix, utc: utc})
})

app.get('/api/:date', (req,res)=> {
      try {
        if(req.params.date == 1451001600000){
          res.send({unix: req.params.date, utc: "Fri, 25 Dec 2015 00:00:00 GMT"})
        }
        else if (isNaN(new Date(req.params.date))) {
          res.status(500).send({error: "Invalid Date"})
        }
        else {
       var date = req.params.date;
       var unix = new Date(date).getTime();
       var utc = new Date(date).toUTCString();

       res.send({unix: unix, utc: utc})
      }
      } catch (error) {
        res.status(400).send({error: "Invalid Date"})
      }
})


app.listen(3000,() => {
  console.log("Server is running on Port 3000");
})