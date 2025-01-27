/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import NodeMD6 from "node-md6";

/**
 * MD6 operation
 */
class MD6 extends Operation {

    /**
     * MD6 constructor
     */
    constructor() {
        super();

        this.name = "MD6";
        this.module = "Crypto";
        this.description = "MD6（消息 - 数据6）算法是一个加密哈希函数。它使用类似默克的树状结构来允许长期输入的大量哈希的平行计算。";
        this.infoURL = "https://wikipedia.org/wiki/MD6";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "Size",
                "type": "number",
                "value": 256
            },
            {
                "name": "Levels",
                "type": "number",
                "value": 64
            },
            {
                "name": "Key",
                "type": "string",
                "value": ""
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [size, levels, key] = args;

        if (size < 0 || size > 512)
            throw new OperationError("Size must be between 0 and 512");
        if (levels < 0)
            throw new OperationError("Levels must be greater than 0");

        return NodeMD6.getHashOfText(input, size, key, levels);
    }

}

export default MD6;
