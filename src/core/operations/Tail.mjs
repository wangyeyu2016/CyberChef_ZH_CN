/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import {INPUT_DELIM_OPTIONS} from "../lib/Delim.mjs";

/**
 * Tail operation
 */
class Tail extends Operation {

    /**
     * Tail constructor
     */
    constructor() {
        super();

        this.name = "Tail";
        this.module = "Default";
        this.description = "像Unix Tail Utility一样。<br>获得最后的n行。<br>您可以通过输入n的负值来选择所有行n之后的所有行。<br>可以更改定界符，以便以为，而不是行，而不是行，字段（即）选择。";
        this.infoURL = "https://wikipedia.org/wiki/Tail_(Unix)";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "Delimiter",
                "type": "option",
                "value": INPUT_DELIM_OPTIONS
            },
            {
                "name": "Number",
                "type": "number",
                "value": 10
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        let delimiter = args[0];
        const number = args[1];

        delimiter = Utils.charRep(delimiter);
        const splitInput = input.split(delimiter);

        return splitInput
            .filter((line, lineIndex) => {
                lineIndex += 1;

                if (number < 0) {
                    return lineIndex > -number;
                } else {
                    return lineIndex > splitInput.length - number;
                }
            })
            .join(delimiter);

    }

}

export default Tail;
