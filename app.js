// cmkm 2016.12.13

const fs = require('fs'), 
      http = require('http'), 
      router = require('router'),
      mustache = require('mustache');

const config = require(__dirname + '/config.json'), 
      template = fs.readFileSync(__dirname + '/template.html').toString();

mustache.parse(template);

var context = {
	config: config, 
	articles: []
};

console.log(context);

http.createServer(function(req, res) {
	req.on('error', function(err) {
		response.statusCode = 400;
		response.end();
	});

	res.on('error', function(err) {
		console.error(err);
	});

	if (req.method === 'GET' && req.url === '/css') {
		var style = fs.readFileSync(__dirname + '/style.css');
		res.setHeader('Content-Type', 'text/css');

		switch (config.settings.theme) {
			case "holiday": 
			 	style = fs.readFileSync(__dirname + '/themes/xmas.css');
				break;
			default: 
				break;
		}

		res.end(style);
	};


	if (req.method === 'GET') {
		res.end(mustache.render(template, context));
	};
}).listen(8080);
