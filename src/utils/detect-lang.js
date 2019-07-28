/**
 * detect-lang
 * @author ydr.me
 * @create 2019-07-28 23:11:33
 * @update 2019-07-28 23:11:33
 */


'use strict';

var detect = require('program-language-detector').detect;

/**
 * 检测语言
 * @param code
 * @returns {string}
 */
module.exports = function (code) {
    var lang = detect(code);

    if (lang.toLowerCase() === 'unknown') {
        return '';
    }

    return lang;
};


