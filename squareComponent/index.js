const defaultValue = {
    x: 4,
    y: 4
}

class SquareComponent extends HTMLElement {

    component;

    objectUnderMouse;

    _createModSquare(action, target) {
        let elem = document.createElement('div');
        elem.classList.add('modSquare', action, target);
        elem.innerHTML = action === 'sub' ? '-' : '+';
        elem.onclick = ()=>{
            let n;
            if(action === 'sub') n = -1;
            else n = 1;
            if(target === 'column') this.x += n;
            else this.y += n;
            this._renderBox();
        }
        return elem;
    }

    _setVisibility(value) {
        this.component.querySelector('.sub.row').style.visibility = value;
        this.component.querySelector('.sub.column').style.visibility = value;
    }

    _changeVisibility() {

    }

    _setPosition(x,y){
        let square = this.component.querySelector('.square');
        let margin = parseInt(getComputedStyle(square).margin);
        let subRow = this.component.querySelector('.sub.row');
        let subColumn = this.component.querySelector('.sub.column');
        subRow.style.marginTop = y * (square.offsetHeight + margin * 2) + 'px';
        subColumn.style.marginLeft = (x + 1) * (square.offsetWidth + margin * 2) + 2 + 'px';
    }

    _renderBox(){
        let squareBox = this.component.querySelector('.squareBox');
        squareBox.innerHTML = '';
        let gridTC = '';
        for(let i = 0; i < this.x; i++) {
            for(let j = 0; j < this.y; j++) {
                let square = document.createElement('div');
                square.classList.add('square');
                square.onmouseover = ()=> this._setPosition(j, i);
                squareBox.append(square);
            }
            gridTC += ' 1fr';
        }
        squareBox.style.gridTemplateColumns = gridTC;
    }

    connectedCallback() {
        this.component = this.attachShadow({mode: 'closed'});
        this.objectUnderMouse = this.component;
        this.component.innerHTML = `<link rel="stylesheet" href="./index.css"/>`;
        let subColumn = this._createModSquare('sub', 'column');
        let addColumn = this._createModSquare('add', 'column');
        let subRow = this._createModSquare('sub', 'row');
        let addRow = this._createModSquare('add', 'row');

        let mediumPart = document.createElement('div');
        mediumPart.classList.add('medium');

        let squareBox = document.createElement('div');
        squareBox.classList.add('squareBox');

        mediumPart.append(subRow, squareBox, addColumn);
        
        let root = document.createElement('div');
        root.append(subColumn, mediumPart, addRow);
        
        this.component.append(root);
        this._renderBox();
      }

      x = defaultValue.x;
      y = defaultValue.y;
}

customElements.define("square-component", SquareComponent);

function changeDisplay() {
    let prevElement = document.elementFromPoint(coords.x, coords.y);
    setTimeout(()=>{
        let elementOnCursor = document.elementFromPoint(coords.x, coords.y);
        if(elementOnCursor.classList[0]!=='modSquare' && elementOnCursor.classList[0]!== 'squareBox' && elementOnCursor.classList[0]!== 'square') 
            display = 'none';
        else
            if(elementOnCursor.classList[0]==='modSquare'){
                if(!prevElement.classList[0])
                    display = 'none';
                else
                    display = 'flex';
            }
            else
                if(elementOnCursor.classList[0]==='squareBox'){
                    if(!prevElement.classList[0])
                    display = 'none';
                else
                    display = 'flex';
                }
                else
                    display = 'flex';
            setDisplay(display);
    },100);
}

function setDisplay(display) {
    document.getElementById('subColumn').style.display = componentInfo.y-1 ? display : 'none';
    document.getElementById('subRow').style.display = componentInfo.x-1 ? display : 'none';
}