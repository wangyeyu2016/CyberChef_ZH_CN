/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import { bitOp, xor, BITWISE_OP_DELIMS } from "../lib/BitwiseOp.mjs";

/**
 * XOR operation
 */
class XOR extends Operation {

    /**
     * XOR constructor
     */
    constructor() {
        super();

        this.name = "XOR";
        this.module = "Default";
        this.description = "XOR带有给定键的输入。<br> e.g。<code> fe023da5 </code> <br> <br> <br> <strong> <strong> options </strong> <br> <br> <u> <u> <u> <u> null保留：</u>如果当前字节为0x00或与键相同，跳过它。<br> <br> <u>方案：</u> <ul> <ul> <li>标准 - 键在每轮后不变</li> <li>输入差分 - 密钥设置为先前未经处理的字节的值</li> <li>输出差异 - 键设置为先前处理的字节的值</li> <li> cascade -键设置为输入字节移动一个</li> </ul>";
        this.infoURL = "https://wikipedia.org/wiki/XOR";
        this.inputType = "ArrayBuffer";
        this.outputType = "byteArray";
        this.args = [
            {
                "name": "Key",
                "type": "toggleString",
                "value": "",
                "toggleValues": BITWISE_OP_DELIMS
            },
            {
                "name": "Scheme",
                "type": "option",
                "value": ["Standard", "Input differential", "Output differential", "Cascade"]
            },
            {
                "name": "Null preserving",
                "type": "boolean",
                "value": false
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {byteArray}
     */
    run(input, args) {
        input = new Uint8Array(input);
        const key = Utils.convertToByteArray(args[0].string || "", args[0].option),
            [, scheme, nullPreserving] = args;

        return bitOp(input, key, xor, nullPreserving, scheme);
    }

    /**
     * Highlight XOR
     *
     * @param {Object[]} pos
     * @param {number} pos[].start
     * @param {number} pos[].end
     * @param {Object[]} args
     * @returns {Object[]} pos
     */
    highlight(pos, args) {
        return pos;
    }

    /**
     * Highlight XOR in reverse
     *
     * @param {Object[]} pos
     * @param {number} pos[].start
     * @param {number} pos[].end
     * @param {Object[]} args
     * @returns {Object[]} pos
     */
    highlightReverse(pos, args) {
        return pos;
    }

}

export default XOR;
