/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import moment from "moment-timezone";
import {DATETIME_FORMATS, FORMAT_EXAMPLES} from "../lib/DateTime.mjs";

/**
 * Translate DateTime Format operation
 */
class TranslateDateTimeFormat extends Operation {

    /**
     * TranslateDateTimeFormat constructor
     */
    constructor() {
        super();

        this.name = "Translate DateTime Format";
        this.module = "Default";
        this.description = "以一种格式解析DateTime字符串，然后在另一种格式中重新编写。<br> <br> <br>不输入以查看相关格式字符串示例。";
        this.infoURL = "https://momentjs.com/docs/#/parsing/string-format/";
        this.inputType = "string";
        this.outputType = "html";
        this.args = [
            {
                "name": "Built in formats",
                "type": "populateOption",
                "value": DATETIME_FORMATS,
                "target": 1
            },
            {
                "name": "Input format string",
                "type": "binaryString",
                "value": "DD/MM/YYYY HH:mm:ss"
            },
            {
                "name": "Input timezone",
                "type": "option",
                "value": ["UTC"].concat(moment.tz.names())
            },
            {
                "name": "Output format string",
                "type": "binaryString",
                "value": "dddd Do MMMM YYYY HH:mm:ss Z z"
            },
            {
                "name": "Output timezone",
                "type": "option",
                "value": ["UTC"].concat(moment.tz.names())
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {html}
     */
    run(input, args) {
        const [inputFormat, inputTimezone, outputFormat, outputTimezone] = args.slice(1);
        let date;

        try {
            date = moment.tz(input, inputFormat, inputTimezone);
            if (!date || date.format() === "Invalid date") throw Error;
        } catch (err) {
            return `Invalid format.\n\n${FORMAT_EXAMPLES}`;
        }

        return date.tz(outputTimezone).format(outputFormat);
    }

}

export default TranslateDateTimeFormat;
