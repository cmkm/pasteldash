var request = require('request');
 
var req = request.get('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20geo.places.parent%20where%20child_woeid%20in%20(select%20woeid%20from%20geo.places%20where%20text%3D%22london%2C%20uk%22)&format=json');

const city = "savannah, ga";
const query = encodeURI("select * from weather.forecast where woeid in (select woeid from geo.places where text='" + city + "')");
const uri = "https://query.yahooapis.com/v1/public/yql?q=" + query + "&format=json";

var request = require('request')
  request(
    { method: 'GET'
    , uri: uri
    , gzip: true
    }
  , function (error, response, body) {
      // body is the decompressed response body 
      console.log('uri:' + uri);
      console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'))
      console.log('the decoded data is: ' + body)
    }
  ).on('data', function(data) {
    // decompressed data as it is received 
    console.log('decoded chunk: ' + data)
  })
  .on('response', function(response) {
    // unmodified http.IncomingMessage object 
    response.on('data', function(data) {
      // compressed data as it is received 
      console.log('received ' + data.length + ' bytes of compressed data')
    })
  });
