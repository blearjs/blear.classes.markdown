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
var language = require('language-classifier');

var defaults = {
    theme: 'light'
};

module.exports = function (md, configs) {
    configs = object.assign({}, defaults, configs);
    md.renderer.rules.fence = function (tokens, idx, options, env, self) {
        var token = tokens[idx];
        var info = (token.info || language(token.content) || 'plain').trim();
        var matches = info.match(/^([^{\s]+)\s*?(?:{([\d\s,-]+)})?$/);
        var lang = matches[1];
        var lineNumbers = (matches[2] || '').split(/\s*,\s*/).map(function (range) {
            var slices = range.split(/\s*-\s*/);
            slices[1] = slices[1] || slices[0];
            return slices;
        });
        var inRange = function (lineNumber) {
            var yes = false;
            array.each(lineNumbers, function (index, slices) {
                var start = slices[0];
                var end = slices[1];

                if (lineNumber >= start && lineNumber <= end) {
                    yes = true;
                    return false;
                }
            });
            return yes;
        };

        // 代码和高亮分开
        var html = options.highlight ? options.highlight(token.content, lang) : token.content;
        var raw = html.replace(/^<pre[^>]*?><code[^>]*?>/, '');
        var max = raw.split('\n').length;
        var lines = '';

        for (var lineNumber = 1; lineNumber < max; lineNumber++) {
            var classSuffix = inRange(lineNumber) ? 'active' : 'placeholder';

            lines += '<div class="highlight-' + classSuffix + '">' + lineNumber + '</div>';
        }

        return '<div class="highlight highlight_' + configs.theme + '">' +
            '<div class="highlight-lines">' + lines + '</div>' +
            html +
            '</div>';
    };
};

