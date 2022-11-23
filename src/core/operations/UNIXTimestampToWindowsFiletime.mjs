/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2017
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import BigNumber from "bignumber.js";
import OperationError from "../errors/OperationError.mjs";

/**
 * UNIX Timestamp to Windows Filetime operation
 */
class UNIXTimestampToWindowsFiletime extends Operation {

    /**
     * UNIXTimestampToWindowsFiletime constructor
     */
    constructor() {
        super();

        this.name = "UNIX Timestamp to Windows Filetime";
        this.module = "Default";
        this.description = "将UNIX时间戳转换为Windows Filetime值。<br> <br> Windows Filetime是一个64位值，代表自1601年1月1日以来的100纳秒间隔的数量。<br>一个32位值，代表自1970年1月1日UTC（UNIX时期）以来的秒数。<br> <br>此操作还支持毫秒，微秒和纳秒的UNIX时间戳。";
        this.infoURL = "https://msdn.microsoft.com/en-us/library/windows/desktop/ms724284(v=vs.85).aspx";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "Input units",
                "type": "option",
                "value": ["Seconds (s)", "Milliseconds (ms)", "Microseconds (μs)", "Nanoseconds (ns)"]
            },
            {
                "name": "Output format",
                "type": "option",
                "value": ["Decimal", "Hex (big endian)", "Hex (little endian)"]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [units, format] = args;

        if (!input) return "";

        input = new BigNumber(input);

        if (units === "Seconds (s)") {
            input = input.multipliedBy(new BigNumber("10000000"));
        } else if (units === "Milliseconds (ms)") {
            input = input.multipliedBy(new BigNumber("10000"));
        } else if (units === "Microseconds (μs)") {
            input = input.multipliedBy(new BigNumber("10"));
        } else if (units === "Nanoseconds (ns)") {
            input = input.dividedBy(new BigNumber("100"));
        } else {
            throw new OperationError("Unrecognised unit");
        }

        input = input.plus(new BigNumber("116444736000000000"));

        let result;
        if (format.startsWith("Hex")) {
            result = input.toString(16);
        } else {
            result = input.toFixed();
        }

        if (format === "Hex (little endian)") {
            // Swap endianness
            let flipped = "";
            for (let i = result.length - 2; i >= 0; i -= 2) {
                flipped += result.charAt(i);
                flipped += result.charAt(i + 1);
            }
            result = flipped;
        }

        return result;
    }

}

export default UNIXTimestampToWindowsFiletime;
