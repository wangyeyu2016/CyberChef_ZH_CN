/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import GostDigest from "../vendor/gost/gostDigest.mjs";
import {toHexFast} from "../lib/Hex.mjs";

/**
 * GOST hash operation
 */
class GOSTHash extends Operation {

    /**
     * GOSTHash constructor
     */
    constructor() {
        super();

        this.name = "GOST hash";
        this.module = "Hashing";
        this.description = "GOST哈希功能，标准中定义的GOST R 34.11-94和GOST 34.311-95是256位加密哈希功能。它最初是在俄罗斯国家标准GOST r 34.11-94 <i>信息技术中定义的 - 密码技术 - 加密信息安全性 - 哈希函数</i>。顺式其他成员群使用的等效标准是GOST 34.311-95。<br> <br> <br>不得将此函数与其他的streebog hash函数混淆，该功能在此中定义标准GOST R 34.11-2012的新修订。<br> <br> GOST哈希函数基于GOST块密码。";
        this.infoURL = "https://wikipedia.org/wiki/GOST_(hash_function)";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                "name": "S-Box",
                "type": "option",
                "value": [
                    "D-A",
                    "D-SC",
                    "E-TEST",
                    "E-A",
                    "E-B",
                    "E-C",
                    "E-D",
                    "E-SC",
                    "E-Z",
                    "D-TEST"
                ]
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        try {
            const sBox = args[1];
            const gostDigest = new GostDigest({
                name: "GOST R 34.11",
                version: 1994,
                sBox: sBox
            });

            return toHexFast(gostDigest.digest(input));
        } catch (err) {
            throw new OperationError(err);
        }
    }

}

export default GOSTHash;
