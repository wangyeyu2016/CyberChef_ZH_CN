/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import {runHash} from "../lib/Hash.mjs";

/**
 * MD4 operation
 */
class MD4 extends Operation {

    /**
     * MD4 constructor
     */
    constructor() {
        super();

        this.name = "MD4";
        this.module = "Crypto";
        this.description = "MD4（消息 - 数据4）算法是Ronald Rivest在1990年开发的加密哈希功能。消化长长度为128位。该算法影响了后来的设计，例如MD5，SHA-1和RIPEMD算法。<br>。<br> <br> <br> <br> <br> <br> <br> MD4的安全性已严重损害。";
        this.infoURL = "https://wikipedia.org/wiki/MD4";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        return runHash("md4", input);
    }

}

export default MD4;
