/**
 * 文件描述
 * @author ydr.me
 * @create 2018-10-10 18:09
 * @update 2018-10-10 18:09
 */


'use strict';

module.exports = function (md, rule) {
    // Remember old renderer, if overriden, or proxy to default renderer
    return md.renderer.rules[rule] || function (tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
    };
};


