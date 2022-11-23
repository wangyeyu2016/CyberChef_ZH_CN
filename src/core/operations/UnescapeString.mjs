/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";

/**
 * Unescape string operation
 */
class UnescapeString extends Operation {

    /**
     * UnescapeString constructor
     */
    constructor() {
        super();

        this.name = "Unescape string";
        this.module = "Default";
        this.description = "从已被逃脱的字符串中的字符。例如，<code> don \\'t立即停止我</code> </code> <code>现在不要停止我</code>。<br> <br> <br> <br> <br>以下逃脱序列：<ul> <li> <code> \\ n </code>（line feed/newline）</li> <li> <li> <code> \\ r </code>（马车返回）</ li> <li> <code> \\ t </code>（水平tab）</li> <li> <li> <code> \\ b </code>（backSpace）</li> <li> <li> <code> <code> \\ \\ \\ f </code>（form feed）</li> <li> <code> \\ nnn </code>（八倍，其中n为0-7）</li> <li> <li> <code> \\ xnn </code>（hex，n是0-f）</li> <li> <code> \\\\ </code>（BackSlash）</li> <li> <li> <code> <code> \\'</</代码>（单Quote）</li> <li> <code> \\“ _ </code>（double Quote）</li> <li> <li> <code> \\ unnnn </code>（unicode cartinal）< /li> <li> <code> \\ u {nnnnnn} </code>（unicode代码点）</li> </ul>";
        this.infoURL = "https://wikipedia.org/wiki/Escape_sequence";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        return Utils.parseEscapedChars(input);
    }

}

export default UnescapeString;
