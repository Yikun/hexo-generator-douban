var request = require('urllib-sync').request;

module.exports = function(locals){
  var config = this.config;
  var contents='';
  var start = 0;
  var total = 20;
  var count = 20;

  for (start = 0; start < total; start = start + count) {
    count = (start + count > total)?total-start:count;
    var url = 'https://api.douban.com/v2/book/user/' + 
              config.douban.user +
              '/collections?status=read&start='+start+'&count='+count;

    var res = request(url, {
      dataType: 'json'
    });

    count = res.data.count;
    total = res.data.total;

    var collections = res.data.collections;

    for (var i = 0; i < count; i++) {
      if(collections[i])
      {
        if(!collections[i].comment)
        {
          collections[i].comment="没有评论"
        }
        contents += "<article class=\"leisure\"><aside><img src="+
        collections[i].book.images.large+
        " alt="+collections[i].book.title+"></aside><section class=\"intro\"><ul><li>"+
        "<a class href="+collections[i].book.alt+">"+
        collections[i].book.title+
        "</a></li><li>"+
        collections[i].updated+
        "</li><li>"+
        collections[i].comment+
        "</li></ul></section></article><hr>"
      }
    };
    contents +="<style>.leisure{width:100%;min-height:130px;margin:20px 0;display:block;clear:both}.leisure img{width:128px;height:182px;float:left;background-color:white;padding:5px;border-radius:5px;border:1px solid #dedede;margin:-5px 10px 5px 0}.leisure .intro{margin:5px 10px 5px 0;width:100%}.leisure .intro ul{list-style:none;margin-left:0;min-height:188px}.leisure .intro ul li{line-height:20px;margin: 10px 0;}.leisure .intro ul li:first-child{font-size:20px;padding-bottom:5px;margin-bottom:10px;border-bottom:1px #eee solid}.leisure .intro ul li:before{content:none}</style>";
  };

  return {
    path: 'douban/index.html',
    data: {title: '读书', content: contents, comments:true, slug:'douban'},
    layout: 'post',
  };
};
