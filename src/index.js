/**
 * 文件描述
 * @author ydr.me
 * @create 2018-10-10 15:09
 * @update 2018-10-10 15:09
 */


'use strict';

var Class = require('blear.classes.class');
var object = require('blear.utils.object');
var MarkdownIt = require('markdown-it');

var defaults = {
    /**
     * 是否支持渲染 markdown 里的 html
     * @type boolean
     */
    html: false,

    /**
     * pre/code 语言 class 前缀
     */
    langPrefix: 'lang-',

    /**
     * 高亮 pre/code
     * @param str
     * @param lang
     * @returns {*}
     */
    highlight: require('./utils/hightlight')
};
var Markdown = Class.ify(MarkdownIt).extend({
    className: 'Markdown',
    constructor: function (option) {
        this[_options] = object.assign({}, defaults, option);
        this[_markdown] = new MarkdownIt(this[_options]);
        this[_markdown].use(require('markdown-it-multimd-table'));
    },


    /**
     * 使用插件
     * @param plugin
     * @param [options]
     * @returns {Markdown}
     */
    use: function (plugin, options) {
        this[_markdown].use(plugin, options);
        return this;
    },

    /**
     * 渲染
     * @param markdown
     * @returns {*|String}
     */
    render: function (markdown) {
        return this[_markdown].render(markdown || '');
    }
});
var sole = Markdown.sole;
var _options = sole();
var _markdown = sole();

module.exports = Markdown;
