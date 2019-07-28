/**
 * 文件描述
 * @author ydr.me
 * @create 2018-10-10 17:41
 * @update 2018-10-10 17:41
 */


'use strict';


var codeHighligh = require('blear.ui.code-highlight');

var detect = require('./detect-lang');

/**
 * 语法高亮
 * @param str
 * @param lang
 * @returns {string}
 */
module.exports = function (str, lang) {
    lang = lang || detect(str) || 'plain';
    return codeHighligh.text(str, lang, true);
};
