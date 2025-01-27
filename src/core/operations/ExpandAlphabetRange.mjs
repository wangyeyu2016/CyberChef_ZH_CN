/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";

/**
 * Expand alphabet range operation
 */
class ExpandAlphabetRange extends Operation {

    /**
     * ExpandAlphabetRange constructor
     */
    constructor() {
        super();

        this.name = "Expand alphabet range";
        this.module = "Default";
        this.description = "将字母范围字符串扩展到该范围内的字符列表中。<br> <br> e.g. <code> a-z </code> sust <code> abcdefghijklmnopqrstuvwxyz </code>。";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "Delimiter",
                "type": "binaryString",
                "value": ""
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        return Utils.expandAlphRange(input).join(args[0]);
    }

}

export default ExpandAlphabetRange;
