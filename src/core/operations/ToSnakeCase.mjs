/**
 * @author tlwr [toby@toby.codes]
 * @copyright Crown Copyright 2017
 * @license Apache-2.0
 */

import snakeCase from "lodash/snakeCase.js";
import Operation from "../Operation.mjs";
import { replaceVariableNames } from "../lib/Code.mjs";

/**
 * To Snake case operation
 */
class ToSnakeCase extends Operation {

    /**
     * ToSnakeCase constructor
     */
    constructor() {
        super();

        this.name = "To Snake case";
        this.module = "Code";
        this.description = "将输入字符串转换为蛇案。\\ n <br> <br> \\ nsnake case都是较低的案例。 > \\ n'attempt成为上下文意识'将使操作尝试很好地转换变量和函数名称。";
        this.infoURL = "https://wikipedia.org/wiki/Snake_case";
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
            return replaceVariableNames(input, snakeCase);
        } else {
            return snakeCase(input);
        }
    }
}

export default ToSnakeCase;
