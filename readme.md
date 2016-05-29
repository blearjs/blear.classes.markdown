# blear.classes.markdown

reference <https://github.com/chjj/marked>

[![npm module][npm-img]][npm-url]
[![build status][travis-img]][travis-url]
[![coverage][coveralls-img]][coveralls-url]

[travis-img]: https://img.shields.io/travis/blearjs/blear.classes.markdown/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/blearjs/blear.classes.markdown

[npm-img]: https://img.shields.io/npm/v/blear.classes.markdown.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/blear.classes.markdown

[coveralls-img]: https://img.shields.io/coveralls/blearjs/blear.classes.markdown/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/github/blearjs/blear.classes.markdown?branch=master


## 使用

```
var defaults = {
    /**
     * github 风格的 markdown
     * @link https://help.github.com/articles/github-flavored-markdown
     * @type Boolean
     */
    gfm: true,

    /**
     * 是否显示表格
     * @type Boolean
     */
    tables: true,

    /**
     * 是否显示断行
     * type Boolean
     */
    breaks: false,

    /**
     * 是否非完整匹配模式
     * @type Boolean
     */
    pedantic: false,

    /**
     * 是否过滤 HTML
     */
    sanitize: false,

    /**
     * 是否智能列表
     * @type Boolean
     */
    smartLists: true,

    /**
     * 是否智能修正模式
     * @type Boolean
     */
    smartypants: false
};
var markdown = new Markdown(options);
```


## `#renderer(type, renderer)`
自定义渲染方法

- `code(string code, string language)`
- `blockquote(string quote)`
- `html(string html)`
- `heading(string text, number level)`
- `hr()`
- `list(string body, boolean ordered)`
- `listitem(string text)`
- `paragraph(string text)`
- `table(string header, string body)`
- `tablerow(string content)`
- `tablecell(string content, object flags)`
- `strong(string text)`
- `em(string text)`
- `codespan(string text)`
- `br(string text)`
- `del(string text)`
- `link(string href, string title, string text)`
- `image(string href, string title, string text)`
- `text(string text)`
     
     
```
markdown.renderer('hr', function() {
    return '<hr class="hr">';
});
```


## `render(markdown)`
渲染输出 html
```
markdown.render('a')
// =>
<p>a</p>
```

