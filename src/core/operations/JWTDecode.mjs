/**
 * @author gchq77703 []
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import jwt from "jsonwebtoken";
import OperationError from "../errors/OperationError.mjs";

/**
 * JWT Decode operation
 */
class JWTDecode extends Operation {

    /**
     * JWTDecode constructor
     */
    constructor() {
        super();

        this.name = "JWT Decode";
        this.module = "Crypto";
        this.description = "解码JSON Web令牌<b>不用< / b>检查提供的秘密 /私钥是否有效。使用“ JWT验证”以检查签名是否也有效。";
        this.infoURL = "https://wikipedia.org/wiki/JSON_Web_Token";
        this.inputType = "string";
        this.outputType = "JSON";
        this.args = [];
        this.checks = [
            {
                pattern: "^ey([A-Za-z0-9_-]+)\\.ey([A-Za-z0-9_-]+)\\.([A-Za-z0-9_-]+)$",
                flags: "",
                args: []
            },
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {JSON}
     */
    run(input, args) {
        try {
            const decoded = jwt.decode(input, {
                json: true,
                complete: true
            });

            return decoded.payload;
        } catch (err) {
            throw new OperationError(err);
        }
    }

}

export default JWTDecode;
