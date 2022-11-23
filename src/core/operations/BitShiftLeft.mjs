/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";

/**
 * Bit shift left operation
 */
class BitShiftLeft extends Operation {

    /**
     * BitShiftLeft constructor
     */
    constructor() {
        super();

        this.name = "Bit shift left";
        this.module = "Default";
        this.description = "将每个字节中的位移向左侧的左侧，并通过指定的金额向左移动。";
        this.infoURL = "https://wikipedia.org/wiki/Bitwise_operation#Bit_shifts";
        this.inputType = "ArrayBuffer";
        this.outputType = "ArrayBuffer";
        this.args = [
            {
                "name": "Amount",
                "type": "number",
                "value": 1
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {ArrayBuffer}
     */
    run(input, args) {
        const amount = args[0];
        input = new Uint8Array(input);

        return input.map(b => {
            return (b << amount) & 0xff;
        }).buffer;
    }

    /**
     * Highlight Bit shift left
     *
     * @param {Object[]} pos
     * @param {number} pos[].start
     * @param {number} pos[].end
     * @param {Object[]} args
     * @returns {Object[]} pos
     */
    highlight(pos, args) {
        return pos;
    }

    /**
     * Highlight Bit shift left in reverse
     *
     * @param {Object[]} pos
     * @param {number} pos[].start
     * @param {number} pos[].end
     * @param {Object[]} args
     * @returns {Object[]} pos
     */
    highlightReverse(pos, args) {
        return pos;
    }

}

export default BitShiftLeft;
