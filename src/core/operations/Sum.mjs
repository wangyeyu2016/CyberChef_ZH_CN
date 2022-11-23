/**
 * @author bwhitn [brian.m.whitney@outlook.com]
 * @author d98762625 [d98762625@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import BigNumber from "bignumber.js";
import Operation from "../Operation.mjs";
import { sum, createNumArray } from "../lib/Arithmetic.mjs";
import { ARITHMETIC_DELIM_OPTIONS } from "../lib/Delim.mjs";


/**
 * Sum operation
 */
class Sum extends Operation {

    /**
     * Sum constructor
     */
    constructor() {
        super();

        this.name = "Sum";
        this.module = "Default";
        this.description = "添加一个数字列表。如果字符串中的一个项目不是从列表中排除的数字。<br> <br> <br> e.g. <code> 0x0a 8 .5 .5 </code> susth sust <code> 18.5 </code </code >";
        this.infoURL = "https://wikipedia.org/wiki/Summation";
        this.inputType = "string";
        this.outputType = "BigNumber";
        this.args = [
            {
                "name": "Delimiter",
                "type": "option",
                "value": ARITHMETIC_DELIM_OPTIONS,
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {BigNumber}
     */
    run(input, args) {
        const val = sum(createNumArray(input, args[0]));
        return BigNumber.isBigNumber(val) ? val : new BigNumber(NaN);
    }

}

export default Sum;
