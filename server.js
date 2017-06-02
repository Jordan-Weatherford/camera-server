var express = require('express')
var path = require('path')

var app = express()
var bodyParser = require('body-parser')

var PORT = 8000

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './node_modules')))
app.use(express.static(__dirname + '/discussion-app/dist'))

require('./server/config/mongoose.js')

require('./server/config/routes.js')(app)

app.listen(PORT, function(){
    console.log(`Listening on port 8000`)
})