/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2017
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import otp from "otp";
import ToBase32 from "./ToBase32.mjs";

/**
 * Generate TOTP operation
 */
class GenerateTOTP extends Operation {

    /**
     * GenerateTOTP constructor
     */
    constructor() {
        super();

        this.name = "Generate TOTP";
        this.module = "Default";
        this.description = "基于时间的一次性密码算法（TOTP）是一种算法，该算法从共享的秘密密钥和当前时间计算一次性密码。它已被作为Internet工程工作组标准RFC 6238采用，是Initiative的基础用于开放身份验证（OAuth），并用于许多两因素身份验证系统中。totp是一个热门，计数器是当前时间。<br> <br>输入秘密作为输入或将其留为空白将生成一个随机的秘密。T0和T1在几秒钟内。";
        this.infoURL = "https://wikipedia.org/wiki/Time-based_One-time_Password_algorithm";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                "name": "Name",
                "type": "string",
                "value": ""
            },
            {
                "name": "Key size",
                "type": "number",
                "value": 32
            },
            {
                "name": "Code length",
                "type": "number",
                "value": 6
            },
            {
                "name": "Epoch offset (T0)",
                "type": "number",
                "value": 0
            },
            {
                "name": "Interval (T1)",
                "type": "number",
                "value": 30
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const otpObj = otp({
            name: args[0],
            keySize: args[1],
            codeLength: args[2],
            secret: (new ToBase32).run(input, []).split("=")[0],
            epoch: args[3],
            timeSlice: args[4]
        });
        return `URI: ${otpObj.totpURL}\n\nPassword: ${otpObj.totp()}`;
    }

}

export default GenerateTOTP;
