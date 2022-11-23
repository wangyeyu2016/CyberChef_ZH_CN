/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";

/**
 * Sleep operation
 */
class Sleep extends Operation {

    /**
     * Sleep constructor
     */
    constructor() {
        super();

        this.name = "Sleep";
        this.module = "Default";
        this.description = "睡眠使配方在继续执行之前等待指定数量的毫秒。";
        this.inputType = "ArrayBuffer";
        this.outputType = "ArrayBuffer";
        this.args = [
            {
                "name": "Time (ms)",
                "type": "number",
                "value": 1000
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {ArrayBuffer}
     */
    async run(input, args) {
        const ms = args[0];
        await new Promise(r => setTimeout(r, ms));
        return input;
    }

}

export default Sleep;
