/**
 * 测试 文件
 * @author ydr.me
 * @create 2016-05-17 12:13
 */


'use strict';

var expect = require('chai-jasmine').expect;
var Markdown = require('../src/index.js');

describe('测试文件', function () {
    it('basic', function () {
        var markdown = '你好';
        var md = new Markdown();
        var html = md.render(markdown);

        expect(html).toEqual('<p>你好</p>\n');
    });

    it('code highlight', function () {
        var markdown = '' +
            '```js\n' +
            'var a = 1;\n' +
            '```\n\n' +
            '```xxx\n' +
            'ab\n' +
            '```' +
            '';
        var md = new Markdown();
        var html = md.render(markdown);

        console.log(html);
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

    it('highlight-lines', function () {
        var markdown = '' +
            '```js {1, 3, 5-9, 11 - 12}\n' +
            'var a = 1;\n' +
            'var b = 1;\n' +
            'var c = 1;\n' +
            'var d = 1;\n' +
            'var e = 1;\n' +
            'var f = 1;\n' +
            'var g = 1;\n' +
            'var h = 1;\n' +
            'var i = 1;\n' +
            'var j = 1;\n' +
            'var k = 1;\n' +
            'var l = 1;\n' +
            'var m = 1;\n' +
            'var n = 1;\n' +
            'var o = 1;\n' +
            'var p = 1;\n' +
            'var q = 1;\n' +
            '```\n\n' +
            '```xxx\n' +
            'ab\n' +
            'cd\n' +
            'ef\n' +
            '```' +
            '';
        var md = new Markdown();
        md.use(require('../src/plugins/highlight-lines'));
        var html = md.render(markdown);

        console.log(html);
    });

    it('anchor', function () {
        var markdown = '' +
            '# h1\n\n' +
            '## 你好' +
            '';
        var md = new Markdown();
        md.use(require('../src/plugins/anchor'));
        var html = md.render(markdown);

        console.log(html);
    });

    it('toc', function () {
        var markdown = '' +
            '[[toc]]\n\n' +
            '# h1\n\n' +
            '## 你好' +
            '';
        var md = new Markdown();
        md.use(require('../src/plugins/toc'));
        var html = md.render(markdown);

        console.log(html);
    });

    it('mention', function () {
        var markdown = '' +
            '[@a](/a) 我<b>123</b> @some @one 你 [@b](/b)\n\n'+
            '```\n' +
            '@abc\n' +
            '```\n';
        var md = new Markdown();
        md.use(require('../src/plugins/mention'));
        var html = md.render(markdown);

        console.log(html);
    });

});

