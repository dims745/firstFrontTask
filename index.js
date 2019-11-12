let componentInfo = {
    x: 7,
    y: 5
}

function renderComponent(action, target) {
    changeDisplay('none');
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
    changeDisplay('block');
    subColumn.style.left = 70 + 52 * y + 'px';
    subRow.style.top = 70 + 52 * x + 'px';
}

function changeDisplay(display) {
    let subColumn = document.getElementById('subColumn');
    let subRow = document.getElementById('subRow');
    subColumn.style.display = display;
    subRow.style.display = display;
}