# NAME

node-easywebthumb - EasyThumb Bluga.net WebThumb API wrapper for node.js

# DESCRIPTION

You will need your own API key to use this wrapper. For more information see the [EasyThumb API](http://webthumb.bluga.net/api-easythumb) documentation.

# INSTALL

The easy way to install is to use [npm](https://github.com/isaacs/npm):

    npm install zlibstream

# USAGE

```javascript
var easythumb = require('./lib/easythumb.js');

var apiuser = '<api user>';
var apikey = '<api key>';

var url = 'http://www.google.com/';
var size = 'large';
var daystocache = '7';

var api = easythumb.createAPI(apiuser, apikey);
api.create(url, size, daystocache, function(body, uri, error)
{
  if(error != null)
  {
    console.log('Error: ' + error);
  }
  else
  {
    console.log('Response uri: ' + uri);
  }
});
```

# LICENSE

node-easywebthumb is released with an MIT license
