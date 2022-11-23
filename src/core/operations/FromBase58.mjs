/**
 * @author tlwr [toby@toby.codes]
 * @copyright Crown Copyright 2017
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import OperationError from "../errors/OperationError.mjs";
import {ALPHABET_OPTIONS} from "../lib/Base58.mjs";

/**
 * From Base58 operation
 */
class FromBase58 extends Operation {

    /**
     * FromBase58 constructor
     */
    constructor() {
        super();

        this.name = "From Base58";
        this.module = "Default";
        this.description = "base58（类似于base64）是编码任意字节数据的符号。它通过易于删除误读字符（即i，i，0和o）来提高人类可读性。<br> <br> <br>此操作解码数据从一个ASCII字符串（带有您选择的字母，包括预设）回到其原始形式中。<br> <br> <br> e.g. <code> stv1dl6cwtrykyv </code> </code>变成<code> hello world </code </code> <br> <br> <br>基本58通常用于加密货币（比特币，波纹等）。";
        this.infoURL = "https://wikipedia.org/wiki/Base58";
        this.inputType = "string";
        this.outputType = "byteArray";
        this.args = [
            {
                "name": "Alphabet",
                "type": "editableOption",
                "value": ALPHABET_OPTIONS
            },
            {
                "name": "Remove non-alphabet chars",
                "type": "boolean",
                "value": true
            }
        ];
        this.checks = [
            {
                pattern: "^[1-9A-HJ-NP-Za-km-z]{20,}$",
                flags: "",
                args: ["123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz", false]
            },
            {
                pattern: "^[1-9A-HJ-NP-Za-km-z]{20,}$",
                flags: "",
                args: ["rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz", false]
            },
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {byteArray}
     */
    run(input, args) {
        let alphabet = args[0] || ALPHABET_OPTIONS[0].value;
        const removeNonAlphaChars = args[1] === undefined ? true : args[1],
            result = [0];

        alphabet = Utils.expandAlphRange(alphabet).join("");

        if (alphabet.length !== 58 ||
            [].unique.call(alphabet).length !== 58) {
            throw new OperationError("Alphabet must be of length 58");
        }

        if (input.length === 0) return [];

        let zeroPrefix = 0;
        for (let i = 0; i < input.length && input[i] === alphabet[0]; i++) {
            zeroPrefix++;
        }

        [].forEach.call(input, function(c, charIndex) {
            const index = alphabet.indexOf(c);

            if (index === -1) {
                if (removeNonAlphaChars) {
                    return;
                } else {
                    throw new OperationError(`Char '${c}' at position ${charIndex} not in alphabet`);
                }
            }

            let carry = result[0] * 58 + index;
            result[0] = carry & 0xFF;
            carry = carry >> 8;

            for (let i = 1; i < result.length; i++) {
                carry += result[i] * 58;
                result[i] = carry & 0xFF;
                carry = carry >> 8;
            }

            while (carry > 0) {
                result.push(carry & 0xFF);
                carry = carry >> 8;
            }
        });

        while (zeroPrefix--) {
            result.push(0);
        }

        return result.reverse();
    }

}

export default FromBase58;
