/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import moment from "moment-timezone";
import {UNITS} from "../lib/DateTime.mjs";
import OperationError from "../errors/OperationError.mjs";

/**
 * From UNIX Timestamp operation
 */
class FromUNIXTimestamp extends Operation {

    /**
     * FromUNIXTimestamp constructor
     */
    constructor() {
        super();

        this.name = "From UNIX Timestamp";
        this.module = "Default";
        this.description = "将UNIX时间戳转换为DateTime String。时间戳是32位值，代表自1970年1月1日UTC（UNIX时期）以来的秒数。";
        this.infoURL = "https://wikipedia.org/wiki/Unix_time";
        this.inputType = "number";
        this.outputType = "string";
        this.args = [
            {
                "name": "Units",
                "type": "option",
                "value": UNITS
            }
        ];
        this.checks = [
            {
                pattern: "^1?\\d{9}$",
                flags: "",
                args: ["Seconds (s)"]
            },
            {
                pattern: "^1?\\d{12}$",
                flags: "",
                args: ["Milliseconds (ms)"]
            },
            {
                pattern: "^1?\\d{15}$",
                flags: "",
                args: ["Microseconds (μs)"]
            },
            {
                pattern: "^1?\\d{18}$",
                flags: "",
                args: ["Nanoseconds (ns)"]
            }
        ];
    }

    /**
     * @param {number} input
     * @param {Object[]} args
     * @returns {string}
     *
     * @throws {OperationError} if invalid unit
     */
    run(input, args) {
        const units = args[0];
        let d;

        input = parseFloat(input);

        if (units === "Seconds (s)") {
            d = moment.unix(input);
            return d.tz("UTC").format("ddd D MMMM YYYY HH:mm:ss") + " UTC";
        } else if (units === "Milliseconds (ms)") {
            d = moment(input);
            return d.tz("UTC").format("ddd D MMMM YYYY HH:mm:ss.SSS") + " UTC";
        } else if (units === "Microseconds (μs)") {
            d = moment(input / 1000);
            return d.tz("UTC").format("ddd D MMMM YYYY HH:mm:ss.SSS") + " UTC";
        } else if (units === "Nanoseconds (ns)") {
            d = moment(input / 1000000);
            return d.tz("UTC").format("ddd D MMMM YYYY HH:mm:ss.SSS") + " UTC";
        } else {
            throw new OperationError("Unrecognised unit");
        }
    }

}

export default FromUNIXTimestamp;
