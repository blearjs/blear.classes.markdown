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
    regexp: /(\s|)[@＠]([a-z][\w-]+)(\s|)/ig,
    className: 'mention',
    parseURL: function (username) {
        return '/user/' + encodeURIComponent(username);
    },
    external: false,
    onMention: function (username) {
        // ...
    }
};

module.exports = function (md, configs) {
    configs = object.assign({}, defaults, configs);
    var render = function (start, username, end) {
        var attrs = [];
        attrs.push('href="' + configs.parseURL(username) + '"');

        if (configs.className) {
            attrs.push('class="' + configs.className + '"');
        }

        if (configs.external) {
            attrs.push('target="_blank"');
        }

        return start + '<a ' + attrs.join(' ') + '>@' + username + '</a>' + end;
    };

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
            username = username.trim();
            username = configs.onMention(username) || username;
            return render(start, username, end);
        });
        token.type = 'html_inline';
    });
};
