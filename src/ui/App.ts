import {html} from "../../lib/html.js";

export function App() {
    // overview, details, commands, advisor
    return html`
        <div
            style="
                position: absolute;
                top: 0;
                left: 0;
                width: 200px;
                padding: 220px 10px 10px;
                background: #9999;
                backdrop-filter: blur(10px);
                color: white;
            "
        ></div>
        <div
            style="
                position: absolute;
                right: 0;
                bottom: 0;
                width: 200px;
                padding: 10px 10px 220px;
                background: #9999;
                backdrop-filter: blur(10px);
                color: white;
            "
        ></div>
        <div
            style="
                position: absolute;
                left: 0;
                bottom: 0;
                width: 200px;
                padding: 10px;
                background: #9999;
                backdrop-filter: blur(10px);
                color: white;
            "
        ></div>
        <div
            style="
                position: absolute;
                bottom: 10px;
                left: 230px;
                width: calc(100% - 460px);
            "
        ></div>
    `;
}
