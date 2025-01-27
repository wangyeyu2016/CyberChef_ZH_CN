/**
 * @author Jarmo van Lenthe [github.com/jarmovanlenthe]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import {DELIM_OPTIONS} from "../lib/Delim.mjs";

/**
 * A1Z26 Cipher Encode operation
 */
class A1Z26CipherEncode extends Operation {

    /**
     * A1Z26CipherEncode constructor
     */
    constructor() {
        super();

        this.name = "A1Z26 Cipher Encode";
        this.module = "Ciphers";
        this.description = "将字母字符转换为其相应的字母顺序编号。<br> <br> <br>例如<br> code>。<br> <br>删除了非字母字符。";
        this.infoURL = "";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                name: "Delimiter",
                type: "option",
                value: DELIM_OPTIONS
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const delim = Utils.charRep(args[0] || "Space");
        let output = "";

        const sanitizedinput = input.toLowerCase(),
            charcode = Utils.strToCharcode(sanitizedinput);

        for (let i = 0; i < charcode.length; i++) {
            const ordinal = charcode[i] - 96;

            if (ordinal > 0 && ordinal <= 26) {
                output += ordinal.toString(10) + delim;
            }
        }
        return output.slice(0, -delim.length);
    }

}

export default A1Z26CipherEncode;
