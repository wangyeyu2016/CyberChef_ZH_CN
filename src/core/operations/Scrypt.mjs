/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import OperationError from "../errors/OperationError.mjs";
import scryptsy from "scryptsy";
import { isWorkerEnvironment } from "../Utils.mjs";

/**
 * Scrypt operation
 */
class Scrypt extends Operation {

    /**
     * Scrypt constructor
     */
    constructor() {
        super();

        this.name = "Scrypt";
        this.module = "Crypto";
        this.description = "SCRYPT是由Colin Percival创建的基于密码的密钥推导功能（PBKDF）。该算法是专门设计的，是为了使大规模的自定义硬件攻击通过需要大量内存来使其成本高昂。在2016年，Scrypt算法由Scrypt AlgorithM发布。 IETF作为RFC7914。<br> <br>在输入中输入密码以生成其哈希。";
        this.infoURL = "https://wikipedia.org/wiki/Scrypt";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "Salt",
                "type": "toggleString",
                "value": "",
                "toggleValues": ["Hex", "Base64", "UTF8", "Latin1"]
            },
            {
                "name": "Iterations (N)",
                "type": "number",
                "value": 16384
            },
            {
                "name": "Memory factor (r)",
                "type": "number",
                "value": 8
            },
            {
                "name": "Parallelization factor (p)",
                "type": "number",
                "value": 1
            },
            {
                "name": "Key length",
                "type": "number",
                "value": 64
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const salt = Buffer.from(Utils.convertToByteArray(args[0].string || "", args[0].option)),
            iterations = args[1],
            memFactor = args[2],
            parallelFactor = args[3],
            keyLength = args[4];

        try {
            const data = scryptsy(
                input, salt, iterations, memFactor, parallelFactor, keyLength,
                p => {
                    // Progress callback
                    if (isWorkerEnvironment())
                        self.sendStatusMessage(`Progress: ${p.percent.toFixed(0)}%`);
                }
            );

            return data.toString("hex");
        } catch (err) {
            throw new OperationError("Error: " + err.toString());
        }
    }

}

export default Scrypt;
