/**
 * 提及
 * @ref https://www.npmjs.com/package/markdown-it-flowdock
 * @author ydr.me
 * @create 2018-11-13 19:42
 * @update 2018-11-13 19:42
 */


'use strict';

var object = require('blear.utils.object');
var string = require('blear.utils.string');
var iterator = require('markdown-it-for-inline');

var defaults = {
    regexp: /(\s|)[@＠]([a-z][\w-]+)(\s|)/ig,
    render: function (start, username, end) {
        return string.assign(
            start + '<a href="/user/${u}" class="mention">@${u}</a>' + end,
            {
                u: encodeURIComponent(username.trim())
            }
        );
    }
};

module.exports = function (md, configs) {
    configs = object.assign({}, defaults, configs);
    md.use(iterator, 'foo_replace', 'text', function (tokens, idx) {
        var token = tokens[idx];
        var regexp = configs.regexp;

        if (token.level !== 0) {
            return token;
        }

        if (!regexp.test(token.content)) {
            return token;
        }

        token.content = md.utils.escapeHtml(token.content);
        token.content = token.content.replace(regexp, function (source, start, username, end) {
            return configs.render(start, username, end);
        });
        token.type = 'html_inline';
    });
};
