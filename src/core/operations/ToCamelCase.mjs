/**
 * @author tlwr [toby@toby.codes]
 * @copyright Crown Copyright 2017
 * @license Apache-2.0
 */

import camelCase from "lodash/camelCase.js";
import Operation from "../Operation.mjs";
import { replaceVariableNames } from "../lib/Code.mjs";

/**
 * To Camel case operation
 */
class ToCamelCase extends Operation {

    /**
     * ToCamelCase constructor
     */
    constructor() {
        super();

        this.name = "To Camel case";
        this.module = "Code";
        this.description = "将输入字符串转换为骆驼盒。\\ n <br> <br> \\ ncamel案例都是较低的案例，除了单词边界之后的字母，即大写。\\ n <br> <br> <br> <br> <br> > <br> \\ n'attempt成为上下文意识'将使操作尝试很好地转换变量和函数名称。";
        this.infoURL = "https://wikipedia.org/wiki/Camel_case";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "Attempt to be context aware",
                "type": "boolean",
                "value": false
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const smart = args[0];

        if (smart) {
            return replaceVariableNames(input, camelCase);
        } else {
            return camelCase(input);
        }
    }

}

export default ToCamelCase;
