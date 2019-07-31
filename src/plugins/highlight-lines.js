/**
 * 文件描述
 * @ref https://github.com/egoist/markdown-it-highlight-lines/blob/master/src/index.js
 * @ref https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/markdown/lib/highlightLines.js
 * @author ydr.me
 * @create 2018-10-10 18:06
 * @update 2018-10-10 18:06
 */


'use strict';

var array = require('blear.utils.array');
var object = require('blear.utils.object');

var detect = require('../utils/detect-lang');

var defaults = {
    theme: 'light'
};

module.exports = function (md, configs) {
    configs = object.assign({}, defaults, configs);
    md.renderer.rules.fence = function (tokens, idx, options, env, self) {
        var token = tokens[idx];
        var dftLang = 'plain';
        var info = (token.info.trim() || detect(token.content) || dftLang).trim();
        var matches = info.match(/^([^{\s]+)\s*?(?:{([\d\s,-]+)})?$/);
        var lang = matches && matches[1] || dftLang;
        var lines = matches && matches[2] || '';

        return options.highlight ? options.highlight(token.content, lang, lines) : token.content;
    };
};

