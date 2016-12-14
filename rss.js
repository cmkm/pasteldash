var FeedParser = require('feedparser'), 
    request = require('request');
 
var req = request('http://feeds.feedburner.com/motherjones/main?format=xml'), 
    feedparser = new FeedParser();

var articles = [];
 
req.on('error', function (error) {
  // handle any request errors 
});
req.on('response', function (res) {
  var stream = this;
 
  if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));
 
  stream.pipe(feedparser);
});
 
 
feedparser.on('error', function(error) {
  // always handle errors 
});
feedparser.on('readable', function() {
  // This is where the action is! 
  var stream = this
    , meta = this.meta // **NOTE** the "meta" is always available in the context of the feedparser instance 
    , item;
 
  var i = 0;
  while ((item = stream.read()) && (i < 10)) {
    articles.push({"title": item.title, "pubdate": item.pubdate, "link": item.origlink});
    i++;
  }

console.log(articles);
});
