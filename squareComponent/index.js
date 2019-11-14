class squareComponent extends HTMLElement {
    connectedCallback() {
        const shadow = this.attachShadow({mode: 'open'});
        shadow.innerHTML = `
            <div
                id="squareComponent"
                onload="renderComponent('nothing')"
                onmousemove="coords.setCoords()">

                <div
                    id="subColumn"
                    class="modSquare sub"
                    onclick="renderComponent('sub', 'column')"
                    onmouseout="changeDisplay()"
                    onmouseover="changeDisplay()"
                >-</div>

                <div
                    id="subRow"
                    class="modSquare sub"
                    onclick="renderComponent('sub', 'row')"
                    onmouseout="changeDisplay()"
                    onmouseover="changeDisplay()"
                >-</div>

                <div
                    id="addColumn"
                    class="modSquare add"
                    onclick="renderComponent('add', 'column')"
                    onmouseout="changeDisplay()"
                    onmouseover="changeDisplay()"
                >+</div>

                <div
                    id="addRow"
                    class="modSquare add"
                    onclick="renderComponent('add', 'row')"
                    onmouseout="changeDisplay()"
                    onmouseover="changeDisplay()"
                >+</div>

                <div class="squareBox" onmouseout="changeDisplay()"></div>

                <link rel="stylesheet" href="./index.css"/>
                <script src="./js.js"></script>

            </div>
        `;
    }
};
customElements.define('square-component', squareComponent);