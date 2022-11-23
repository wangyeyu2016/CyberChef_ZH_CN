/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import punycode from "punycode";

/**
 * From Punycode operation
 */
class FromPunycode extends Operation {

    /**
     * FromPunycode constructor
     */
    constructor() {
        super();

        this.name = "From Punycode";
        this.module = "Encodings";
        this.description = "punyCode是一种用域名系统支持的ASCII的有限字符子集表示Unicode的方法。<br> <br> <br> e.g。<code> mnchen-3ya </code>解码到<code> m \\ Xfcnchen </code>";
        this.infoURL = "https://wikipedia.org/wiki/Punycode";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "Internationalised domain name",
                "type": "boolean",
                "value": false
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const idn = args[0];

        if (idn) {
            return punycode.toUnicode(input);
        } else {
            return punycode.decode(input);
        }
    }

}

export default FromPunycode;
