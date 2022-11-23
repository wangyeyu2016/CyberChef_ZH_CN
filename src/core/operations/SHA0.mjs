/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import {runHash} from "../lib/Hash.mjs";

/**
 * SHA0 operation
 */
class SHA0 extends Operation {

    /**
     * SHA0 constructor
     */
    constructor() {
        super();

        this.name = "SHA0";
        this.module = "Crypto";
        this.description = "SHA-0是一个inonyny，适用于1993年发布的160位哈希功能的原始版本，名称为“ sha”。由于未公开的“重大缺陷”，在出版后不久就撤回-1。默认情况下，消息消化算法由80发子弹组成。";
        this.infoURL = "https://wikipedia.org/wiki/SHA-1#SHA-0";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                name: "Rounds",
                type: "number",
                value: 80,
                min: 16
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        return runHash("sha0", input, {rounds: args[0]});
    }

}

export default SHA0;
