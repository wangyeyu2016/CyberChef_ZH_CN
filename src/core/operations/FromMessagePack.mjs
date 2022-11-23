/**
 * @author Matt C [matt@artemisbot.uk]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import notepack from "notepack.io";

/**
 * From MessagePack operation
 */
class FromMessagePack extends Operation {

    /**
     * FromMessagePack constructor
     */
    constructor() {
        super();

        this.name = "From MessagePack";
        this.module = "Code";
        this.description = "将MessagePack编码的数据转换为JSON.MessagePack是一种计算机数据互换格式。它是代表简单数据结构（例如数组和关联阵列）的二进制形式。";
        this.infoURL = "https://wikipedia.org/wiki/MessagePack";
        this.inputType = "ArrayBuffer";
        this.outputType = "JSON";
        this.args = [];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {JSON}
     */
    run(input, args) {
        try {
            const buf = Buffer.from(new Uint8Array(input));
            return notepack.decode(buf);
        } catch (err) {
            throw new OperationError(`Could not decode MessagePack to JSON: ${err}`);
        }
    }

}

export default FromMessagePack;
