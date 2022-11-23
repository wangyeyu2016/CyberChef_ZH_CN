/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import OperationError from "../errors/OperationError.mjs";
import forge from "node-forge";

/**
 * Triple DES Encrypt operation
 */
class TripleDESEncrypt extends Operation {

    /**
     * TripleDESEncrypt constructor
     */
    constructor() {
        super();

        this.name = "Triple DES Encrypt";
        this.module = "Ciphers";
        this.description = "Triple DES将DES应用于每个块以增加密钥大小。<br> <br> <b>键：</b>三重des使用24个字节的密钥长度（192位）。<br> des使用键长度为8个字节（64位）。<br> <br>您可以使用KDF操作之一生成基于密码的密钥。<br> <br> <br> <b> <b> iv：</b>初始化向量应为8字节长。如果未输入，则将默认为8个null字节。<br> <br> <b>填充：</b>在CBC和ECB模式下，将使用PKCS＃7填充。";
        this.infoURL = "https://wikipedia.org/wiki/Triple_DES";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "Key",
                "type": "toggleString",
                "value": "",
                "toggleValues": ["Hex", "UTF8", "Latin1", "Base64"]
            },
            {
                "name": "IV",
                "type": "toggleString",
                "value": "",
                "toggleValues": ["Hex", "UTF8", "Latin1", "Base64"]
            },
            {
                "name": "Mode",
                "type": "option",
                "value": ["CBC", "CFB", "OFB", "CTR", "ECB"]
            },
            {
                "name": "Input",
                "type": "option",
                "value": ["Raw", "Hex"]
            },
            {
                "name": "Output",
                "type": "option",
                "value": ["Hex", "Raw"]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const key = Utils.convertToByteString(args[0].string, args[0].option),
            iv = Utils.convertToByteArray(args[1].string, args[1].option),
            mode = args[2],
            inputType = args[3],
            outputType = args[4];

        if (key.length !== 24) {
            throw new OperationError(`Invalid key length: ${key.length} bytes

Triple DES uses a key length of 24 bytes (192 bits).
DES uses a key length of 8 bytes (64 bits).`);
        }
        if (iv.length !== 8 && mode !== "ECB") {
            throw new OperationError(`Invalid IV length: ${iv.length} bytes

Triple DES uses an IV length of 8 bytes (64 bits).
Make sure you have specified the type correctly (e.g. Hex vs UTF8).`);
        }

        input = Utils.convertToByteString(input, inputType);

        const cipher = forge.cipher.createCipher("3DES-" + mode, key);
        cipher.start({iv: iv});
        cipher.update(forge.util.createBuffer(input));
        cipher.finish();

        return outputType === "Hex" ? cipher.output.toHex() : cipher.output.getBytes();
    }

}

export default TripleDESEncrypt;
