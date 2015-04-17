var assign = require('object-assign');

hexo.config.douban = assign({
    per_page: hexo.config.per_page,
}, hexo.config.douban);

hexo.extend.generator.register('douban', require('./lib/generator'));