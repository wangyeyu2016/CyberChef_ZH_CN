/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import ssdeepjs from "ssdeep.js";

/**
 * SSDEEP operation
 */
class SSDEEP extends Operation {

    /**
     * SSDEEP constructor
     */
    constructor() {
        super();

        this.name = "SSDEEP";
        this.module = "Crypto";
        this.description = "SSDEEP是一个用于计算上下文触发分段哈希（CTPH）的程序。此外，称为模糊哈希，CTPH可以匹配具有同源性的输入。类似的输入具有相同顺序的相同字节的序列，尽管这些序列之间的字节在这些序列之间的字节可能都不同。内容和长度。<br> <br> ssDeep哈希现在被广泛用于简单的识别目的（例如，virustotal中的“基本属性”部分）。尽管可以使用“更好”模糊哈希，但SSDeep仍然是主要选择之一，因为它的速度和事实上的标准。<br> <br>此操作从根本上与CTPH操作相同，但是其输出的格式有所不同。";
        this.infoURL = "https://forensicswiki.xyz/wiki/index.php?title=Ssdeep";
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
        return ssdeepjs.digest(input);
    }

}

export default SSDEEP;
