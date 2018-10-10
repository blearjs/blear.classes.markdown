/**
 * 文件描述
 * @author ydr.me
 * @create 2018-10-10 21:20
 * @update 2018-10-10 21:20
 */


'use strict';


/**
 * 序列化
 * @param x
 * @returns {string}
 */
module.exports = function (x) {
    return 'heading-' + encodeURIComponent(String(x).trim().toLowerCase().replace(/\s+/g, '-'));
};


