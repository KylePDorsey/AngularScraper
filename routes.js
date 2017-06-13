var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var router = express.Router();
var Item = require('./model/Item.model');

// router.get('/test', function(req, res){
// 	res.send('Hello from api/test');
// })

router.post('/scrape', function(req, res) {
	var url = req.body.url;

	if(url.indexOf('indeed') > -1) {
		request( url, function(error, resp, body) {
			console.log(url);

			if(error){
				console.log('Error Scraping');
			}

			if(!error){
				var $ = cheerio.load(body);
				var companyName = $('.company');
				var companyNameText = companyName.text();

				var jobTitle = $('.jobtitle font');
				var jobTitleText = jobTitle.text();

				var jobLocation = $('.location');
				var jobLocationText = jobLocation.text();

				var summary =$('#job_summary p');
				var summaryText = summary.text();

				var job = {
					jobTitle: jobTitleText,
					location: jobLocationText,
					companyName: companyNameText,
					summary: summaryText
				};
				console.log('Successfully Scraped ', job);
				res.json(job);
			}
		});
	} else {
		console.log('cannot locate scraper');
	}
})
module.exports = router;