function generateArray(range=sliderRange.value, newArray = true) {
    const arrayFilled = new DocumentFragment();
    array.innerHTML = '';
    state.arrayLocal = [];
    
    for (let i = 0; i < range; i++) {
        // create array graph
        const element = document.createElement('div');
        const container = document.createElement('div');
        const numberDisplay = document.createElement('span');
        const number = newArray ? Math.floor(Math.random() * (array.offsetHeight - 25) + 25) : state.fallbackArray[i];
        const widthMod = window.innerWidth <= 600 ? 0 : 100;
        const containerWidth = ((window.innerWidth - widthMod) - ((window.innerWidth - widthMod ) % range))/ range;

        state.arrayLocal.push(number);
        element.className = newArray ? 'ElementInside Grow': 'ElementInside';
        container.classList.add('ElementOutside');
        element.style.height = `${number}px`;
        container.style.width = `${containerWidth}px`;
        element.id = i;
        // 
    
        if(containerWidth >= 35 && range <= 65) {
            state.updateValueText = true;
            numberDisplay.textContent = number;
            numberDisplay.classList.add('ArrayNumber');
            element.appendChild(numberDisplay);
        }else {
            state.updateValueText = false;
            container.onmouseenter = e => {
                numberDisplay.textContent = state.arrayLocal[+e.target.firstChild.id];
                numberDisplay.classList.add('NumberDisplay');
                container.appendChild(numberDisplay);
            }
            container.onmouseleave = e => numberDisplay.remove();
        }
        
        container.appendChild(element);
        arrayFilled.appendChild(container);
    }

    state.fallbackArray = [...state.arrayLocal];
    array.appendChild(arrayFilled);
}

function sortEvent() {
    // if visualiser running, stop it and restart
    if(sorter.stopVisualiser() || sorter.arraySorted) generateArray(state.fallbackArray.length, false);
    
    // 

    sorter = new Sort(state.arrayLocal, sliderSpeed.value);
    switch (algorithmBtn.value) {
        case 'Merge':
            sorter.mergeSort();
            break;
        case 'Heap':
            sorter.heapSort();
            break;
        case 'Quick': 
            sorter.quickSort();
            break;
        case 'Selection':
            sorter.selectionSort();
            break;
        case 'Insertation':
            sorter.insertationSort();
            break;
        case 'Shell':
            sorter.schellSort();
            break;
        case 'Bubble':
            sorter.bubbleSort();
    }
    sorter.visualizeMap();
    sorter.arraySorted = true;
}


sortBtn.onclick = sortEvent;
sliderSpeed.oninput = sliderSpeedEvent;
sliderRange.onchange = sliderRangeEvent

generateBtn.onclick = () => {
    sorter.stopVisualiser();
    generateArray(sliderRange.value);
};

generateArray();





  
  
  
  
  
  



