var express = require('express');
var app = express();


var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + '/static'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/static/landing.html');
});

app.get('/products', function (req, res) {

});

app.get('/product=:productid', function (req, res) {

});

app.get('/user=:userid', function (req, res) {
    var answer = "Userid = " + req.param('userid');
    res.send(answer);
});

app.post('/buy/product=:productid,user=:userid', function (req, res) {

});

app.post('/buy/user=:userid,amount=:amount', function (req, res) {

});

var server = app.listen(3000, function () {
    console.log('Listening on port %d', server.address().port);
})
