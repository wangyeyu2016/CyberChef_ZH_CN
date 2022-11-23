/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";

/**
 * Escape Unicode Characters operation
 */
class EscapeUnicodeCharacters extends Operation {

    /**
     * EscapeUnicodeCharacters constructor
     */
    constructor() {
        super();

        this.name = "Escape Unicode Characters";
        this.module = "Default";
        this.description = "将字符转换为其Unicode escaped符号。<br> <br> <br>支持前缀：<ul> <li> <code> <code> \\ u </code> </code> </li> <li> <li> <code> <code> </code>％u </code > </li> <li> <code> u+</code> </li> </ul> </ul> e.g. <code>σου</code> sust <code> \\ u03c3 \\ u03bf \\ u03bf \\ u03c5 </code> </code>";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "Prefix",
                "type": "option",
                "value": ["\\u", "%u", "U+"]
            },
            {
                "name": "Encode all chars",
                "type": "boolean",
                "value": false
            },
            {
                "name": "Padding",
                "type": "number",
                "value": 4
            },
            {
                "name": "Uppercase hex",
                "type": "boolean",
                "value": true
            }
        ];
        this.checks = [
            {
                pattern: "\\\\u(?:[\\da-f]{4,6})",
                flags: "i",
                args: ["\\u"]
            },
            {
                pattern: "%u(?:[\\da-f]{4,6})",
                flags: "i",
                args: ["%u"]
            },
            {
                pattern: "U\\+(?:[\\da-f]{4,6})",
                flags: "i",
                args: ["U+"]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const regexWhitelist = /[ -~]/i,
            [prefix, encodeAll, padding, uppercaseHex] = args;

        let output = "",
            character = "";

        for (let i = 0; i < input.length; i++) {
            character = input[i];
            if (!encodeAll && regexWhitelist.test(character)) {
                // It’s a printable ASCII character so don’t escape it.
                output += character;
                continue;
            }

            let cp = character.codePointAt(0).toString(16);
            if (uppercaseHex) cp = cp.toUpperCase();
            output += prefix + cp.padStart(padding, "0");
        }

        return output;
    }

}

export default EscapeUnicodeCharacters;
