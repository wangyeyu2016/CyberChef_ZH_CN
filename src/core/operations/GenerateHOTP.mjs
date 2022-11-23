/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2017
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import otp from "otp";
import ToBase32 from "./ToBase32.mjs";

/**
 * Generate HOTP operation
 */
class GenerateHOTP extends Operation {

    /**
     * GenerateHOTP constructor
     */
    constructor() {
        super();

        this.name = "Generate HOTP";
        this.module = "Default";
        this.description = "基于HMAC的一次性密码算法（HOTP）是一种算法，该算法从共享的秘密密钥和增量计数器中计算一次性密码。它已被用作互联网工程工作组标准RFC 4226，是计划的基础对于开放身份验证（OAUTH），并用于许多两因素身份验证系统中。<br> <br>输入秘密作为输入，或将其留为空白以生成一个随机秘密。";
        this.infoURL = "https://wikipedia.org/wiki/HMAC-based_One-time_Password_algorithm";
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
                "name": "Counter",
                "type": "number",
                "value": 0
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
        });
        const counter = args[3];
        return `URI: ${otpObj.hotpURL}\n\nPassword: ${otpObj.hotp(counter)}`;
    }

}

export default GenerateHOTP;
