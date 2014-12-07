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

    app.post('...', function (req, res) {});

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
        var userid = req.param('userid');
        if (userid && fs.existsSync(__dirname + '/data/users/' + userid + '.json')) {
            res.sendFile(__dirname + '/data/users/' + userid + '.json');
        } else {
            res.send('User not found \n');
        }
    });

    app.get('/transaction=:transactionid', function (req, res) {
        var transactionid = req.param('transactionid');
        if (transactionid && fs.existsSync(__dirname + '/data/transactions/' + transactionid + '.json')) {
            res.sendFile(__dirname + '/data/transactions/' + transactionid + '.json');
        } else {
            res.send('Transaction not found \n');
        }
    });

    app.post('/buy/product=:productid,user=:userid', function (req, res) {

    });

    app.post('/pay/user=:userid,amount=:amount', function (req, res) {

    });

    //TODO: Weitere anlegen
    app.post('/admin/create-product/id=:id,name=:name,price=:price,stock=:stock,picture=:picture', function (req, res) {
        var product = {};
        product.id = req.param('id');
        product.name = req.param('name');
        product.price = req.param('price');
        product.stock = req.param('stock');
        product.picture = req.param('picture');
        if (product.id && product.name && product.price && product.stock && product.picture) {
            fs.writeFileSync(__dirname + '/data/products/' + product.id + '.json', JSON.stringify(product), 'utf-8');
            res.send('Saved');
        } else {
            res.send('Data incomplete');
        }
    });

    app.post('/admin/create-user/id=:id,name=:name,email=:email,balance=:balance,picture=:picture', function (req, res) {
        var user = {};
        user.id = req.param('id');
        user.name = req.param('name');
        user.email = req.param('email');
        user.balance = req.param('balance');
        user.picture = req.param('picture');
        if (user.id && user.name && user.email && user.balance && user.picture) {
            fs.writeFileSync(__dirname + '/data/users/' + user.id + '.json', JSON.stringify(user), 'utf-8');
            res.send('Saved');
        } else {
            res.send('Data incomplete');
        }

    });

    var server = app.listen(3000, function () {
        console.log('
    Listening on port % d ', server.address().port);
    })
