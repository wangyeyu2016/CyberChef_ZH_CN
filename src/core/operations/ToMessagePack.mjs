/**
 * @author Matt C [matt@artemisbot.uk]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import notepack from "notepack.io";
import { isWorkerEnvironment } from "../Utils.mjs";

/**
 * To MessagePack operation
 */
class ToMessagePack extends Operation {

    /**
     * ToMessagePack constructor
     */
    constructor() {
        super();

        this.name = "To MessagePack";
        this.module = "Code";
        this.description = "将JSON转换为MessagePack编码的字节Buffer.MessagePack是计算机数据交换格式。它是代表简单数据结构（例如数组和关联数组）的二进制形式。";
        this.infoURL = "https://wikipedia.org/wiki/MessagePack";
        this.inputType = "JSON";
        this.outputType = "ArrayBuffer";
        this.args = [];
    }

    /**
     * @param {JSON} input
     * @param {Object[]} args
     * @returns {ArrayBuffer}
     */
    run(input, args) {
        try {
            if (isWorkerEnvironment()) {
                return notepack.encode(input);
            } else {
                const res = notepack.encode(input);
                // Safely convert from Node Buffer to ArrayBuffer using the correct view of the data
                return (new Uint8Array(res)).buffer;
            }
        } catch (err) {
            throw new OperationError(`Could not encode JSON to MessagePack: ${err}`);
        }
    }

}

export default ToMessagePack;
