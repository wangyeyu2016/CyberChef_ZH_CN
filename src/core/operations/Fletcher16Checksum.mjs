/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";

/**
 * Fletcher-16 Checksum operation
 */
class Fletcher16Checksum extends Operation {

    /**
     * Fletcher16Checksum constructor
     */
    constructor() {
        super();

        this.name = "Fletcher-16 Checksum";
        this.module = "Crypto";
        this.description = "Fletcher校验和是一种用于计算约翰·古尔德·弗莱彻（John Gould Fletcher）在劳伦斯·利弗莫尔（Lawrence Livermore）实验室设计的依赖位置的校验和循环冗余检查，但与求和技术相关的计算工作较低。";
        this.infoURL = "https://wikipedia.org/wiki/Fletcher%27s_checksum#Fletcher-16";
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
        let a = 0,
            b = 0;
        input = new Uint8Array(input);

        for (let i = 0; i < input.length; i++) {
            a = (a + input[i]) % 0xff;
            b = (b + a) % 0xff;
        }

        return Utils.hex(((b << 8) | a) >>> 0, 4);
    }

}

export default Fletcher16Checksum;
