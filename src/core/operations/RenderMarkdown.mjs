/**
 * @author j433866 [j433866@gmail.com]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";

/**
 * Render Markdown operation
 */
class RenderMarkdown extends Operation {

    /**
     * RenderMarkdown constructor
     */
    constructor() {
        super();

        this.name = "Render Markdown";
        this.module = "Code";
        this.description = "渲染输入标记为HTML.HTML渲染被禁用以避免XSS。";
        this.infoURL = "https://wikipedia.org/wiki/Markdown";
        this.inputType = "string";
        this.outputType = "html";
        this.args = [
            {
                name: "Autoconvert URLs to links",
                type: "boolean",
                value: false
            },
            {
                name: "Enable syntax highlighting",
                type: "boolean",
                value: true
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {html}
     */
    run(input, args) {
        const [convertLinks, enableHighlighting] = args,
            md = new MarkdownIt({
                linkify: convertLinks,
                html: false, // Explicitly disable HTML rendering
                highlight: function(str, lang) {
                    if (lang && hljs.getLanguage(lang) && enableHighlighting) {
                        try {
                            return hljs.highlight(lang, str).value;
                        } catch (__) {}
                    }

                    return "";
                }
            }),
            rendered = md.render(input);

        return `<div style="font-family: var(--primary-font-family)">${rendered}</div>`;
    }

}

export default RenderMarkdown;
