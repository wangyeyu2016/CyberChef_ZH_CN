/**
 * @author George O [georgeomnet+cyberchef@gmail.com]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";

/**
 * Index of Coincidence operation
 */
class IndexOfCoincidence extends Operation {

    /**
     * IndexOfCoincidence constructor
     */
    constructor() {
        super();

        this.name = "Index of Coincidence";
        this.module = "Default";
        this.description = "巧合（IC）的索引是两个随机选择字符相同的概率。可以使用该文本是可读的还是随机的，英文文本的IC为0.066左右。频率分析。";
        this.infoURL = "https://wikipedia.org/wiki/Index_of_coincidence";
        this.inputType = "string";
        this.outputType = "number";
        this.presentType = "html";
        this.args = [];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {number}
     */
    run(input, args) {
        const text = input.toLowerCase().replace(/[^a-z]/g, ""),
            frequencies = new Array(26).fill(0),
            alphabet = Utils.expandAlphRange("a-z");
        let coincidence = 0.00,
            density = 0.00,
            result = 0.00,
            i;

        for (i=0; i < alphabet.length; i++) {
            frequencies[i] = text.count(alphabet[i]);
        }

        for (i=0; i < frequencies.length; i++) {
            coincidence += frequencies[i] * (frequencies[i] - 1);
        }

        density = frequencies.sum();

        // Ensure that we don't divide by 0
        if (density < 2) density = 2;

        result = coincidence / (density * (density - 1));

        return result;
    }

    /**
     * Displays the IC as a scale bar for web apps.
     *
     * @param {number} ic
     * @returns {html}
     */
    present(ic) {
        return `Index of Coincidence: ${ic}
Normalized: ${ic * 26}
<br><canvas id='chart-area'></canvas><br>
- 0 represents complete randomness (all characters are unique), whereas 1 represents no randomness (all characters are identical).
- English text generally has an IC of between 0.67 to 0.78.
- 'Random' text is determined by the probability that each letter occurs the same number of times as another.

The graph shows the IC of the input data. A low IC generally means that the text is random, compressed or encrypted.

<script type='application/javascript'>
  var canvas = document.getElementById("chart-area"),
      parentRect = canvas.parentNode.getBoundingClientRect(),
      ic = ${ic};

  canvas.width = parentRect.width * 0.95;
  canvas.height = parentRect.height * 0.25;

  ic = ic > 0.25 ? 0.25 : ic;

  CanvasComponents.drawScaleBar(canvas, ic, 0.25, [
    {
      label: "English text",
      min: 0.05,
      max: 0.08
    },
    {
      label: "> 0.25",
      min: 0.24,
      max: 0.25
    }
  ]);
</script>
     `;
    }

}

export default IndexOfCoincidence;
