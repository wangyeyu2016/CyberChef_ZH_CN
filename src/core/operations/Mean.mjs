/**
 * @author bwhitn [brian.m.whitney@outlook.com]
 * @author d98762625 [d98762625@gmail.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import { mean, createNumArray } from "../lib/Arithmetic.mjs";
import { ARITHMETIC_DELIM_OPTIONS } from "../lib/Delim.mjs";
import BigNumber from "bignumber.js";

/**
 * Mean operation
 */
class Mean extends Operation {

    /**
     * Mean constructor
     */
    constructor() {
        super();

        this.name = "Mean";
        this.module = "Default";
        this.description = "计算数字列表的平均值（平均）。如果字符串中的项目不是从列表中排除的数字。<br> <br> <br> e.g。<code> 0x0a 8 .5 .5 .5 .5 .5 </code> susth sust <代码> 4.75 </code>";
        this.infoURL = "https://wikipedia.org/wiki/Arithmetic_mean";
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
        const val = mean(createNumArray(input, args[0]));
        return BigNumber.isBigNumber(val) ? val : new BigNumber(NaN);
    }

}

export default Mean;
