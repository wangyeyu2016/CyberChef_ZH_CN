/**
 * @author Danh4 [dan.h4@ncsc.gov.uk]
 * @copyright Crown Copyright 2020
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import Cbor from "cbor";

/**
 * CBOR Encode operation
 */
class CBOREncode extends Operation {

    /**
     * CBOREncode constructor
     */
    constructor() {
        super();

        this.name = "CBOR Encode";
        this.module = "Serialise";
        this.description = "简洁的二进制对象表示（CBOR）是一种二进制数据序列化格式，基于JSON。例如JSON，它允许传输包含名称 - 值对的数据对象，但以更简洁的方式传输。这会以成本提高处理和传输速度人类可读性。它在IETF RFC 8949中定义。";
        this.infoURL = "https://wikipedia.org/wiki/CBOR";
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
        return new Uint8Array(Cbor.encodeCanonical(input)).buffer;
    }

}

export default CBOREncode;
