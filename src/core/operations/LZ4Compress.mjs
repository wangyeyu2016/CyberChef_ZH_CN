/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2022
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import lz4 from "lz4js";

/**
 * LZ4 Compress operation
 */
class LZ4Compress extends Operation {

    /**
     * LZ4Compress constructor
     */
    constructor() {
        super();

        this.name = "LZ4 Compress";
        this.module = "Compression";
        this.description = "LZ4是一种无损数据压缩算法，专注于压缩速度和减压速度。";
        this.infoURL = "https://wikipedia.org/wiki/LZ4_(compression_algorithm)";
        this.inputType = "ArrayBuffer";
        this.outputType = "ArrayBuffer";
        this.args = [];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {ArrayBuffer}
     */
    run(input, args) {
        const inBuf = new Uint8Array(input);
        const compressed = lz4.compress(inBuf);
        return compressed.buffer;
    }

}

export default LZ4Compress;
