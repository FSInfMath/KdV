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
var fs = require('fs');


var chrome_item = fs.readFileSync(__dirname + '/static/blog/chrome-item.html');

function readFileAsString(filename) {
    return fs.readFileSync(__dirname + '/' + filename, {
        'encoding': 'utf8'
    });
}


function assembleList() {
    var chrome_list = readFileAsString('static/blog/chrome-list.html');
    var prototype_listitem = readFileAsString('static/blog/prototype-listitem');
    var items = fs.readdirSync(__dirname + '/content');
    items = items.map(function (item) {
        var item_name = item;
        var item_title = readFileAsString('content/' + item + '/title');
        return prototype_listitem.replace('$link', '/blog/' + item_name + '/').replace('$title', item_title);
        //return typeof (item);
    }).join('');
    //return items;
    return chrome_list.replace('$list', items);
}

function assembleItem(number) {
    try {
        var chrome_item = readFileAsString('static/blog/chrome-item.html');
        var prototype_audioitem = readFileAsString('static/blog/prototype-audioitem');
        var content = readFileAsString('content/' + number + '/content.md');
        var audiolink = readFileAsString('content/' + number + '/audiolink');
        var title = readFileAsString('content/' + number + '/title');
        //return blog
        return chrome_item.replace('$title', title).replace('$title', title).replace('$audiolink', prototype_audioitem.replace('$audiofile', audiolink)).replace('$content', content);
    } catch (exception) {
        return "No entry with this number";
    }
}

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/static/landing.html');
});

app.get('/about', function (req, res) {
    res.sendFile(__dirname + '/static/about.html');
});

app.get('/blog', function (req, res) {
    var t = new Date().getTime();
    res.send(assembleList());
    console.log('Listing took ' + (new Date().getTime() - t) + ' ms');
});

app.get('/blog/:number/', function (req, res) {
    console.log("Request: " + req.path);
    var t = new Date().getTime();
    var number = parseInt(req.param('number'));
    if (number && !isNaN(number)) {
        res.send(assembleItem(number));
    } else {

    }
    console.log('Sending blog number ' + number + ' took ' + (new Date().getTime() - t) + ' ms');
});

app.get('/blog/:number/:ressource', function (req, res) {
    var number = req.param('number');
    var ressource = req.param('ressource');
    console.log('Request for ressource: ' + ressource + ' from number ' + number);
    if (number && !isNaN(number) && ressource && (ressource != "")) {
        console.log('Sending file ' + __dirname + '/content/' + number + '/' + ressource);
        res.sendFile(__dirname + '/content/' + number + '/' + ressource);
    }
});

var server = app.listen(3000, function () {
    console.log('Listening on port %d', server.address().port);
})
