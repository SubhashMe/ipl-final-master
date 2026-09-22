var object=require('./eco.json');
var express= require('express');
var app = express();
app.use(express.static('public'));

app.get('/eco',(req,res) =>
{
    var season = req.query.year;
    var result = object.economicalBowlers[season];

    res.send(result);
})

 var server = app.listen(process.env.PORT || 8080, function () 
 {
 var host = server.address().address
 var port = server.address().port

    console.log("the server is ready at http://%s:%s", host,port)
})