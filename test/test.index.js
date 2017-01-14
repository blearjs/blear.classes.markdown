/**
 * karma 测试 文件
 * @author ydr.me
 * @create 2016-05-17 12:13
 */


'use strict';

var Markdown = require('../src/index.js');

describe('测试文件', function () {
    it('simple', function () {
        var markdown = new Markdown();
        var string = '123';
        var html = markdown.render(string);
        var expected = '<p>123</p>';

        expect(html).toEqual(expected);
    });

    it('custom renderer', function () {
        var markdown = new Markdown();
        var markdown2 = new Markdown();
        var string = '@a';

        markdown.renderer('paragraph', function (str) {
            var inner = str.replace(/[@|＠]([a-z\d][a-z\d_.-]*)(\s|$|@|[^a-z\d_.-])/ig, function (source, name, after) {
                return '<a>@' + name + '</a>' + after;
            });

            return '<p>' + inner + '</p>';
        });

        var html = markdown.render(string);
        var html2 = markdown2.render(string);
        var expected = '<p><a>@a</a></p>';
        var expected2 = '<p>@a</p>';

        expect(html).toEqual(expected);
        expect(html2).toEqual(expected2);
    });

    it('img', function () {
        var markdown = '![](a)![](b =1)![](c =2x3)';
        var md = new Markdown();
        var html = md.render(markdown);

        expect(html).toMatch(/<img[^>]*?src="a"[^>]*?>/);
        expect(html).toMatch(/<img[^>]*?src="b"[^>]*?width="1"[^>]*?>/);
        expect(html).toMatch(/<img[^>]*?src="c"[^>]*?width="2" height="3"[^>]*?>/);
    });

    it('pre', function () {
        var md = new Markdown();

        expect(md.render('```js\n' +
            'a\n' +
            '```')).toMatch(/<pre class="lang-js"><code>a\n<\/code><\/pre>/);
    });
});
