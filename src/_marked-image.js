/**
 * marked image
 * @author ydr.me
 * @create 2016-01-06 19:06
 */


'use strict';

var typeis = require('blear.utils.typeis');


var reSize = /(?:\s+?=(\d+)(?:[x*](\d+))?)?$/i;


var isEmpty = function (obj) {
    return typeis.Undefined(obj) || typeis.Null(obj) || obj === '';
};

module.exports = function () {
    // ![](1.png =200x100)
    return function (src, title, text) {
        src = src || '';

        var matches = src.match(reSize);
        var width = null;
        var height = null;

        if (matches) {
            width = matches[1];
            height = matches[2];
            src = src.replace(reSize, '');
        }

        return ''.concat(
            '<img',
            isEmpty(title) ? '' : ' title="' + title + '"',
            isEmpty(text) ? '' : ' alt="' + text + '"',
            isEmpty(src) ? '' : ' src="' + src + '"',
            isEmpty(width) ? '' : ' width="' + width + '"',
            isEmpty(height) ? '' : ' height="' + height + '"',
            '>'
        );
    };
};


