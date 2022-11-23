/**
 * @author Matt C [me@mitt.dev]
 * @copyright Crown Copyright 2022
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";

import { compress } from "@blu3r4y/lzma";
import {isWorkerEnvironment} from "../Utils.mjs";

/**
 * LZMA Compress operation
 */
class LZMACompress extends Operation {

    /**
     * LZMACompress constructor
     */
    constructor() {
        super();

        this.name = "LZMA Compress";
        this.module = "Compression";
        this.description = "使用lempel \\ u2013ziv \\ u2013markov链算法来压缩数据。PRESSION模式确定压缩的速度和有效性：1最快且效率较低，9是最慢，最有效的，最有效";
        this.infoURL = "https://wikipedia.org/wiki/Lempel%E2%80%93Ziv%E2%80%93Markov_chain_algorithm";
        this.inputType = "ArrayBuffer";
        this.outputType = "ArrayBuffer";
        this.args = [
            {
                name: "Compression Mode",
                type: "option",
                value: [
                    "1", "2", "3", "4", "5", "6", "7", "8", "9"
                ],
                "defaultIndex": 6
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {ArrayBuffer}
     */
    async run(input, args) {
        const mode = Number(args[0]);
        return new Promise((resolve, reject) => {
            compress(new Uint8Array(input), mode, (result, error) => {
                if (error) {
                    reject(new OperationError(`Failed to compress input: ${error.message}`));
                }
                // The compression returns as an Int8Array, but we can just get the unsigned data from the buffer
                resolve(new Int8Array(result).buffer);
            }, (percent) => {
                if (isWorkerEnvironment()) self.sendStatusMessage(`Compressing input: ${(percent*100).toFixed(2)}%`);
            });
        });
    }

}

export default LZMACompress;
