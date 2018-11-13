/**
 * 提及
 * @ref https://www.npmjs.com/package/markdown-it-flowdock
 * @author ydr.me
 * @create 2018-11-13 19:42
 * @update 2018-11-13 19:42
 */


'use strict';

var object = require('blear.utils.object');
var iterator = require('markdown-it-for-inline');

var defaults = {
    regexp: /(?:\s|)[@＠]([\w-]+)(?:\s|)/g,
    className: 'mention',
    parseURL: function (username) {
        return '/user/' + encodeURIComponent(username);
    },
    external: false
};

module.exports = function (md, configs) {
    configs = object.assign({}, defaults, configs);
    var render = function (username) {
        var attrs = [];
        attrs.push('href="' + configs.parseURL(username) + '"');

        if (configs.className) {
            attrs.push('class="' + configs.className + '"');
        }

        if (configs.external) {
            attrs.push('target="_blank"');
        }

        return '<a ' + attrs.join(' ') + '>@' + username + '</a>';
    };

    md.use(iterator, 'foo_replace', 'text', function (tokens, idx) {
        var token = tokens[idx];

        if (token.level === 0) {
            token.content = md.utils.escapeHtml(token.content);
            token.content = token.content.replace(configs.regexp, function ($0, username) {
                return render(username.trim());
            });
            token.type = 'html_inline';
        }
    });
};
