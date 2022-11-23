/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";

/**
 * Substitute operation
 */
class Substitute extends Operation {

    /**
     * Substitute constructor
     */
    constructor() {
        super();

        this.name = "Substitute";
        this.module = "Default";
        this.description = "替换密码允许您指定字节可以用其他字节值替换。可以使用该字节来创建凯撒密码，但更强大，因为可以替换任何字节值，而不仅仅是字母，而替换值不必按顺序进行。<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< br> <br>输入要替换在明文字段中的字节，并且可以使用字符串easce线馈字符可以写为<code> \\ n </code>或<code> \\ x0a </code>。<br> <br>可以使用连字符指定字节范围。例如<code> 0123456789 </code>可以写为<code> 0-9 </code>。<br> <br>请注意，BlackSlash字符用于逃脱特殊字符，因此，如果您想要要自行使用它们（例如<code> \\\\ </code>）。";
        this.infoURL = "https://wikipedia.org/wiki/Substitution_cipher";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "Plaintext",
                "type": "binaryString",
                "value": "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
            },
            {
                "name": "Ciphertext",
                "type": "binaryString",
                "value": "XYZABCDEFGHIJKLMNOPQRSTUVW"
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const plaintext = Utils.expandAlphRange([...args[0]]),
            ciphertext = Utils.expandAlphRange([...args[1]]);
        let output = "",
            index = -1;

        if (plaintext.length !== ciphertext.length) {
            output = "Warning: Plaintext and Ciphertext lengths differ\n\n";
        }

        for (const character of input) {
            index = plaintext.indexOf(character);
            output += index > -1 && index < ciphertext.length ? ciphertext[index] : character;
        }

        return output;
    }

}

export default Substitute;
