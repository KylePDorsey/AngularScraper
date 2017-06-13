var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var router = express.Router();
// var Item = require('./model/Item.model');

router.get('/test', function(req, res){
	res.send('Hello this is a test');
})

module.exports = router;