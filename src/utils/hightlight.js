/**
 * 文件描述
 * @author ydr.me
 * @create 2018-10-10 17:41
 * @update 2018-10-10 17:41
 */


'use strict';


var string = require('blear.utils.string');

var detect = require('./detect-lang');

/**
 * 语法高亮
 * @param code
 * @param lang
 * @returns {string}
 */
module.exports = function (code, lang, highlight) {
    lang = lang || detect(code) || 'plain';
    return string.assign('<pre class="prism" data-language="${l}" data-highlight="${h}"><code>${c}</code></pre>', {
        l: lang,
        c: code,
        h: highlight || ''
    });
};
