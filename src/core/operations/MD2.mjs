/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import {runHash} from "../lib/Hash.mjs";

/**
 * MD2 operation
 */
class MD2 extends Operation {

    /**
     * MD2 constructor
     */
    constructor() {
        super();

        this.name = "MD2";
        this.module = "Crypto";
        this.description = "MD2（消息 - 数据2）算法是Ronald Rivest于1989年开发的加密哈希函数。该算法是针对8位计算机优化的。<br> <br> <br>尽管即使MD2也不再被认为是安全的，即使截至2014年，MD2也被认为是安全的。它仍在公共密钥基础架构中用作MD2和RSA生成的证书的一部分。默认情况下，消息Digest算法是18发。";
        this.infoURL = "https://wikipedia.org/wiki/MD2_(cryptography)";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                name: "Rounds",
                type: "number",
                value: 18,
                min: 0
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        return runHash("md2", input, {rounds: args[0]});
    }

}

export default MD2;
