/**
 * 测试 文件
 * @author ydr.me
 * @create 2016-05-17 12:13
 */


'use strict';

var expect = require('chai-jasmine').expect;
var Markdown = require('../src/index.js');

describe('测试文件', function () {
    it('base', function () {
        var markdown = '你好';
        var md = new Markdown();
        var html = md.render(markdown);

        expect(html).toEqual('<p>你好</p>\n');
    });

    it('image size', function () {
        var markdown = '![test](image.png =100x200)';
        var md = new Markdown();
        md.use(require('../src/plugins/image-size'));
        var html = md.render(markdown);

        console.log(html);
        expect(html).toEqual('<p><img src="image.png" alt="test" width="100" height="200"></p>\n');
    });

    it('link favicon', function () {
        var markdown = '[test](//a.com/b)';
        var md = new Markdown();
        md.use(require('../src/plugins/link-favicon'));
        var html = md.render(markdown);

        console.log(html);
        expect(html).toEqual('<p><a href="//a.com/b" target="_blank"><img class="favicon" src="https://f.ydr.me/a.com" width="16" height="16">test</a></p>\n');
    });
});

