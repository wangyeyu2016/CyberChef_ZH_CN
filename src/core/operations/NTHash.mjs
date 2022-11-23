/**
 * @author brun0ne [brunonblok@gmail.com]
 * @copyright Crown Copyright 2022
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";

import cptable from "codepage";
import {runHash} from "../lib/Hash.mjs";

/**
 * NT Hash operation
 */
class NTHash extends Operation {

    /**
     * NTHash constructor
     */
    constructor() {
        super();

        this.name = "NT Hash";
        this.module = "Crypto";
        this.description = "NT哈希有时称为NTLM哈希，是一种在Windows系统上存储密码的方法。它通过在UTF-16LE编码输入上运行MD4来起作用。NTLMHashes被认为是弱的，因为它们可以很容易地使用现代化的现代化而易用。硬件。";
        this.infoURL = "https://wikipedia.org/wiki/NT_LAN_Manager";
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
        const format = 1200; // UTF-16LE
        const encoded = cptable.utils.encode(format, input);
        const hashed = runHash("md4", encoded);

        return hashed.toUpperCase();
    }
}

export default NTHash;
