/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import {runHash} from "../lib/Hash.mjs";

/**
 * HAS-160 operation
 */
class HAS160 extends Operation {

    /**
     * HAS-160 constructor
     */
    constructor() {
        super();

        this.name = "HAS-160";
        this.module = "Crypto";
        this.description = "HAS-160是一种加密哈希功能，旨在与韩国KCDSA数字签名AlgorithM一起使用，它来自SHA-1，其各种更改旨在提高其安全性。它产生了160位的输出。<br> <br> <br> <br> HAS-160的使用方式与SHA-1相同。首先，它将输入分别为512位的块，并填充最终块。A Digest函数依次通过处理输入块来更新中间哈希值。<br> <br> <<br> <<br> < BR>消息Digest算法默认为80发。";
        this.infoURL = "https://wikipedia.org/wiki/HAS-160";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                name: "Rounds",
                type: "number",
                value: 80,
                min: 1,
                max: 80
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        return runHash("has160", input, {rounds: args[0]});
    }

}

export default HAS160;
