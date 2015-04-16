var log = hexo.log;
var request = require('request');
var config = hexo.config.douban;
var url = 'http://api.douban.com/v2/book/user/'+config.user+'/collections?status=read';

request(url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
        //log.i(body);
    }
});
