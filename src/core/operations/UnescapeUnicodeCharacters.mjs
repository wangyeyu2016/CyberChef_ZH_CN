/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";

/**
 * Unescape Unicode Characters operation
 */
class UnescapeUnicodeCharacters extends Operation {

    /**
     * UnescapeUnicodeCharacters constructor
     */
    constructor() {
        super();

        this.name = "Unescape Unicode Characters";
        this.module = "Default";
        this.description = "将Unicode escaped字符符号转换回原始字符。<br> <br>支持前缀：<ul> <li> <code> <code> \\ u </code> </code> </li> <li> <li> <li> <code> <code>％u < /code> </li> <li> <code> u+</code> </li> </ul> e.g. <code> \\ u03c3 \\ u03bf \\ u03c5 </code>变成<code> ccode> ccout>σoten</代码>";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "Prefix",
                "type": "option",
                "value": ["\\u", "%u", "U+"]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const prefix = prefixToRegex[args[0]],
            regex = new RegExp(prefix+"([a-f\\d]{4})", "ig");
        let output = "",
            m,
            i = 0;

        while ((m = regex.exec(input))) {
            // Add up to match
            output += input.slice(i, m.index);

            // Add match
            output += Utils.chr(parseInt(m[1], 16));

            i = regex.lastIndex;
        }

        // Add all after final match
        output += input.slice(i, input.length);

        return output;
    }

}

/**
 * Lookup table to add prefixes to unicode delimiters so that they can be used in a regex.
 */
const prefixToRegex = {
    "\\u": "\\\\u",
    "%u": "%u",
    "U+": "U\\+"
};

export default UnescapeUnicodeCharacters;
