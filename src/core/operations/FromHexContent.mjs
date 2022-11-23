/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import {fromHex} from "../lib/Hex.mjs";

/**
 * From Hex Content operation
 */
class FromHexContent extends Operation {

    /**
     * FromHexContent constructor
     */
    constructor() {
        super();

        this.name = "From Hex Content";
        this.module = "Default";
        this.description = "翻译文本中的十六进制字节回到原始字节。这种格式被Snort用于ASCII文本中的十六进制。<br> <br> <br> <br> e.g. <code> foo | 3d | 3d | bar </code> bar </code> for <code> foo = foo = bar <bar <bar <bar < /代码>。";
        this.infoURL = "http://manual-snort-org.s3-website-us-east-1.amazonaws.com/node32.html#SECTION00451000000000000000";
        this.inputType = "string";
        this.outputType = "byteArray";
        this.args = [];
        this.checks = [
            {
                pattern:  "\\|([\\da-f]{2} ?)+\\|",
                flags:  "i",
                args:   []
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {byteArray}
     */
    run(input, args) {
        const regex = /\|([a-f\d ]{2,})\|/gi,
            output = [];
        let m, i = 0;
        while ((m = regex.exec(input))) {
            // Add up to match
            for (; i < m.index;)
                output.push(Utils.ord(input[i++]));

            // Add match
            const bytes = fromHex(m[1]);
            if (bytes) {
                for (let a = 0; a < bytes.length;)
                    output.push(bytes[a++]);
            } else {
                // Not valid hex, print as normal
                for (; i < regex.lastIndex;)
                    output.push(Utils.ord(input[i++]));
            }

            i = regex.lastIndex;
        }
        // Add all after final match
        for (; i < input.length;)
            output.push(Utils.ord(input[i++]));

        return output;
    }

}

export default FromHexContent;
