/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import Dish from "../Dish.mjs";
import XRegExp from "xregexp";
import { isWorkerEnvironment } from "../Utils.mjs";

/**
 * Register operation
 */
class Register extends Operation {

    /**
     * Register constructor
     */
    constructor() {
        super();

        this.name = "Register";
        this.flowControl = true;
        this.module = "Regex";
        this.description = "从输入中提取数据并将其存储在寄存器中，然后将其作为参数传递到后续操作中。规范表达式捕获组用于选择用于提取的数据。<br> <br>用于在参数中使用寄存器，请参考它们使用它们。符号<code> $ rn </code>其中n是寄存器号，从0开始。代码>（。*）</code> <br>参数：<code> $ r0 </code>变为<code> test </code> <br> <br> <br>可以使用Backslash.e.g中的参数中逃脱寄存器。 <code> \\ $ r0 </code>将成为<code> $ r0 </code>而不是<code> test </code>。";
        this.infoURL = "https://wikipedia.org/wiki/Regular_expression#Syntax";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "Extractor",
                "type": "binaryString",
                "value": "([\\s\\S]*)"
            },
            {
                "name": "Case insensitive",
                "type": "boolean",
                "value": true
            },
            {
                "name": "Multiline matching",
                "type": "boolean",
                "value": false
            },
            {
                "name": "Dot matches all",
                "type": "boolean",
                "value": false
            }
        ];
    }

    /**
     * @param {Object} state - The current state of the recipe.
     * @param {number} state.progress - The current position in the recipe.
     * @param {Dish} state.dish - The Dish being operated on.
     * @param {Operation[]} state.opList - The list of operations in the recipe.
     * @returns {Object} The updated state of the recipe.
     */
    async run(state) {
        const ings = state.opList[state.progress].ingValues;
        const [extractorStr, i, m, s] = ings;

        let modifiers = "";
        if (i) modifiers += "i";
        if (m) modifiers += "m";
        if (s) modifiers += "s";

        const extractor = new XRegExp(extractorStr, modifiers),
            input = await state.dish.get(Dish.STRING),
            registers = input.match(extractor);

        if (!registers) return state;

        if (isWorkerEnvironment()) {
            self.setRegisters(state.forkOffset + state.progress, state.numRegisters, registers.slice(1));
        }

        /**
         * Replaces references to registers (e.g. $R0) with the contents of those registers.
         *
         * @param {string} str
         * @returns {string}
         */
        function replaceRegister(str) {
            // Replace references to registers ($Rn) with contents of registers
            return str.replace(/(\\*)\$R(\d{1,2})/g, (match, slashes, regNum) => {
                const index = parseInt(regNum, 10) + 1;
                if (index <= state.numRegisters || index >= state.numRegisters + registers.length)
                    return match;
                if (slashes.length % 2 !== 0) return match.slice(1); // Remove escape
                return slashes + registers[index - state.numRegisters];
            });
        }

        // Step through all subsequent ops and replace registers in args with extracted content
        for (let i = state.progress + 1; i < state.opList.length; i++) {
            if (state.opList[i].disabled) continue;

            let args = state.opList[i].ingValues;
            args = args.map(arg => {
                if (typeof arg !== "string" && typeof arg !== "object") return arg;

                if (typeof arg === "object" && Object.prototype.hasOwnProperty.call(arg, "string")) {
                    arg.string = replaceRegister(arg.string);
                    return arg;
                }
                return replaceRegister(arg);
            });
            state.opList[i].ingValues = args;
        }

        state.numRegisters += registers.length - 1;
        return state;
    }

}

export default Register;
