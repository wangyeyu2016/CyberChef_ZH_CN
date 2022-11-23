/**
 * Emulation of the SIGABA machine.
 *
 * @author hettysymes
 * @copyright hettysymes 2020
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import {LETTERS} from "../lib/Enigma.mjs";
import {NUMBERS, CR_ROTORS, I_ROTORS, SigabaMachine, CRRotor, IRotor} from "../lib/SIGABA.mjs";

/**
 * Sigaba operation
 */
class Sigaba extends Operation {

    /**
     * Sigaba constructor
     */
    constructor() {
        super();

        this.name = "SIGABA";
        this.module = "Bletchley";
        this.description = "与WW2 Sigaba Machine。和海军，直到今天，从未被打破。持有15个转子：5个密码转子和10个转子（5个对照转子和5个索引转子）控制着密码转子的踏脚，Sigaba的转子阶梯阶梯更为复杂。比其时间的其他转子机，例如Enigma。所有示例转子接线都是随机示例集。<br> <br> <br>以配置转子线，用于密码和控制转子输入一串字母，这些字母从a到z，对于索引转子，输入一个数字序列，该数字从0到9。注意加密与解密不同，因此首先选择所需模式。<br> <br>注意：虽然已针对其他软件进行了测试。模拟器，尚未针对硬件进行测试。";
        this.infoURL = "https://wikipedia.org/wiki/SIGABA";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                name: "1st (left-hand) cipher rotor",
                type: "editableOption",
                value: CR_ROTORS,
                defaultIndex: 0
            },
            {
                name: "1st cipher rotor reversed",
                type: "boolean",
                value: false
            },
            {
                name: "1st cipher rotor intial value",
                type: "option",
                value: LETTERS
            },
            {
                name: "2nd cipher rotor",
                type: "editableOption",
                value: CR_ROTORS,
                defaultIndex: 0
            },
            {
                name: "2nd cipher rotor reversed",
                type: "boolean",
                value: false
            },
            {
                name: "2nd cipher rotor intial value",
                type: "option",
                value: LETTERS
            },
            {
                name: "3rd (middle) cipher rotor",
                type: "editableOption",
                value: CR_ROTORS,
                defaultIndex: 0
            },
            {
                name: "3rd cipher rotor reversed",
                type: "boolean",
                value: false
            },
            {
                name: "3rd cipher rotor intial value",
                type: "option",
                value: LETTERS
            },
            {
                name: "4th cipher rotor",
                type: "editableOption",
                value: CR_ROTORS,
                defaultIndex: 0
            },
            {
                name: "4th cipher rotor reversed",
                type: "boolean",
                value: false
            },
            {
                name: "4th cipher rotor intial value",
                type: "option",
                value: LETTERS
            },
            {
                name: "5th (right-hand) cipher rotor",
                type: "editableOption",
                value: CR_ROTORS,
                defaultIndex: 0
            },
            {
                name: "5th cipher rotor reversed",
                type: "boolean",
                value: false
            },
            {
                name: "5th cipher rotor intial value",
                type: "option",
                value: LETTERS
            },
            {
                name: "1st (left-hand) control rotor",
                type: "editableOption",
                value: CR_ROTORS,
                defaultIndex: 0
            },
            {
                name: "1st control rotor reversed",
                type: "boolean",
                value: false
            },
            {
                name: "1st control rotor intial value",
                type: "option",
                value: LETTERS
            },
            {
                name: "2nd control rotor",
                type: "editableOption",
                value: CR_ROTORS,
                defaultIndex: 0
            },
            {
                name: "2nd control rotor reversed",
                type: "boolean",
                value: false
            },
            {
                name: "2nd control rotor intial value",
                type: "option",
                value: LETTERS
            },
            {
                name: "3rd (middle) control rotor",
                type: "editableOption",
                value: CR_ROTORS,
                defaultIndex: 0
            },
            {
                name: "3rd control rotor reversed",
                type: "boolean",
                value: false
            },
            {
                name: "3rd control rotor intial value",
                type: "option",
                value: LETTERS
            },
            {
                name: "4th control rotor",
                type: "editableOption",
                value: CR_ROTORS,
                defaultIndex: 0
            },
            {
                name: "4th control rotor reversed",
                type: "boolean",
                value: false
            },
            {
                name: "4th control rotor intial value",
                type: "option",
                value: LETTERS
            },
            {
                name: "5th (right-hand) control rotor",
                type: "editableOption",
                value: CR_ROTORS,
                defaultIndex: 0
            },
            {
                name: "5th control rotor reversed",
                type: "boolean",
                value: false
            },
            {
                name: "5th control rotor intial value",
                type: "option",
                value: LETTERS
            },
            {
                name: "1st (left-hand) index rotor",
                type: "editableOption",
                value: I_ROTORS,
                defaultIndex: 0
            },
            {
                name: "1st index rotor intial value",
                type: "option",
                value: NUMBERS
            },
            {
                name: "2nd index rotor",
                type: "editableOption",
                value: I_ROTORS,
                defaultIndex: 0
            },
            {
                name: "2nd index rotor intial value",
                type: "option",
                value: NUMBERS
            },
            {
                name: "3rd (middle) index rotor",
                type: "editableOption",
                value: I_ROTORS,
                defaultIndex: 0
            },
            {
                name: "3rd index rotor intial value",
                type: "option",
                value: NUMBERS
            },
            {
                name: "4th index rotor",
                type: "editableOption",
                value: I_ROTORS,
                defaultIndex: 0
            },
            {
                name: "4th index rotor intial value",
                type: "option",
                value: NUMBERS
            },
            {
                name: "5th (right-hand) index rotor",
                type: "editableOption",
                value: I_ROTORS,
                defaultIndex: 0
            },
            {
                name: "5th index rotor intial value",
                type: "option",
                value: NUMBERS
            },
            {
                name: "SIGABA mode",
                type: "option",
                value: ["Encrypt", "Decrypt"]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const sigabaSwitch = args[40];
        const cipherRotors = [];
        const controlRotors = [];
        const indexRotors = [];
        for (let i=0; i<5; i++) {
            const rotorWiring = args[i*3];
            cipherRotors.push(new CRRotor(rotorWiring, args[i*3+2], args[i*3+1]));
        }
        for (let i=5; i<10; i++) {
            const rotorWiring = args[i*3];
            controlRotors.push(new CRRotor(rotorWiring, args[i*3+2], args[i*3+1]));
        }
        for (let i=15; i<20; i++) {
            const rotorWiring = args[i*2];
            indexRotors.push(new IRotor(rotorWiring, args[i*2+1]));
        }
        const sigaba = new SigabaMachine(cipherRotors, controlRotors, indexRotors);
        let result;
        if (sigabaSwitch === "Encrypt") {
            result = sigaba.encrypt(input);
        } else if (sigabaSwitch === "Decrypt") {
            result = sigaba.decrypt(input);
        }
        return result;
    }

}
export default Sigaba;
