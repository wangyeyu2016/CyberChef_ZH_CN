/**
 * @author Ge0rg3 [georgeomnet+cyberchef@gmail.com]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import Utils from "../Utils.mjs";
import { isImage } from "../lib/FileType.mjs";
import { runHash } from "../lib/Hash.mjs";
import { toBase64 } from "../lib/Base64.mjs";
import jimplib from "jimp/es/index.js";
const jimp = jimplib.default ? jimplib.default : jimplib;

/**
 * Randomize Colour Palette operation
 */
class RandomizeColourPalette extends Operation {

    /**
     * RandomizeColourPalette constructor
     */
    constructor() {
        super();

        this.name = "Randomize Colour Palette";
        this.module = "Image";
        this.description = "在图像的调色板中随机将每种颜色随机。这通常可以揭示与周围环境非常相似的文本或符号，这是有时用于隐肌的技术。";
        this.infoURL = "https://wikipedia.org/wiki/Indexed_color";
        this.inputType = "ArrayBuffer";
        this.outputType = "ArrayBuffer";
        this.presentType = "html";
        this.args = [
            {
                name: "Seed",
                type: "string",
                value: ""
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {ArrayBuffer}
     */
    async run(input, args) {
        if (!isImage(input)) throw new OperationError("Please enter a valid image file.");

        const seed = args[0] || (Math.random().toString().substr(2)),
            parsedImage = await jimp.read(input),
            width = parsedImage.bitmap.width,
            height = parsedImage.bitmap.height;

        let rgbString, rgbHash, rgbHex;

        parsedImage.scan(0, 0, width, height, function(x, y, idx) {
            rgbString = this.bitmap.data.slice(idx, idx+3).join(".");
            rgbHash = runHash("md5", Utils.strToArrayBuffer(seed + rgbString));
            rgbHex = rgbHash.substr(0, 6) + "ff";
            parsedImage.setPixelColor(parseInt(rgbHex, 16), x, y);
        });

        const imageBuffer = await parsedImage.getBufferAsync(jimp.AUTO);

        return new Uint8Array(imageBuffer).buffer;
    }

    /**
     * Displays the extracted data as an image for web apps.
     * @param {ArrayBuffer} data
     * @returns {html}
     */
    present(data) {
        if (!data.byteLength) return "";
        const type = isImage(data);

        return `<img src="data:${type};base64,${toBase64(data)}">`;
    }

}

export default RandomizeColourPalette;
