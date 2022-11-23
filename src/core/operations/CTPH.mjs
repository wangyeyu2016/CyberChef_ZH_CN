/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import ctphjs from "ctph.js";

/**
 * CTPH operation
 */
class CTPH extends Operation {

    /**
     * CTPH constructor
     */
    constructor() {
        super();

        this.name = "CTPH";
        this.module = "Crypto";
        this.description = "上下文触发的分段散列，也称为模糊哈希，可以匹配具有同源性的输入。类似输入具有相同顺序的相同字节的序列，尽管这些序列之间的字节在内容和长度之间可能有所不同。<br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> CTPH最初是基于Andrew Tridgell博士的工作和一个名为Spamsum的垃圾邮件探测器的工作。此方法由Jesse Kornblum改编，并在2006年的DFRWS会议上发表在一篇论文中，在一份``识别几乎相同的文件''中，使用上下文触发的零件触发了片段''。";
        this.infoURL = "https://forensicswiki.xyz/wiki/index.php?title=Context_Triggered_Piecewise_Hashing";
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
        return ctphjs.digest(input);
    }

}

export default CTPH;
