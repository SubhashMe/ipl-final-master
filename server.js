var object=require('./eco.json');
var express= require('express');
var path = require('path');
var app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/eco',(req,res) =>
{
    var season = req.query.year;
    var result = object[0].economicalBowlers[season];

    res.send(result);
})

if (require.main === module) {
  var server = app.listen(process.env.PORT || 8080, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("the server is ready at http://%s:%s", host,port)
  })
}

module.exports = app;