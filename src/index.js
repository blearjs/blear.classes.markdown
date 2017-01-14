'use strict';


var Events = require('blear.classes.events');
var object = require('blear.utils.object');
var string = require('blear.utils.string');

var marked = require('./_marked');

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
    smartypants: false,

    /**
     * 是否自动缩短自动链接
     * <http://x.a.b/c/d/e/f> => <a href="http://x.a.b/c/d/e/f">x.a.b</a>
     * @type Boolean
     */
    shortAutoLink: true
};
var Markdown = Events.extend({
    className: 'Markdown',
    constructor: function (options) {
        var the = this;

        Markdown.parent(the);
        the[_options] = object.assign({}, defaults, options);
        the[_options].renderer = the[_renderer] = new marked.Renderer();
    },


    /**
     * 自定义渲染方式
     *
     * @param type
     * @param renderer
     * @returns {Markdown}
     */
    renderer: function (type, renderer) {
        this[_renderer][type] = renderer;
        return this;
    },


    /**
     * 渲染 markdown
     * @param markdown
     * @returns {String} html
     */
    render: function (markdown) {
        return string.trim(marked(markdown, this[_options]));
    },


    /**
     * 销毁实例
     */
    destroy: function () {
        Markdown.parent.destroy(this)
    }
});
var _renderer = Markdown.sole();
var _options = Markdown.sole();


Markdown.defaults = defaults;
module.exports = Markdown;
