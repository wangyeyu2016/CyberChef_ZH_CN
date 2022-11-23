/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import {runHash} from "../lib/Hash.mjs";

/**
 * SHA1 operation
 */
class SHA1 extends Operation {

    /**
     * SHA1 constructor
     */
    constructor() {
        super();

        this.name = "SHA1";
        this.module = "Crypto";
        this.description = "SHA（安全哈希算法）哈希功能是由NSA.SHA-1设计的，是现有的SHA HASH函数中最建立的，它用于多种安全应用程序和协议。随着发现或改进的新攻击，-1的碰撞阻力一直在减弱。默认情况下，消息消化算法是80发子弹。";
        this.infoURL = "https://wikipedia.org/wiki/SHA-1";
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
        return runHash("sha1", input, {rounds: args[0]});
    }

}

export default SHA1;
