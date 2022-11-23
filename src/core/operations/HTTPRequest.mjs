/**
 * @author tlwr [toby@toby.codes]
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";

/**
 * HTTP request operation
 */
class HTTPRequest extends Operation {

    /**
     * HTTPRequest constructor
     */
    constructor() {
        super();

        this.name = "HTTP request";
        this.module = "Default";
        this.description = [
            "提出HTTP请求并返回响应。",
            "<br><br>",
            "该操作支持不同的HTTP方法，例如GET，POST，PUT等。",
            "<br><br>",
            "您可以在格式<Code>键：值</code>中按行添加标题。",
            "<br><br>",
            "可以通过检查“显示响应元数据”选项来查看响应的状态代码，以及有限的裸露标头选择。 出于安全原因，浏览器仅曝光了一组有限的响应标头。",
        ].join("\n");
        this.infoURL = "https://wikipedia.org/wiki/List_of_HTTP_header_fields#Request_fields";
        this.inputType = "string";
        this.outputType = "string";
        this.manualBake = true;
        this.args = [
            {
                "name": "Method",
                "type": "option",
                "value": [
                    "GET", "POST", "HEAD",
                    "PUT", "PATCH", "DELETE",
                    "CONNECT", "TRACE", "OPTIONS"
                ]
            },
            {
                "name": "URL",
                "type": "string",
                "value": ""
            },
            {
                "name": "Headers",
                "type": "text",
                "value": ""
            },
            {
                "name": "Mode",
                "type": "option",
                "value": [
                    "Cross-Origin Resource Sharing",
                    "No CORS (limited to HEAD, GET or POST)",
                ]
            },
            {
                "name": "Show response metadata",
                "type": "boolean",
                "value": false
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [method, url, headersText, mode, showResponseMetadata] = args;

        if (url.length === 0) return "";

        const headers = new Headers();
        headersText.split(/\r?\n/).forEach(line => {
            line = line.trim();

            if (line.length === 0) return;

            const split = line.split(":");
            if (split.length !== 2) throw `Could not parse header in line: ${line}`;

            headers.set(split[0].trim(), split[1].trim());
        });

        const config = {
            method: method,
            headers: headers,
            mode: modeLookup[mode],
            cache: "no-cache",
        };

        if (method !== "GET" && method !== "HEAD") {
            config.body = input;
        }

        return fetch(url, config)
            .then(r => {
                if (r.status === 0 && r.type === "opaque") {
                    throw new OperationError("Error: Null response. Try setting the connection mode to CORS.");
                }

                if (showResponseMetadata) {
                    let headers = "";
                    for (const pair of r.headers.entries()) {
                        headers += "    " + pair[0] + ": " + pair[1] + "\n";
                    }
                    return r.text().then(b => {
                        return "####\n  Status: " + r.status + " " + r.statusText +
                            "\n  Exposed headers:\n" + headers + "####\n\n" + b;
                    });
                }
                return r.text();
            })
            .catch(e => {
                throw new OperationError(e.toString() +
                    "\n\nThis error could be caused by one of the following:\n" +
                    " - An invalid URL\n" +
                    " - Making a request to an insecure resource (HTTP) from a secure source (HTTPS)\n" +
                    " - Making a cross-origin request to a server which does not support CORS\n");
            });
    }

}


/**
 * Lookup table for HTTP modes
 *
 * @private
 */
const modeLookup = {
    "Cross-Origin Resource Sharing": "cors",
    "No CORS (limited to HEAD, GET or POST)": "no-cors",
};


export default HTTPRequest;
