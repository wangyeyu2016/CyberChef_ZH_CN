/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2022
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import {smbhash} from "ntlm";

/**
 * LM Hash operation
 */
class LMHash extends Operation {

    /**
     * LMHash constructor
     */
    constructor() {
        super();

        this.name = "LM Hash";
        this.module = "Crypto";
        this.description = "LM哈希（LM Hash）或LAN Manager哈希（Hash）是在旧的Microsoft操作系统上存储密码的一种弃用方式。它特别弱，可以使用Rainbow Tables在现代硬件上以几秒钟的方式进行破解。";
        this.infoURL = "https://wikipedia.org/wiki/LAN_Manager#Password_hashing_algorithm";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        return smbhash.lmhash(input);
    }

}

export default LMHash;
