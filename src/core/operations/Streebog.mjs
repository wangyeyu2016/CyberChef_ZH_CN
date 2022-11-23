/**
 * @author mshwed [m@ttshwed.com]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import GostDigest from "../vendor/gost/gostDigest.mjs";
import {toHexFast} from "../lib/Hex.mjs";

/**
 * Streebog operation
 */
class Streebog extends Operation {

    /**
     * Streebog constructor
     */
    constructor() {
        super();

        this.name = "Streebog";
        this.module = "Hashing";
        this.description = "Streebog是俄罗斯国家标准GOST R 34.11-2012 <i>信息技术\\ U2013加密信息安全性\\ U2013 Hash函数</i>。它的创建是为了替换过时的GOST HASH函数而创建的标准GOST R 34.11-94，作为美国国家标准技术学院对SHA-3竞赛的不对称答复。";
        this.infoURL = "https://wikipedia.org/wiki/Streebog";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                "name": "Size",
                "type": "option",
                "value": ["256", "512"]
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
            const length = parseInt(args[0], 10);
            const gostDigest = new GostDigest({
                name: "GOST R 34.11",
                version: 2012,
                length: length
            });

            return toHexFast(gostDigest.digest(input));
        } catch (err) {
            throw new OperationError(err);
        }
    }

}

export default Streebog;
