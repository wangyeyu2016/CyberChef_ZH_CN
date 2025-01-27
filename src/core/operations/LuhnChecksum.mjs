/**
 * @author n1073645 [n1073645@gmail.com]
 * @copyright Crown Copyright 2020
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";

/**
 * Luhn Checksum operation
 */
class LuhnChecksum extends Operation {

    /**
     * LuhnChecksum constructor
     */
    constructor() {
        super();

        this.name = "Luhn Checksum";
        this.module = "Default";
        this.description = "Luhn算法，也称为模量10或Mod 10算法，是一种简单的校验和公式，用于验证各种识别码，例如信用卡号，IMEI编号和加拿大社会保险号码。";
        this.infoURL = "https://wikipedia.org/wiki/Luhn_algorithm";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [];
    }

    /**
     * Generates the Luhn Checksum from the input.
     *
     * @param {string} inputStr
     * @returns {number}
     */
    checksum(inputStr) {
        let even = false;
        return inputStr.split("").reverse().reduce((acc, elem) => {
            // Convert element to integer.
            let temp = parseInt(elem, 10);

            // If element is not an integer.
            if (isNaN(temp))
                throw new OperationError("Character: " + elem + " is not a digit.");

            // If element is in an even position
            if (even) {
                // Double the element and add the quotient and remainder together.
                temp = 2 * elem;
                temp = Math.floor(temp/10) + (temp % 10);
            }

            even = !even;
            return acc + temp;
        }, 0)  % 10;
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        if (!input) return "";

        const checkSum = this.checksum(input);
        let checkDigit = this.checksum(input + "0");
        checkDigit = checkDigit === 0 ? 0 : (10-checkDigit);

        return `Checksum: ${checkSum}
Checkdigit: ${checkDigit}
Luhn Validated String: ${input + "" + checkDigit}`;
    }

}

export default LuhnChecksum;
