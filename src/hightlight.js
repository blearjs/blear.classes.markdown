/**
 * 文件描述
 * @author ydr.me
 * @create 2018-10-10 17:41
 * @update 2018-10-10 17:41
 */


'use strict';


var codeHighligh = require('blear.utils.code-highlight');

/**
 * 语法高亮
 * @param str
 * @param lang
 * @returns {string}
 */
module.exports = function (str, lang) {
    return codeHighligh.text(str, lang, true);
};
