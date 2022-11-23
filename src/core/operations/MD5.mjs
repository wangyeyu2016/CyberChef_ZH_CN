/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import {runHash} from "../lib/Hash.mjs";

/**
 * MD5 operation
 */
class MD5 extends Operation {

    /**
     * MD5 constructor
     */
    constructor() {
        super();

        this.name = "MD5";
        this.module = "Crypto";
        this.description = "MD5（消息 - 数据5）是一种广泛使用的哈希函数。它不适用于依靠此属性的SSL/TLS证书或数字签名等应用程序。";
        this.infoURL = "https://wikipedia.org/wiki/MD5";
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
        return runHash("md5", input);
    }

}

export default MD5;
