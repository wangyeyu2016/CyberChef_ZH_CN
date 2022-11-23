/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import {runHash} from "../lib/Hash.mjs";

/**
 * RIPEMD operation
 */
class RIPEMD extends Operation {

    /**
     * RIPEMD constructor
     */
    constructor() {
        super();

        this.name = "RIPEMD";
        this.module = "Crypto";
        this.description = "RIPEMD（种族完整性原始人评估消息摘要）是一个密码学哈希功能的家族，比利时，汉斯·多伯丁（Hans Dobbertin），汉斯·多伯汀（Hans Dobbertin），antoon Bosselaers和Bart Preneel在Katholieke Leuven的Katholieke Resignitiit Leuven，并于1996年首次出版。<<<<1996年。 > <br> RIPEMD基于MD4中使用的设计原理，性能与更流行的SHA-1相似。<br> <br> <br>";
        this.infoURL = "https://wikipedia.org/wiki/RIPEMD";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                "name": "Size",
                "type": "option",
                "value": ["320", "256", "160", "128"]
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const size = args[0];
        return runHash("ripemd" + size, input);
    }

}

export default RIPEMD;
