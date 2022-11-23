/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import bson from "bson";
import OperationError from "../errors/OperationError.mjs";

/**
 * BSON serialise operation
 */
class BSONSerialise extends Operation {

    /**
     * BSONSerialise constructor
     */
    constructor() {
        super();

        this.name = "BSON serialise";
        this.module = "Serialise";
        this.description = "BSON是一种计算机数据互换格式，主要用作MongoDB数据库中的数据存储和网络传输格式。它是一种二进制形式，用于表示简单的数据结构，关联数组（称为MongoDB中的对象或文档）以及各种特定的特定数据类型MongoDB的兴趣。名称“ BSON”基于JSON一词，代表“二进制JSON”。<br> <br>输入数据应有效JSON。";
        this.infoURL = "https://wikipedia.org/wiki/BSON";
        this.inputType = "string";
        this.outputType = "ArrayBuffer";
        this.args = [];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {ArrayBuffer}
     */
    run(input, args) {
        if (!input) return new ArrayBuffer();

        try {
            const data = JSON.parse(input);
            return bson.serialize(data).buffer;
        } catch (err) {
            throw new OperationError(err.toString());
        }
    }

}

export default BSONSerialise;
