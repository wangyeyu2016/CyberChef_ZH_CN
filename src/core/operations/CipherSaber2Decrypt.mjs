/**
 * @author n1073645 [n1073645@gmail.com]
 * @copyright Crown Copyright 2020
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import { encode } from "../lib/CipherSaber2.mjs";
import Utils from "../Utils.mjs";

/**
 * CipherSaber2 Decrypt operation
 */
class CipherSaber2Decrypt extends Operation {

    /**
     * CipherSaber2Decrypt constructor
     */
    constructor() {
        super();

        this.name = "CipherSaber2 Decrypt";
        this.module = "Crypto";
        this.description = "Ciphersaber是基于RC4流密封器的简单对称加密协议。它对消息机密性提供了相当强烈的强大保护，但它的设计非常简单，以至于即使是新手程序员也可以记住算法并从头开始实现它。";
        this.infoURL = "https://wikipedia.org/wiki/CipherSaber";
        this.inputType = "ArrayBuffer";
        this.outputType = "ArrayBuffer";
        this.args = [
            {
                name: "Key",
                type: "toggleString",
                value: "",
                toggleValues: ["Hex", "UTF8", "Latin1", "Base64"]
            },
            {
                name: "Rounds",
                type: "number",
                value: 20
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {ArrayBuffer}
     */
    run(input, args) {
        input = new Uint8Array(input);
        const result = [],
            key = Utils.convertToByteArray(args[0].string, args[0].option),
            rounds = args[1];

        const tempIVP = input.slice(0, 10);
        input = input.slice(10);
        return new Uint8Array(result.concat(encode(tempIVP, key, rounds, input))).buffer;
    }

}

export default CipherSaber2Decrypt;
