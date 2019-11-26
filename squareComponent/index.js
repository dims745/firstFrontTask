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
            this._modifyBox(
                action,
                target,
                target==='row' ?
                    this._componentInfo.currentPositionY :
                    this._componentInfo.currentPositionX
            );
            this._setPosition(
                this._componentInfo.currentPositionX - (target==='row' ? 0 : 1) , this._componentInfo.currentPositionY - (target==='column' ? 0 : 1));
            this._setVisibility('hidden');
        }
        elem.onmouseenter = ()=>{
            clearTimeout(this._timer);
        }
        elem.onpointerleave = ()=>{
            this._setVisibility('hidden');
        }
        return elem;
    }

    _modifyBox(action, target){
        let squareBox = this._component.querySelector('.squareBox');
        if(target === 'column') {
            if(action === 'add') {
                this._componentInfo.y++;
                let column = document.createElement('div');
                column.classList.add('y' + this._componentInfo.y);
                for(let j = 0; j < squareBox.children[0].children.length; j++) {
                    let square = document.createElement('div');
                    square.classList.add('square', 'x'+j);
                    square.onmouseover = this._componentInfo.squareAction;
                    column.append(square);
                }
                squareBox.append(column);
            } else {
                squareBox.removeChild(squareBox.children[this._componentInfo.currentPositionX]);
                this._componentInfo.y--;
            }
        } else {
            for(let i = 0; i < squareBox.children.length; i++){
                if(action === 'add'){
                    let square = document.createElement('div');
                    square.classList.add('square', 'x' + this._componentInfo.y);
                    square.onmouseover = this._componentInfo.squareAction;
                    squareBox.children[i].append(square);
                } else {
                    squareBox.children[i]
                        .removeChild(
                            squareBox.children[i].children[this._componentInfo.currentPositionY]
                        );
                    this._componentInfo.x--;
                }
            }
        }
    }

    _setVisibility(value) {
        let squareBox = this._component.querySelector('.squareBox');
        let valueRow = squareBox.children[0].children.length === 1 ? 'hidden' : value;
        let valueColumn = squareBox.children.length === 1 ? 'hidden' : value;
        let subRow = this._component.querySelector('.sub.row');
        let subColumn = this._component.querySelector('.sub.column');
        subRow.style.transition = valueRow === 'hidden' ? 'none' : 'margin 0.5s';
        subColumn.style.transition = valueColumn === 'hidden' ? 'none' : 'margin 0.5s';
        subColumn.style.visibility = valueColumn;
        subRow.style.visibility = valueRow;
    }

    _calculatePosition(event){
        let square = event.target;
        let parent = square.parentElement;
        let gParent = parent.parentElement;
        let i = 0, j = 0;
        for(; i < parent.children.length; i++) {
            if(parent.children[i] === square)break;
        }
        for(; j < gParent.children.length; j++) {
            if(gParent.children[j] === parent)break;
        }
        this._setPosition(j, i);
    }

    _setPosition(x, y){
        x = x === -1 ? 0 : x;
        y = y === -1 ? 0 : y;
        this._componentInfo.currentPositionX = x;
        this._componentInfo.currentPositionY = y;
        let square = this._component.querySelector('.square');
        let margin = parseInt(getComputedStyle(square).margin);
        let subRow = this._component.querySelector('.sub.row');
        let subColumn = this._component.querySelector('.sub.column');
        subColumn.style.marginLeft = (x + 1) * (square.offsetWidth + margin * 2) + 2 + 'px';
        subRow.style.marginTop = y * (square.offsetHeight + margin) + 'px';
        subColumn.style.marginLeft = (x + 1) * (square.offsetWidth + margin * 2) + 2 + 'px';
    }

    _renderBox(){
        let squareBox = this._component.querySelector('.squareBox');
        for(let i = 0; i < this._componentInfo.y; i++) {
            let squareColumn = document.createElement('div');
            squareColumn.classList.add('y'+i);
            for(let j = 0; j < this._componentInfo.x; j++) {
                let square = document.createElement('div');
                square.classList.add('square', 'x'+j);
                square.onmouseover = this._componentInfo.squareAction;
                squareColumn.append(square);
            }
            squareBox.append(squareColumn);
        }
        this._setVisibility('hidden');
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
            }, 0);
        }
        mediumPart.append(subRow, squareBox, addColumn);
        let root = document.createElement('div');
        root.append(subColumn, mediumPart, addRow);
        root.classList.add('root');
        this._component.append(root);
        this._renderBox();
      }

      _componentInfo = {
        x : defaultValue.x,
        y : defaultValue.y,
        currentPositionX : 0,
        currentPositionY : 0,
        squareAction: (event)=>{
            this._calculatePosition(event);
            this._setVisibility('visible');
        }
      }
}

customElements.define("square-component", SquareComponent);
