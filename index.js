const componentInfo = {
    x: 4,
    y: 4
}
const coords = {
    x: 0,
    y: 0,
    setCoords: ()=>{
        coords.x = event.pageX;
        coords.y = event.pageY;
    }
}

function renderComponent(action, target) {
    setDisplay('none');
    let root = document.querySelector('.component');
    root.innerHTML = '';
    root.style.gridTemplateColumns = '';
    if(action !== 'nothing') {
        if(action === 'add') {
            if(target === 'row') componentInfo.x++;
            else componentInfo.y++;
        }
        else {
            if(target === 'row') componentInfo.x--;
            else componentInfo.y--;
        }
    }
    
    for(let i = 0; i < componentInfo.x; i++) {
        for(let j = 0; j < componentInfo.y; j++) {
            root.innerHTML += 
            `<div
                class="square"
                onmouseover="setSub(${i}, ${j})"
            ></div>`;
        }
    }

    for(let i = 0; i < componentInfo.y; i++) {
        root.style.gridTemplateColumns += ' 1fr';
    }

    let addColumn = document.getElementById('addColumn');
    let addRow = document.getElementById('addRow');
    addColumn.style.left = root.offsetWidth + 68 + 'px';
    addRow.style.top = root.offsetHeight + 68 + 'px';
}

function setSub(x, y) {
    changeDisplay();
    subColumn.style.left = 68 + 52 * y + 'px';
    subRow.style.top = 68 + 52 * x + 'px';
}

function changeDisplay() {
    let prevElement = document.elementFromPoint(coords.x, coords.y);
    setTimeout(()=>{
        let t = document.elementFromPoint(coords.x, coords.y);
        if(t.classList[0]!=='modSquare' && t.classList[0]!== 'component' && t.classList[0]!== 'square') 
            display = 'none';
        else
            if(t.classList[0]==='modSquare'){
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