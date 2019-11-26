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
                this._componentInfo.currentPositionX-1 , this._componentInfo.currentPositionY-1);
        }
        elem.onmouseenter = ()=>{
            clearTimeout(this._timer);
        }
        elem.onpointerleave = ()=>{
            this._setVisibility('hidden');
        }
        return elem;
    }

    _modifyBox(action, target, n){
        let squareBox = this._component.querySelector('.squareBox');
        if(target === 'column') {
            if(action === 'add') {
                this._componentInfo.y++;
                let column = document.createElement('div');
                column.classList.add('y'+this._componentInfo.y);
                for(let j = 0; j < squareBox.children[0].children.length; j++) {
                    let square = document.createElement('div');
                    square.classList.add('square', 'x'+j);
                    square.onmouseover = (event)=> this._calculatePosition(event);
                    column.append(square);
                }
                squareBox.append(column);
            } else {
                squareBox.removeChild(squareBox.children[this._componentInfo.currentPositionX]);
                this._componentInfo.y--;
            }
        }
        else {
            for(let i = 0; i < squareBox.children.length; i++){
                if(action === 'add'){
                    let square = document.createElement('div');
                    square.classList.add('square', 'x' + this._componentInfo.y);
                    square.onmouseover = (event)=> this._calculatePosition(event);
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
        let valueRow = this._componentInfo.y === 1 ? 'hidden' : value;
        let valueColumn = this._componentInfo.x === 1 ? 'hidden' : value;
        this._component.querySelector('.sub.row').style.visibility = valueRow;
        this._component.querySelector('.sub.column').style.visibility = valueColumn;
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
        this._componentInfo.currentPositionX = x;
        this._componentInfo.currentPositionY = y;
        let square = this._component.querySelector('.square');
        let margin = parseInt(getComputedStyle(square).margin);
        let subRow = this._component.querySelector('.sub.row');
        let subColumn = this._component.querySelector('.sub.column');
        subRow.style.marginTop = y * (square.offsetHeight + margin) + 'px';
        subColumn.style.marginLeft = (x + 1) * (square.offsetWidth + margin * 2) + 2 + 'px';
        this._setVisibility('visible');
    }

    _renderBox(){
        this._setVisibility('hidden');
        let squareBox = this._component.querySelector('.squareBox');
        for(let i = 0; i < this._componentInfo.y; i++) {
            let squareColumn = document.createElement('div');
            squareColumn.classList.add('y'+i);
            for(let j = 0; j < this._componentInfo.x; j++) {
                let square = document.createElement('div');
                square.classList.add('square', 'x'+j);
                square.onmouseover = (event)=> this._calculatePosition(event);
                squareColumn.append(square);
            }
            squareBox.append(squareColumn);
        }
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
        currentPositionY : 0
      }
}

customElements.define("square-component", SquareComponent);
