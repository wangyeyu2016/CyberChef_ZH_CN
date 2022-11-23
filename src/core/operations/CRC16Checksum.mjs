/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import JSCRC from "js-crc";

/**
 * CRC-16 Checksum operation
 */
class CRC16Checksum extends Operation {

    /**
     * CRC16Checksum constructor
     */
    constructor() {
        super();

        this.name = "CRC-16 Checksum";
        this.module = "Crypto";
        this.description = "循环冗余检查（CRC）是数字网络和存储设备中常用的错误检测代码，以检测到原始数据的意外更改。<br> <br> CRC是W.Wesley Peterson在1961年发明的。";
        this.infoURL = "https://wikipedia.org/wiki/Cyclic_redundancy_check";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        return JSCRC.crc16(input);
    }

}

export default CRC16Checksum;
