/**
 * 文件描述
 * @author ydr.me
 * @create 2018-10-10 21:08
 * @update 2018-10-10 21:08
 */


'use strict';

var object = require('blear.utils.object');
var plugin = require('markdown-it-anchor');

var defaults = {
    level: 1,
    slugify: require('../utils/slugify')
};

module.exports = function (md, configs) {
    plugin(md, object.assign({}, defaults, configs));
};



