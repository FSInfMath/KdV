var express = require('express');
var app = express();
var fs = require('fs');


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

//file system: synchron alle dateien im ordner auflisten
//arrays in javascript angucken
// json.stringify : aus javascript objekt nen string
app.get('/products', function (req, res) {
    res.send(JSON.stringify(fs.readdirSync(__dirname + '/data/products').map(function (item) {
        return item.split('.')[0];
    })));
});

app.get('/users', function (req, res) {
    res.send(JSON.stringify(fs.readdirSync(__dirname + '/data/users').map(function (item) {
        return item.split('.')[0];
    })));
});

app.get('/transactions', function (req, res) {
    res.send(JSON.stringify(fs.readdirSync(__dirname + '/data/transactions').map(function (item) {
        return item.split('.')[0];
    })));
});

app.get('/admin', function (req, res) {
    res.sendFile(__dirname + '/static/admin.html');
});

app.post('/admin/delete/product=:productid', function (req, res) {
    var productid = req.param('productid');
    var fileToDelete = __dirname + '/data/products/' + productid + '.json';
    if (productid && fs.existsSync(fileToDelete)) {
        fs.unlinkSync(fileToDelete);

});

app.get('/product=:productid', function (req, res) {
    var productid = req.param('productid');
    if (productid && fs.existsSync(__dirname + '/data/products/' + productid + '.json')) {
        res.sendFile(__dirname + '/data/products/' + productid + '.json');
    } else {
        res.send('Product not found \n');
    }
});

app.get('/product=:productid/:property', function (req, res) {
    var productid = req.param('productid');
    var property = req.param('property');
    if (productid && fs.existsSync(__dirname + '/data/products/' + productid + '.json')) {
        var raw = fs.readFileSync(__dirname + '/data/products/' + productid + '.json', 'utf-8');
        var product = JSON.parse(raw);
        if (property && product.hasOwnProperty(property)) {
            res.send(product[property]);
        } else {
            res.send('Property not found');
        }
    } else {
        res.send('Product not found \n');
    }
});

app.get('/user=:userid', function (req, res) {
    var answer = "Userid = " + req.param('userid');
    res.send(answer);
});

app.post('/buy/product=:productid,user=:userid', function (req, res) {

});

app.post('/pay/user=:userid,amount=:amount', function (req, res) {

});

//TODO: Weitere anlegen
app.post('/admin/create-product/product=:productid', function (req, res) {

});

var server = app.listen(3000, function () {
    console.log('Listening on port %d', server.address().port);
})
