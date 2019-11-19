const defaultValue = {
    x: 4,
    y: 4
}

class SquareComponent extends HTMLElement {

    _component;
    _timer;

    _createModSquare(action, target) {
        let elem = document.createElement('div');
        elem.classList.add('modSquare', action, target);
        elem.innerHTML = action === 'sub' ? '-' : '+';
        elem.onclick = ()=>{
            let n;
            if(action === 'sub') n = -1;
            else n = 1;
            if(target === 'column') this._componentInfo.x += n;
            else this._componentInfo.y += n;
            this._setPosition(
                this._componentInfo.currentPositionX-1 , this._componentInfo.currentPositionY-1);
            this._renderBox();
        }
        elem.onmouseenter = ()=>{
            clearTimeout(this._timer);
        }
        elem.onpointerleave = ()=>{
            this._setVisibility('hidden');
        }
        return elem;
    }

    _setVisibility(value) {
        let valueRow = this._componentInfo.y === 1 ? 'hidden' : value;
        let valueColumn = this._componentInfo.x === 1 ? 'hidden' : value;
        this._component.querySelector('.sub.row').style.visibility = valueRow;
        this._component.querySelector('.sub.column').style.visibility = valueColumn;
    }

    _setPosition(x, y){
        this._componentInfo.currentPositionX = x;
        this._componentInfo.currentPositionY = y;
        let square = this._component.querySelector('.square');
        let margin = parseInt(getComputedStyle(square).margin);
        let subRow = this._component.querySelector('.sub.row');
        let subColumn = this._component.querySelector('.sub.column');
        subRow.style.marginTop = y * (square.offsetHeight + margin * 2) + 'px';
        subColumn.style.marginLeft = (x + 1) * (square.offsetWidth + margin * 2) + 2 + 'px';
        this._setVisibility('visible');
    }

    _renderBox(){
        this._setVisibility('hidden');
        let squareBox = this._component.querySelector('.squareBox');
        squareBox.innerHTML = '';
        let gridTC;
        for(let i = 0; i < this._componentInfo.y; i++) {
            gridTC = '';
            for(let j = 0; j < this._componentInfo.x; j++) {
                let square = document.createElement('div');
                square.classList.add('square');
                square.onmouseover = ()=> this._setPosition(j, i);
                squareBox.append(square);
                gridTC += ' 1fr';
            }
        }
        squareBox.style.gridTemplateColumns = gridTC;
    }

    connectedCallback() {
        this._component = this.attachShadow({mode: 'closed'});
        this.objectUnderMouse = this._component;
        this._component.innerHTML = `<link rel="stylesheet" href="./squareComponent/index.css"/>`;
        let subColumn = this._createModSquare('sub', 'column');
        let addColumn = this._createModSquare('add', 'column');
        let subRow = this._createModSquare('sub', 'row');
        let addRow = this._createModSquare('add', 'row');

        let mediumPart = document.createElement('div');
        mediumPart.classList.add('medium');

        let squareBox = document.createElement('div');
        squareBox.classList.add('squareBox');
        squareBox.onmouseleave = ()=>{
            this._timer = setTimeout(()=>{
                this._setVisibility('hidden');
            }, 20);
        }

        mediumPart.append(subRow, squareBox, addColumn);
        
        let root = document.createElement('div');
        root.append(subColumn, mediumPart, addRow);
        
        this._component.append(root);
        this._renderBox();
      }

      _componentInfo = {
        x : defaultValue.x,
        y : defaultValue.y,
        currentPositionX : 0,
        currentPositionY : 0
      }
}

customElements.define("square-component", SquareComponent);