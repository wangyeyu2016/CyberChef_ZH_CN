/**
 * @author j433866 [j433866@gmail.com]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import { isImage } from "../lib/FileType.mjs";
import { toBase64 } from "../lib/Base64.mjs";
import { isWorkerEnvironment } from "../Utils.mjs";
import jimplib from "jimp/es/index.js";
const jimp = jimplib.default ? jimplib.default : jimplib;

/**
 * Crop Image operation
 */
class CropImage extends Operation {

    /**
     * CropImage constructor
     */
    constructor() {
        super();

        this.name = "Crop Image";
        this.module = "Image";
        this.description = "将图像作为指定区域或自动农作物边缘。<br> <br> <br> <b> <u> autocrop </u> </u> </b> <br>自动从图像中自动播种相同的颜色边界。<br> <br> <br> <u>自动耐受性</u> <br>像素之间颜色差的公差的百分比值。<br> <br> <br> <u>只有自ocropop框架</u> （各方面必须具有相同的边界）<br> <br> <br>对称自动oprop </u> <br>强制自动骨架为对称（顶/底部和左/右/右均以相同的数量裁剪）<br>）<br> <br> <u>自动ocrop </u> <br>围绕图像留下的边框像素的数量。";
        this.infoURL = "https://wikipedia.org/wiki/Cropping_(image)";
        this.inputType = "ArrayBuffer";
        this.outputType = "ArrayBuffer";
        this.presentType = "html";
        this.args = [
            {
                name: "X Position",
                type: "number",
                value: 0,
                min: 0
            },
            {
                name: "Y Position",
                type: "number",
                value: 0,
                min: 0
            },
            {
                name: "Width",
                type: "number",
                value: 10,
                min: 1
            },
            {
                name: "Height",
                type: "number",
                value: 10,
                min: 1
            },
            {
                name: "Autocrop",
                type: "boolean",
                value: false
            },
            {
                name: "Autocrop tolerance (%)",
                type: "number",
                value: 0.02,
                min: 0,
                max: 100,
                step: 0.01
            },
            {
                name: "Only autocrop frames",
                type: "boolean",
                value: true
            },
            {
                name: "Symmetric autocrop",
                type: "boolean",
                value: false
            },
            {
                name: "Autocrop keep border (px)",
                type: "number",
                value: 0,
                min: 0
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {byteArray}
     */
    async run(input, args) {
        const [xPos, yPos, width, height, autocrop, autoTolerance, autoFrames, autoSymmetric, autoBorder] = args;
        if (!isImage(input)) {
            throw new OperationError("Invalid file type.");
        }

        let image;
        try {
            image = await jimp.read(input);
        } catch (err) {
            throw new OperationError(`Error loading image. (${err})`);
        }
        try {
            if (isWorkerEnvironment())
                self.sendStatusMessage("Cropping image...");
            if (autocrop) {
                image.autocrop({
                    tolerance: (autoTolerance / 100),
                    cropOnlyFrames: autoFrames,
                    cropSymmetric: autoSymmetric,
                    leaveBorder: autoBorder
                });
            } else {
                image.crop(xPos, yPos, width, height);
            }

            let imageBuffer;
            if (image.getMIME() === "image/gif") {
                imageBuffer = await image.getBufferAsync(jimp.MIME_PNG);
            } else {
                imageBuffer = await image.getBufferAsync(jimp.AUTO);
            }
            return imageBuffer.buffer;
        } catch (err) {
            throw new OperationError(`Error cropping image. (${err})`);
        }
    }

    /**
     * Displays the cropped image using HTML for web apps
     * @param {ArrayBuffer} data
     * @returns {html}
     */
    present(data) {
        if (!data.byteLength) return "";
        const dataArray = new Uint8Array(data);

        const type = isImage(dataArray);
        if (!type) {
            throw new OperationError("Invalid file type.");
        }

        return `<img src="data:${type};base64,${toBase64(dataArray)}">`;
    }

}

export default CropImage;
