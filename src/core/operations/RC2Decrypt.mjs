/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import forge from "node-forge";

/**
 * RC2 Decrypt operation
 */
class RC2Decrypt extends Operation {

    /**
     * RC2Decrypt constructor
     */
    constructor() {
        super();

        this.name = "RC2 Decrypt";
        this.module = "Ciphers";
        this.description = "RC2（也称为ARC2）是由Ron Rivest在1987年设计的对称键密码。尺寸键。<br> <br> <b> iv：</b>以在CBC模式下运行密码，初始化向量应长8字节。如果IV静置为空白，则密码将在ECB模式下运行。 <br> <br> <b>填充：</b>在CBC和ECB模式下，将使用PKCS＃7填充。";
        this.infoURL = "https://wikipedia.org/wiki/RC2";
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
                "name": "Input",
                "type": "option",
                "value": ["Hex", "Raw"]
            },
            {
                "name": "Output",
                "type": "option",
                "value": ["Raw", "Hex"]
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
            iv = Utils.convertToByteString(args[1].string, args[1].option),
            [,, inputType, outputType] = args,
            decipher = forge.rc2.createDecryptionCipher(key);

        input = Utils.convertToByteString(input, inputType);

        decipher.start(iv || null);
        decipher.update(forge.util.createBuffer(input));
        decipher.finish();

        return outputType === "Hex" ? decipher.output.toHex() : decipher.output.getBytes();
    }

}

export default RC2Decrypt;
