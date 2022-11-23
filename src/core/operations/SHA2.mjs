/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import {runHash} from "../lib/Hash.mjs";

/**
 * SHA2 operation
 */
class SHA2 extends Operation {

    /**
     * SHA2 constructor
     */
    constructor() {
        super();

        this.name = "SHA2";
        this.module = "Crypto";
        this.description = "SHA-2（安全哈希算法2）哈希功能是由NSA.SHA-2设计的，其中包括其前身SHA-1的重大变化。SHA-2家族由带有摘要（哈希值）的哈希函数组成，为224 ，256、384或512位：SHA224，SHA256，SHA384，SHA512。<br> <br> <br> <br> <ul> <ul> <li> SHA-512在64位单词上运行。</li> <li> <li> sha-256在运行32位单词。</li> <li> SHA-384与SHA-512基本相同，但被截断为384字节。</li> <li> SHA-224与SHA-256很大相同，但与SHA-256相同224字节。</li> <li> SHA-512/224和SHA-512/256是SHA-512的截断版本，但是使用联邦信息处理标准（FIPS）Pub中描述的方法生成初始值180- 4。</li> </ul> SHA256变体的消息摘要算法默认为64发子弹，而SHA512变体则默认为160。";
        this.infoURL = "https://wikipedia.org/wiki/SHA-2";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                name: "Size",
                type: "argSelector",
                value: [
                    {
                        name: "512",
                        on: [2],
                        off: [1]
                    },
                    {
                        name: "384",
                        on: [2],
                        off: [1]
                    },
                    {
                        name: "256",
                        on: [1],
                        off: [2]
                    },
                    {
                        name: "224",
                        on: [1],
                        off: [2]
                    },
                    {
                        name: "512/256",
                        on: [2],
                        off: [1]
                    },
                    {
                        name: "512/224",
                        on: [2],
                        off: [1]
                    }
                ]
            },
            {
                name: "Rounds", // For SHA256 variants
                type: "number",
                value: 64,
                min: 16
            },
            {
                name: "Rounds", // For SHA512 variants
                type: "number",
                value: 160,
                min: 32
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const size = args[0];
        const rounds = (size === "256" || size === "224") ? args[1] : args[2];
        return runHash("sha" + size, input, {rounds: rounds});
    }

}

export default SHA2;
