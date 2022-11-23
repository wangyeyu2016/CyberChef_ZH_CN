/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import bcrypt from "bcryptjs";
import { isWorkerEnvironment } from "../Utils.mjs";

/**
 * Bcrypt operation
 */
class Bcrypt extends Operation {

    /**
     * Bcrypt constructor
     */
    constructor() {
        super();

        this.name = "Bcrypt";
        this.module = "Crypto";
        this.description = "BCRYPT是由Niels Provos和David Mazi \\ Xe8Res设计的密码哈希功能，基于炉灶密码，并于1999年在Usenix上呈现。Besides纳入了盐以防止彩虹桌攻击，BCRYPT是一种适应性功能：随着时间的推移，随着时间的推移，随着时间的推移，随着时间的推移，随着时间的推移，随着时间的推移，随着时间的推移，随着时间的推移，随着时间的推移，随着时间的推移，随着时间的推移，随着时间的推移，随着时间的推移，随着时间的推移，随着时间的推移，随着时间的推移，随着时间的推移，可以增加迭代计数（弹性）以使其较慢，因此即使计算功率增加，它仍然可以抵抗蛮力搜索攻击。<br> <br> <br>在输入中输入密码以生成其哈希。";
        this.infoURL = "https://wikipedia.org/wiki/Bcrypt";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "Rounds",
                "type": "number",
                "value": 10
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    async run(input, args) {
        const rounds = args[0];
        const salt = await bcrypt.genSalt(rounds);

        return await bcrypt.hash(input, salt, null, p => {
            // Progress callback
            if (isWorkerEnvironment())
                self.sendStatusMessage(`Progress: ${(p * 100).toFixed(0)}%`);
        });

    }

}

export default Bcrypt;
