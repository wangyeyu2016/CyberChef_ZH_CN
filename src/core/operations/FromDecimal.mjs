/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import {DELIM_OPTIONS} from "../lib/Delim.mjs";
import {fromDecimal} from "../lib/Decimal.mjs";

/**
 * From Decimal operation
 */
class FromDecimal extends Operation {

    /**
     * FromDecimal constructor
     */
    constructor() {
        super();

        this.name = "From Decimal";
        this.module = "Default";
        this.description = "将数据从序数整数阵列转换回其原始形式。<br> <br> <br>例如<br> <code> 72 101 108 108 108 111 </code>变成<code> hello </code> hello </code>";
        this.inputType = "string";
        this.outputType = "byteArray";
        this.args = [
            {
                "name": "Delimiter",
                "type": "option",
                "value": DELIM_OPTIONS
            },
            {
                "name": "Support signed values",
                "type": "boolean",
                "value": false
            }
        ];
        this.checks = [
            {
                pattern: "^(?:\\d{1,2}|1\\d{2}|2[0-4]\\d|25[0-5])(?: (?:\\d{1,2}|1\\d{2}|2[0-4]\\d|25[0-5]))*$",
                flags: "",
                args: ["Space", false]
            },
            {
                pattern: "^(?:\\d{1,2}|1\\d{2}|2[0-4]\\d|25[0-5])(?:,(?:\\d{1,2}|1\\d{2}|2[0-4]\\d|25[0-5]))*$",
                flags: "",
                args: ["Comma", false]
            },
            {
                pattern: "^(?:\\d{1,2}|1\\d{2}|2[0-4]\\d|25[0-5])(?:;(?:\\d{1,2}|1\\d{2}|2[0-4]\\d|25[0-5]))*$",
                flags: "",
                args: ["Semi-colon", false]
            },
            {
                pattern: "^(?:\\d{1,2}|1\\d{2}|2[0-4]\\d|25[0-5])(?::(?:\\d{1,2}|1\\d{2}|2[0-4]\\d|25[0-5]))*$",
                flags: "",
                args: ["Colon", false]
            },
            {
                pattern: "^(?:\\d{1,2}|1\\d{2}|2[0-4]\\d|25[0-5])(?:\\n(?:\\d{1,2}|1\\d{2}|2[0-4]\\d|25[0-5]))*$",
                flags: "",
                args: ["Line feed", false]
            },
            {
                pattern: "^(?:\\d{1,2}|1\\d{2}|2[0-4]\\d|25[0-5])(?:\\r\\n(?:\\d{1,2}|1\\d{2}|2[0-4]\\d|25[0-5]))*$",
                flags: "",
                args: ["CRLF", false]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {byteArray}
     */
    run(input, args) {
        let data = fromDecimal(input, args[0]);
        if (args[1]) { // Convert negatives
            data = data.map(v => v < 0 ? 0xFF + v + 1 : v);
        }
        return data;
    }

}

export default FromDecimal;
