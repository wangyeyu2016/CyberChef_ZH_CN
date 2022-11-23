/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import {runHash} from "../lib/Hash.mjs";

/**
 * Snefru operation
 */
class Snefru extends Operation {

    /**
     * Snefru constructor
     */
    constructor() {
        super();

        this.name = "Snefru";
        this.module = "Crypto";
        this.description = "Snefru是Ralph Merkle在1990年在Xerox Parc工作时发明的一个加密哈希功能。该功能支持128位和256位输出。IT以埃及法老Sneferu的名字命名，延续了Khufu和Khafre Block Ciphers的传统。 <br> <br> Snefru的原始设计被Eli Biham和Adi Shamir证明是不安全的，他们能够使用差分密码分析来查找哈希碰撞。然后，通过增加设计的设计，通过增加主要迭代次数的修改。算法从两个到八。";
        this.infoURL = "https://wikipedia.org/wiki/Snefru";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                name: "Size",
                type: "number",
                value: 128,
                min: 32,
                max: 480,
                step: 32
            },
            {
                name: "Rounds",
                type: "option",
                value: ["8", "4", "2"]
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        return runHash("snefru", input, {
            length: args[0],
            rounds: args[1]
        });
    }

}

export default Snefru;
