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
                padding: 220px 50px 50px 10px;
                border-radius: 0 0 100px;
                background: #66e9;
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
                padding: 50px 10px 220px 50px;
                border-radius: 100px 0 0;
                background: #66e9;
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
                padding: 50px 50px 10px 10px;
                border-radius: 0 100px 0;
                background: #66e9;
                backdrop-filter: blur(10px);
                color: white;
            "
        ></div>
        <div
            style="
                position: absolute;
                bottom: 10px;
                left: 270px;
                width: calc(100% - 540px);
            "
        ></div>
    `;
}
