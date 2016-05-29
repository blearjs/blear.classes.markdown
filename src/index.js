'use strict';


var Events = require('blear.classes.events');
var object = require('blear.utils.object');
var string = require('blear.utils.string');

var marked = require('./_marked');

var reImageSize = /(?:\s+?=\s*?(\d+)(?:[x*×](\d+))?)?$/i;
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
     * 是否支持图片尺寸
     * @type Boolean
     */
    imageSizeable: true
};
var Markdown = Events.extend({
    className: 'Markdown',
    constructor: function (options) {
        var the = this;

        Markdown.parent(the);
        the[_options] = object.assign({}, defaults, options);
        the[_options].renderer = the[_renderer] = new marked.Renderer();

        if (the[_options].imageSizeable) {
            the[_renderer].image = function (src, title, alt) {
                src = src || '';

                var width = null;
                var height = null;

                src.replace(reImageSize, function (source, _width, _height) {
                    width = _width;
                    height = _height;
                    return '';
                });

                return ''.concat(
                    '<img',
                    src ? ' src="' + src + '"' : '',
                    width ? ' width="' + width + '"' : '',
                    height ? ' height="' + height + '"' : '',
                    title ? ' title="' + title + '"' : '',
                    alt ? ' alt="' + alt + '"' : '',
                    '>'
                );
            }
        }
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
