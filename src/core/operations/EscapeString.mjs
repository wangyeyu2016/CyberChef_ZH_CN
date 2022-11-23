/**
 * @author Vel0x [dalemy@microsoft.com]
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import jsesc from "jsesc";

/**
 * Escape string operation
 */
class EscapeString extends Operation {

    /**
     * EscapeString constructor
     */
    constructor() {
        super();

        this.name = "Escape string";
        this.module = "Default";
        this.description = "逃脱字符串中的特殊字符，以免引起冲突。例如，<code>现在不要停止我</code>变成<code> don \\'T现在停止我</code>。<br> <br>支持以下逃生序列：<ul> <li> <code> \\ n </code>（line feed/newline）</li> <li> <li> <code> <code> \\ r </code>（马车返回）</li> <li> <code> \\ t </code>（水平选项卡）</li> <li> <li> <code> \\ b </code>（backspace）</li> <li> <code> \\ f </code>（Form feed）</li> <li> <code> \\ xnn </code>（hex，n is n as 0-f）</li> <li> <code > \\\\ </code>（BackSlash）</li> <li> <code> \\'</code>（单Quote）</li> <li> <li> <code> <code> \\” _ </code >（double Quote）</li> <li> <code> \\ unnnn </code>（unicode字符）</li> <li> <li> <code> \\ u {nnnnnn} </code>（Unicode Code Point ）</li> </ul>";
        this.infoURL = "https://wikipedia.org/wiki/Escape_sequence";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "Escape level",
                "type": "option",
                "value": ["Special chars", "Everything", "Minimal"]
            },
            {
                "name": "Escape quote",
                "type": "option",
                "value": ["Single", "Double", "Backtick"]
            },
            {
                "name": "JSON compatible",
                "type": "boolean",
                "value": false
            },
            {
                "name": "ES6 compatible",
                "type": "boolean",
                "value": true
            },
            {
                "name": "Uppercase hex",
                "type": "boolean",
                "value": false
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     *
     * @example
     * EscapeString.run("Don't do that", [])
     * > "Don\'t do that"
     * EscapeString.run(`Hello
     * World`, [])
     * > "Hello\nWorld"
     */
    run(input, args) {
        const level = args[0],
            quotes = args[1],
            jsonCompat = args[2],
            es6Compat = args[3],
            lowercaseHex = !args[4];

        return jsesc(input, {
            quotes: quotes.toLowerCase(),
            es6: es6Compat,
            escapeEverything: level === "Everything",
            minimal: level === "Minimal",
            json: jsonCompat,
            lowercaseHex: lowercaseHex,
        });
    }

}

export default EscapeString;
