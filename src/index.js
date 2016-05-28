'use strict';


var Events = require('blear.classes.events');
var object = require('blear.utils.object');

var marked = require('./_marked');

var defaults = {
    /**
     * @link https://help.github.com/articles/github-flavored-markdown
     * @type Boolean
     */
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
};
var Markdown = Events.extend({
    className: 'Markdown',
    constructor: function (options) {
        var the = this;

        the[_options] = object.assign({}, defaults, options);
        the[_options].renderer = new marked.Renderer();
    },


    /**
     * 自定义渲染方式
     * - `code(string code, string language)`
     * - `blockquote(string quote)`
     * - `html(string html)`
     * - `heading(string text, number level)`
     * - `hr()`
     * - `list(string body, boolean ordered)`
     * - `listitem(string text)`
     * - `paragraph(string text)`
     * - `table(string header, string body)`
     * - `tablerow(string content)`
     * - `tablecell(string content, object flags)`
     *
     * @param type
     * @param renderer
     * @returns {Markdown}
     */
    renderer: function (type, renderer) {
        return this;
    },


    /**
     * 渲染 markdown
     * @param markdown
     * @returns {String} html
     */
    render: function (markdown) {
        return marked(markdown, this[_options]);
    },


    /**
     * 销毁实例
     */
    destroy: function () {
        Markdown.parent.destroy(this)
    }
});
var _options = Markdown.sole();


Markdown.defaults = defaults;
module.exports = Markdown;
