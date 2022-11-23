/**
 * @author j433866 [j433866@gmail.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import { isImage } from "../lib/FileType.mjs";
import { parseQrCode } from "../lib/QRCode.mjs";

/**
 * Parse QR Code operation
 */
class ParseQRCode extends Operation {

    /**
     * ParseQRCode constructor
     */
    constructor() {
        super();

        this.name = "Parse QR Code";
        this.module = "Image";
        this.description = "读取图像文件，并尝试从图像中检测和读取快速响应（QR）代码。<br> <br> <u>归一化图像</u> <br>尝试在解析图像之前试图将图像归一化以改进检测QR码。";
        this.infoURL = "https://wikipedia.org/wiki/QR_code";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                "name": "Normalise image",
                "type": "boolean",
                "value": false
            }
        ];
        this.checks = [
            {
                "pattern": "^(?:\\xff\\xd8\\xff|\\x89\\x50\\x4e\\x47|\\x47\\x49\\x46|.{8}\\x57\\x45\\x42\\x50|\\x42\\x4d)",
                "flags": "",
                "args": [false],
                "useful": true
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    async run(input, args) {
        const [normalise] = args;

        if (!isImage(input)) {
            throw new OperationError("Invalid file type.");
        }
        return await parseQrCode(input, normalise);
    }

}

export default ParseQRCode;
