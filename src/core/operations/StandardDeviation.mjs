/**
 * @author bwhitn [brian.m.whitney@outlook.com]
 * @author d98762625 [d98762625@gmail.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */

import BigNumber from "bignumber.js";
import Operation from "../Operation.mjs";
import { stdDev, createNumArray } from "../lib/Arithmetic.mjs";
import { ARITHMETIC_DELIM_OPTIONS } from "../lib/Delim.mjs";


/**
 * Standard Deviation operation
 */
class StandardDeviation extends Operation {

    /**
     * StandardDeviation constructor
     */
    constructor() {
        super();

        this.name = "Standard Deviation";
        this.module = "Default";
        this.description = "计算数字列表的标准偏差。如果字符串中的一个项目不是数字从列表中排除。<br> <br> <br> e.g。<code> 0x0a 8 .5 </code> ste </code>变为<code> 4.089281382128433 <</code> /代码>";
        this.infoURL = "https://wikipedia.org/wiki/Standard_deviation";
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
        const val = stdDev(createNumArray(input, args[0]));
        return BigNumber.isBigNumber(val) ? val : new BigNumber(NaN);

    }

}

export default StandardDeviation;
