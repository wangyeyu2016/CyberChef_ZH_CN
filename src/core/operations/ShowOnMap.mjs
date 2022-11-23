/**
 * @author j433866 [j433866@gmail.com]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import {FORMATS, convertCoordinates} from "../lib/ConvertCoordinates.mjs";
import OperationError from "../errors/OperationError.mjs";

/**
 * Show on map operation
 */
class ShowOnMap extends Operation {

    /**
     * ShowOnMap constructor
     */
    constructor() {
        super();

        this.name = "Show on map";
        this.module = "Hashing";
        this.description = "在湿滑的地图上显示坐标。<br> <br>坐标将转换为十进制度。 DMS）</li> <li>学位十进制分钟（DDM）</li> <li>十进制学位（DD）</li> <li> Geohash </li> <li>军事网格参考系统（MGRS）< /li> <li>军械调查国家电网（OSNG）</li> <li>通用横向Mercator（UTM）</li> </ul> <br>此操作将无法离线工作。";
        this.infoURL = "https://foundation.wikimedia.org/wiki/Maps_Terms_of_Use";
        this.inputType = "string";
        this.outputType = "string";
        this.presentType = "html";
        this.args = [
            {
                name: "Zoom Level",
                type: "number",
                value: 13
            },
            {
                name: "Input Format",
                type: "option",
                value: ["Auto"].concat(FORMATS)
            },
            {
                name: "Input Delimiter",
                type: "option",
                value: [
                    "Auto",
                    "Direction Preceding",
                    "Direction Following",
                    "\\n",
                    "Comma",
                    "Semi-colon",
                    "Colon"
                ]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        if (input.replace(/\s+/g, "") !== "") {
            const inFormat = args[1],
                inDelim = args[2];
            let latLong;
            try {
                latLong = convertCoordinates(input, inFormat, inDelim, "Decimal Degrees", "Comma", "None", 5);
            } catch (error) {
                throw new OperationError(error);
            }
            latLong = latLong.replace(/[,]$/, "");
            latLong = latLong.replace(/°/g, "");
            return latLong;
        }
        return input;
    }

    /**
     * @param {string} data
     * @param {Object[]} args
     * @returns {string}
     */
    async present(data, args) {
        if (data.replace(/\s+/g, "") === "") {
            data = "0, 0";
        }
        const zoomLevel = args[0];
        const tileUrl = "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png",
            tileAttribution = "<a href=\"https://wikimediafoundation.org/wiki/Maps_Terms_of_Use\">Wikimedia maps</a> | &copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors",
            leafletUrl = "https://unpkg.com/leaflet@1.5.0/dist/leaflet.js",
            leafletCssUrl = "https://unpkg.com/leaflet@1.5.0/dist/leaflet.css";
        return `<link rel="stylesheet" href="${leafletCssUrl}" crossorigin=""/>
<style>#output-html { white-space: normal; padding: 0; }</style>
<div id="presentedMap" style="width: 100%; height: 100%;"></div>
<script type="text/javascript">
var mapscript = document.createElement('script');
document.body.appendChild(mapscript);
mapscript.onload = function() {
    var presentMap = L.map('presentedMap').setView([${data}], ${zoomLevel});
    L.tileLayer('${tileUrl}', {
        attribution: '${tileAttribution}'
    }).addTo(presentMap);

    L.marker([${data}]).addTo(presentMap)
        .bindPopup('${data}')
        .openPopup();
};
mapscript.src = "${leafletUrl}";
</script>`;
    }
}

export default ShowOnMap;
