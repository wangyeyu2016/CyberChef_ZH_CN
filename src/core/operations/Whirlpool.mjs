/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import {runHash} from "../lib/Hash.mjs";

/**
 * Whirlpool operation
 */
class Whirlpool extends Operation {

    /**
     * Whirlpool constructor
     */
    constructor() {
        super();

        this.name = "Whirlpool";
        this.module = "Crypto";
        this.description = "惠而浦是Vincent Rijmen（AES的共同创建者）和Paulo S.L.M. M. M. Barreto设计的加密哈希函数，他在2000年首次描述了它。<br> <br>存在几种变体：<ul> <ul> <li> whirlpool-0是原始版本于2000年发布。</li> <li>惠而浦-T是2001年发布的第一个修订版，改善了S-box的一代。</li> <li>惠而浦是2003年发布的最新修订版，将缺陷固定在扩散矩阵中。</li> </ul>";
        this.infoURL = "https://wikipedia.org/wiki/Whirlpool_(cryptography)";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                name: "Variant",
                type: "option",
                value: ["Whirlpool", "Whirlpool-T", "Whirlpool-0"]
            },
            {
                name: "Rounds",
                type: "number",
                value: 10,
                min: 1,
                max: 10
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const variant = args[0].toLowerCase();
        return runHash(variant, input, {rounds: args[1]});
    }

}

export default Whirlpool;
