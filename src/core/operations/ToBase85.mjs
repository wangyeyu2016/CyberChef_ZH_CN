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
 * To Base85 operation
 */
class ToBase85 extends Operation {

    /**
     * To Base85 constructor
     */
    constructor() {
        super();

        this.name = "To Base85";
        this.module = "Default";
        this.description = "base85（也称为ASCII85）是编码任意字节数据的符号。通常比base64更有效。<br> <br>此操作在ASCII字符串中编码数据（带有您选择的字母，包括预设，包括预设）。 br> <br>例如，<code> hello world </code>变为<code> bou！rd] br> <strong>选项</strong> <br> <u> alphabet </u> <ul> <li>标准 - 标准字母，称为ascii85 </li> <li> z85（zeromq） -  a base85的字符串安全版本，避免引用标记和背斜线字符</li> <li> ipv6- base85的变体，适用于编码IPv6地址（RFC 1924）</li> </ul> <ul>包括定界线</li> </ul> <u> /u> <br>在数据的开始和结束时添加了'<〜'和'〜>'定界符。这是Adobe实现base85的标准。";
        this.infoURL = "https://wikipedia.org/wiki/Ascii85";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                name: "Alphabet",
                type: "editableOption",
                value: ALPHABET_OPTIONS
            },
            {
                name: "Include delimeter",
                type: "boolean",
                value: false
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
    */
    run(input, args) {
        input = new Uint8Array(input);
        const alphabet = Utils.expandAlphRange(args[0]).join(""),
            encoding = alphabetName(alphabet),
            includeDelim = args[1];
        let result = "";

        if (alphabet.length !== 85 ||
            [].unique.call(alphabet).length !== 85) {
            throw new OperationError("Error: Alphabet must be of length 85");
        }

        if (input.length === 0) return "";

        let block;
        for (let i = 0; i < input.length; i += 4) {
            block = (
                ((input[i])          << 24) +
                ((input[i + 1] || 0) << 16) +
                ((input[i + 2] || 0) << 8)  +
                ((input[i + 3] || 0))
            ) >>> 0;

            if (encoding !== "Standard" || block > 0) {
                let digits = [];
                for (let j = 0; j < 5; j++) {
                    digits.push(block % 85);
                    block = Math.floor(block / 85);
                }

                digits = digits.reverse();

                if (input.length < i + 4) {
                    digits.splice(input.length - (i + 4), 4);
                }

                result += digits.map(digit => alphabet[digit]).join("");
            } else {
                result += (encoding === "Standard") ? "z" : null;
            }
        }

        return includeDelim ? `<~${result}~>` : result;
    }
}

export default ToBase85;
