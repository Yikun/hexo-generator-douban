var request = require('request');
var pagination = require('hexo-pagination');

module.exports = function(locals){
  var config = this.config;
  var url = 'http://api.douban.com/v2/book/user/'+config.douban.user+'/collections?status=read';

  request(url, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        // console.log(body);
      }
  });

  return {
      path: 'douban/index.html',
      data: "Douban Content"
  };
};