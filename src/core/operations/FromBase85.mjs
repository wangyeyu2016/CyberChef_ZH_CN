/**
 * @author PenguinGeorge [george@penguingeorge.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import Utils from "../Utils.mjs";
import {alphabetName, ALPHABET_OPTIONS} from "../lib/Base85.mjs";

/**
 * From Base85 operation
 */
class FromBase85 extends Operation {

    /**
     * From Base85 constructor
     */
    constructor() {
        super();

        this.name = "From Base85";
        this.module = "Default";
        this.description = "base85（也称为ASCII85）是编码任意字节数据的符号。通常比base64更有效。<br> <br>此操作从ASCII字符串中解码数据（带有您选择的字母，包括预设，包括预设）。 br> <br>例如<code> bou！rd] j7bebo7 </code>变为<code> hello world </code> <br> base85 base85通常用于Adobe的PostScript和PDF文件格式。";
        this.infoURL = "https://wikipedia.org/wiki/Ascii85";
        this.inputType = "string";
        this.outputType = "byteArray";
        this.args = [
            {
                name: "Alphabet",
                type: "editableOption",
                value: ALPHABET_OPTIONS
            },
            {
                name: "Remove non-alphabet chars",
                type: "boolean",
                value: true
            },
        ];
        this.checks = [
            {
                pattern:
                    "^\\s*(?:<~)?" + // Optional whitespace and starting marker
                    "[\\s!-uz]*" +   // Any amount of base85 characters and whitespace
                    "[!-uz]{15}" +   // At least 15 continoues base85 characters without whitespace
                    "[\\s!-uz]*" +   // Any amount of base85 characters and whitespace
                    "(?:~>)?\\s*$",  // Optional ending marker and whitespace
                args: ["!-u"],
            },
            {
                pattern:
                    "^" +
                    "[\\s0-9a-zA-Z.\\-:+=^!/*?&<>()[\\]{}@%$#]*" +
                    "[0-9a-zA-Z.\\-:+=^!/*?&<>()[\\]{}@%$#]{15}" + // At least 15 continoues base85 characters without whitespace
                    "[\\s0-9a-zA-Z.\\-:+=^!/*?&<>()[\\]{}@%$#]*" +
                    "$",
                args: ["0-9a-zA-Z.\\-:+=^!/*?&<>()[]{}@%$#"],
            },
            {
                pattern:
                    "^" +
                    "[\\s0-9A-Za-z!#$%&()*+\\-;<=>?@^_`{|}~]*" +
                    "[0-9A-Za-z!#$%&()*+\\-;<=>?@^_`{|}~]{15}" + // At least 15 continoues base85 characters without whitespace
                    "[\\s0-9A-Za-z!#$%&()*+\\-;<=>?@^_`{|}~]*" +
                    "$",
                args: ["0-9A-Za-z!#$%&()*+\\-;<=>?@^_`{|}~"],
            },
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {byteArray}
     */
    run(input, args) {
        const alphabet = Utils.expandAlphRange(args[0]).join(""),
            encoding = alphabetName(alphabet),
            removeNonAlphChars = args[1],
            result = [];

        if (alphabet.length !== 85 ||
            [].unique.call(alphabet).length !== 85) {
            throw new OperationError("Alphabet must be of length 85");
        }

        // Remove delimiters if present
        const matches = input.match(/^<~(.+?)~>$/);
        if (matches !== null) input = matches[1];

        // Remove non-alphabet characters
        if (removeNonAlphChars) {
            const re = new RegExp("[^" + alphabet.replace(/[[\]\\\-^$]/g, "\\$&") + "]", "g");
            input = input.replace(re, "");
        }

        if (input.length === 0) return [];

        let i = 0;
        let block, blockBytes;
        while (i < input.length) {
            if (encoding === "Standard" && input[i] === "z") {
                result.push(0, 0, 0, 0);
                i++;
            } else {
                let digits = [];
                digits = input
                    .substr(i, 5)
                    .split("")
                    .map((chr, idx) => {
                        const digit = alphabet.indexOf(chr);
                        if (digit < 0 || digit > 84) {
                            throw `Invalid character '${chr}' at index ${i + idx}`;
                        }
                        return digit;
                    });

                block =
                    digits[0] * 52200625 +
                    digits[1] * 614125 +
                    (i + 2 < input.length ? digits[2] : 84) * 7225 +
                    (i + 3 < input.length ? digits[3] : 84) * 85 +
                    (i + 4 < input.length ? digits[4] : 84);

                blockBytes = [
                    (block >> 24) & 0xff,
                    (block >> 16) & 0xff,
                    (block >> 8) & 0xff,
                    block & 0xff
                ];

                if (input.length < i + 5) {
                    blockBytes.splice(input.length - (i + 5), 5);
                }

                result.push.apply(result, blockBytes);
                i += 5;
            }
        }

        return result;
    }

}

export default FromBase85;
