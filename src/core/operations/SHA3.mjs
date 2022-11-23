/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import JSSHA3 from "js-sha3";
import OperationError from "../errors/OperationError.mjs";

/**
 * SHA3 operation
 */
class SHA3 extends Operation {

    /**
     * SHA3 constructor
     */
    constructor() {
        super();

        this.name = "SHA3";
        this.module = "Crypto";
        this.description = "NIST于2015年8月5日发布了SHA-3（安全哈希算法3）哈希功能。尽管同一系列标准的一部分，SHA-3与SHA-1和SHA的MD5式结构有很大不同-2。<br> <br> SHA-3是Guido Bertoni，Joan Daemen，Micha \\ Xebl Peeters和Gilles van Assche设计的较广泛的加密原始家族Keccak的子集，并在Radiogat \\ Xfan上建造。";
        this.infoURL = "https://wikipedia.org/wiki/SHA-3";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                "name": "Size",
                "type": "option",
                "value": ["512", "384", "256", "224"]
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const size = parseInt(args[0], 10);
        let algo;

        switch (size) {
            case 224:
                algo = JSSHA3.sha3_224;
                break;
            case 384:
                algo = JSSHA3.sha3_384;
                break;
            case 256:
                algo = JSSHA3.sha3_256;
                break;
            case 512:
                algo = JSSHA3.sha3_512;
                break;
            default:
                throw new OperationError("Invalid size");
        }

        return algo(input);
    }

}

export default SHA3;
