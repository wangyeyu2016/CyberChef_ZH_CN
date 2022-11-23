/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import { bitOp, xor } from "../lib/BitwiseOp.mjs";
import { toHex } from "../lib/Hex.mjs";
import { isWorkerEnvironment } from "../Utils.mjs";

/**
 * XOR Brute Force operation
 */
class XORBruteForce extends Operation {

    /**
     * XORBruteForce constructor
     */
    constructor() {
        super();

        this.name = "XOR Brute Force";
        this.module = "Default";
        this.description = "列举所有可能的XOR解决方案。电流最大密钥长度为2，这是由于浏览器性能。<br> <br>（可选）输入您期望在授权中找到的字符串以过滤结果（CRIB）。";
        this.infoURL = "https://wikipedia.org/wiki/Exclusive_or";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                "name": "Key length",
                "type": "number",
                "value": 1
            },
            {
                "name": "Sample length",
                "type": "number",
                "value": 100
            },
            {
                "name": "Sample offset",
                "type": "number",
                "value": 0
            },
            {
                "name": "Scheme",
                "type": "option",
                "value": ["Standard", "Input differential", "Output differential"]
            },
            {
                "name": "Null preserving",
                "type": "boolean",
                "value": false
            },
            {
                "name": "Print key",
                "type": "boolean",
                "value": true
            },
            {
                "name": "Output as hex",
                "type": "boolean",
                "value": false
            },
            {
                "name": "Crib (known plaintext string)",
                "type": "binaryString",
                "value": ""
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        input = new Uint8Array(input);
        const [
                keyLength,
                sampleLength,
                sampleOffset,
                scheme,
                nullPreserving,
                printKey,
                outputHex,
                rawCrib
            ] = args,
            crib = rawCrib.toLowerCase(),
            output = [];
        let result,
            resultUtf8,
            record = "";

        input = input.slice(sampleOffset, sampleOffset + sampleLength);

        if (isWorkerEnvironment())
            self.sendStatusMessage("Calculating " + Math.pow(256, keyLength) + " values...");

        /**
         * Converts an integer to an array of bytes expressing that number.
         *
         * @param {number} int
         * @param {number} len - Length of the resulting array
         * @returns {array}
         */
        const intToByteArray = (int, len) => {
            const res = Array(len).fill(0);
            for (let i = len - 1; i >= 0; i--) {
                res[i] = int & 0xff;
                int = int >>> 8;
            }
            return res;
        };

        for (let key = 1, l = Math.pow(256, keyLength); key < l; key++) {
            if (key % 10000 === 0 && isWorkerEnvironment()) {
                self.sendStatusMessage("Calculating " + l + " values... " + Math.floor(key / l * 100) + "%");
            }

            result = bitOp(input, intToByteArray(key, keyLength), xor, nullPreserving, scheme);
            resultUtf8 = Utils.byteArrayToUtf8(result);
            record = "";

            if (crib && resultUtf8.toLowerCase().indexOf(crib) < 0) continue;
            if (printKey) record += "Key = " + Utils.hex(key, (2*keyLength)) + ": ";
            if (outputHex) {
                record += toHex(result);
            } else {
                record += Utils.printable(resultUtf8, false);
            }

            output.push(record);
        }

        return output.join("\n");
    }

}

export default XORBruteForce;
