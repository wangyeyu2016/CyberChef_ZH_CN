/**
 * @author masq [github.cyberchef@masq.cc]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";

/**
 * From Case Insensitive Regex operation
 */
class FromCaseInsensitiveRegex extends Operation {

    /**
     * FromCaseInsensitiveRegex constructor
     */
    constructor() {
        super();

        this.name = "From Case Insensitive Regex";
        this.module = "Default";
        this.description = "如果当时不可用i标志，则将案例不敏感的正则正则正则绳索字符串转换为case敏感的正则正则绳索字符串（不能保证它是正确的原始套管） 。<br> <br> e.g。<code> [mm] [oo] [zz] [ii] [ll] [ll] [aa]/[0-9]。[0-9]。*</code>变成<code> mozilla/[0-9]。[0-9]。*</code>";
        this.infoURL = "https://wikipedia.org/wiki/Regular_expression";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        return input.replace(/\[[a-z]{2}\]/ig, m => m[1].toUpperCase() === m[2].toUpperCase() ? m[1] : m);
    }
}

export default FromCaseInsensitiveRegex;
