/**
 * @author GCHQ Contributor [3]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import Protobuf from "../lib/Protobuf.mjs";

/**
 * Protobuf Decode operation
 */
class ProtobufDecode extends Operation {

    /**
     * ProtobufDecode constructor
     */
    constructor() {
        super();

        this.name = "Protobuf Decode";
        this.module = "Protobuf";
        this.description = "使用字段编号作为字段键将任何原始数据编码为JSON表示数据的JSON表示。<br> <br>如果定义了.proto架构，则指编码的数据将在架构中解码。仅一个消息。实例将被解码。<br> <br> <u>显示未知字段</u> <br>当使用架构时，此选项显示了输入数据中存在但未在架构中定义的字段。<br > <br> <u> show type </u> <br>显示名称旁边的字段的类型。对于未定义的字段，显示了窃听类型和示例类型。";
        this.infoURL = "https://wikipedia.org/wiki/Protocol_Buffers";
        this.inputType = "ArrayBuffer";
        this.outputType = "JSON";
        this.args = [
            {
                name: "Schema (.proto text)",
                type: "text",
                value: "",
                rows: 8,
                hint: "Drag and drop is enabled on this ingredient"
            },
            {
                name: "Show Unknown Fields",
                type: "boolean",
                value: false
            },
            {
                name: "Show Types",
                type: "boolean",
                value: false
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {JSON}
     */
    run(input, args) {
        input = new Uint8Array(input);
        try {
            return Protobuf.decode(input, args);
        } catch (err) {
            throw new OperationError(err);
        }
    }

}

export default ProtobufDecode;
