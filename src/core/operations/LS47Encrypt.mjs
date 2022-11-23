/**
 * @author n1073645 [n1073645@gmail.com]
 * @copyright Crown Copyright 2020
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import * as LS47 from "../lib/LS47.mjs";

/**
 * LS47 Encrypt operation
 */
class LS47Encrypt extends Operation {

    /**
     * LS47Encrypt constructor
     */
    constructor() {
        super();

        this.name = "LS47 Encrypt";
        this.module = "Crypto";
        this.description = "如Alan Kaminsky所述，这是对Elsiefour密码的略有改进。我们使用7x7个字符，而不是原始字符（几乎不拟合）6x6，以便能够加密一些结构化信息。我们还描述了一种简单的键性扩张算法，因为记住密码的记忆密码像Elsiefour Hold一样，相似的安全考虑。<br> LS47字母包含以下字符：<code> _abcdefghijklmnopqrstuvwxyz.0123456789， - +*/：？！/：？！然后在用于加密或解密的7x7网格中表示字母的排列。";
        this.infoURL = "https://github.com/exaexa/ls47";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                name: "Password",
                type: "string",
                value: ""
            },
            {
                name: "Padding",
                type: "number",
                value: 10
            },
            {
                name: "Signature",
                type: "string",
                value: ""
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        this.paddingSize = parseInt(args[1], 10);

        LS47.initTiles();

        const key = LS47.deriveKey(args[0]);
        return LS47.encryptPad(key, input, args[2], this.paddingSize);
    }

}

export default LS47Encrypt;
