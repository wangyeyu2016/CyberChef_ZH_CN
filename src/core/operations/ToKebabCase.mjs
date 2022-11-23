/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import kebabCase from "lodash/kebabCase.js";
import Operation from "../Operation.mjs";
import { replaceVariableNames } from "../lib/Code.mjs";

/**
 * To Kebab case operation
 */
class ToKebabCase extends Operation {

    /**
     * ToKebabCase constructor
     */
    constructor() {
        super();

        this.name = "To Kebab case";
        this.module = "Code";
        this.description = "将输入字符串转换为烤肉串。 n <br> <br> \\ n'attempt成为上下文意识'将使操作尝试很好地转换变量和函数名称。";
        this.infoURL = "https://wikipedia.org/wiki/Kebab_case";
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
            return replaceVariableNames(input, kebabCase);
        } else {
            return kebabCase(input);
        }
    }

}

export default ToKebabCase;
