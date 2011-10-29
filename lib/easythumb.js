var request = require('request'),
    hashlib = require('hashlib');

var EasyThumbAPI = exports.EasyThumbAPI = function EasyThumbAPI(apiuser, apikey)
{
  this.apiuser = apiuser;
  this.apikey = apikey;
}

//
// See http://webthumb.bluga.net/api-easythumb for call information.
//
EasyThumbAPI.prototype.create = function(url, size, cache, cb)
{
  if(size != 'small' && size != 'medium' && size != 'medium2' && size != 'large')
  {
    cb(null, null, 'Size is not valid.');
  }
  
  var now = new Date();
  now = new Date(now.getTime() - (now.getTimezoneOffset() * 1000));
  var month = (now.getUTCMonth() < 9 ? '0' : '') + (now.getUTCMonth()+1);
  var day = (now.getUTCDate() < 10 ? '0' : '') + now.getUTCDate();
  var hash = hashlib.md5(now.getUTCFullYear().toString() + month + day + url + this.apikey)

  var tocache = '';
  if(cache != null)
  {
    tocache = '&cache=' + cache;
  }

  var uri = 'http://webthumb.bluga.net/easythumb.php?user=' + this.apiuser + '&url=' + encodeURIComponent(url) + '&size=' + size + '&hash=' + hash + tocache;

  request(uri, function(error, response, body) 
  {
    console.log(response.headers['content-type']);
    if(!error && response.statusCode == 200 && response.headers['content-type'] == 'image/jpeg')
    {
      cb(body, uri, null)
    }
    else
    {
      cb(null, uri, error == null ? body : error)
    }
  });
}

exports.createAPI = function(apiuser, apikey) 
{
  return new EasyThumbAPI(apiuser, apikey);
}
