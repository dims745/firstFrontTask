let componentInfo = {
    x: 7,
    y: 13
}

function renderComponent(action, target) {
    let root = document.querySelector('.component');
    if(action !== 'nothing') {
        if(action === 'add') {
            if(target === 'row') componentInfo.y++;
            else componentInfo.x++;
        }
        else {
            if(target === 'row') componentInfo.y--;
            else componentInfo.x--;
        }
    }
    root.innerHTML = '';
    root.style.gridTemplateColumns = '1fr 1fr';

    addDeletingColumns(root, true);

    for(let i = 0; i < componentInfo.y; i++) {
        addWite(root, 'sub', 'row');
        for(let j = 0; j < componentInfo.x; j++) {
            root.innerHTML += 
            `<div
                class="square"
                onmouseover="console.log('${i} ' + '${j}')"
            ></div>`;
        }
        addWite(root, 'add', 'row');
    }

    addDeletingColumns(root, false);

}
function addWite(root, action, target) {
    root.innerHTML += `
    <div 
        class="square2"
        onclick="renderComponent('${action}', '${target}')"
    ></div>`;
}

function addDeletingColumns(root, isFirst) {

    addWite(root, 'nothing', 'column');

    for(let j = 0; j < componentInfo.x; j++) {
        addWite(root, isFirst ? 'sub' : 'add', 'column');
    }

    addWite(root, 'nothing', 'column');

    if(isFirst){
        for(let j = 0; j < componentInfo.x; j++) {
            root.style.gridTemplateColumns += ' 1fr';
        }
    }
}