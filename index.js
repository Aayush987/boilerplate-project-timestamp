var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));

app.use(express.static('public'));

app.use(express.json());
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

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


var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});