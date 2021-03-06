/**
 * link favicon
 * @author ydr.me
 * @create 2018-10-10 15:52
 * @update 2018-10-10 15:52
 */


'use strict';

var url = require('blear.utils.url');

var rendererRule = require('../utils/renderer-rule');

module.exports = function (md, options) {
    var render = rendererRule(md, 'link_open');

    md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
        var token = tokens[idx];
        var href = token.attrGet('href');

        if (!href) {
            return render(tokens, idx, options, env, self);
        }

        var pt = url.parse(href);

        if (!pt.host) {
            return render(tokens, idx, options, env, self);
        }

        var attrs = [];

        token.attrs.push(['target', '_blank']);

        token.attrs.forEach(function (item) {
            attrs.push(item[0] + '="' + item[1] + '"');
        });

        return '<a ' + attrs.join(' ') + '><img class="favicon" src="https://f.ydr.me/' + pt.host + '" width="16" height="16">';
    };
};


