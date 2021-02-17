

function animate(object, animationClass, delay=false) {
    if(object.classList[object.classList.length -1].search('Anim') !== -1) {
        object.classList.remove(object.classList[object.classList.length -1]);
    }
    if(object.style.animationDelay) {
        object.style.animationDelay = '';
    }
    object.classList.add(animationClass);
    if(delay) {
        object.style.animationDelay = `${delay}s`;
    }
}

function sliderRangeEvent (e) {
    sliderFill('range', e.target)
    rangeValueDisplay.textContent = e.target.value;
    sorter.stopVisualiser();
    generateArray(e.target.value);
}

function sliderSpeedEvent(e) {
    speedValueDisplay.textContent = e.target.value;
}

function sliderFill(slider, sliderElement) {
    // fill bar effect for sliders
    document.documentElement.style.setProperty(`--slider-fill-${slider}`, 
    ((100 / (slider === 'range' ?  180: 60))*sliderElement.value  - (slider === 'range'? 11: 1)).toString() + '%')
}

function setAlgorithmBtnEvent(target) {
    for (let i = 0; i < algoSelector.children.length; i++) {
        if(algoSelector.children[i] !== target) {
            const className = (i+1)%2 > 0 ? 'ListExitLeftAnim' : 'ListExitRightAnim'
            animate(algoSelector.children[i], className) 
        }
    }
    if(target.value) {
        algorithmBtn.textContent = target.textContent;
        algorithmBtn.value = target.value;
        animate(target, 'ListSelectedAnim')
        target.onanimationend = () => {
            algoSelector.remove();
            state.algoListOpen = false;
        }
    } 
}


function listAlgorithmsEvent(e) {
    // if list is open, close it
    if(state.algoListOpen) {
        for (let i = 0; i < algoSelector.children.length; i++) {
            const className = (i+1)%2 > 0 ? 'ListExitLeftAnim' : 'ListExitRightAnim'
            animate(algoSelector.children[i], className) 
            if(i=== 0) {
                algoSelector.children[i].onanimationend = () => {
                    algoSelector.remove();
                    state.algoListOpen = false;
                };
            }
        }
        return;
    }
     // 

    state.algoListOpen = true;
   
    // make algorithm list
    let algorithms = ['Merge', 'Heap','Quick', 'Selection', 'Insertation', 'Shell', 'Bubble'];
    const options = document.createElement('div');
    options.className = 'Options';
    options.id = 'algoSelector';
    let delay = 0;
    algorithms.forEach( algo => {
        if(algo !== e.target.value) {
            const option = document.createElement('button');
            delay+=0.1;
            option.textContent = algo + ' Sort';
            option.value = algo;
            option.className = 'Btn BtnAlgo BtnList';
            animate(option, 'BtnListAnimEnter', delay);
            // option.style.animationDelay = `${delay}s`;
            option.style.height = algorithmBtn.offsetHeight
            options.appendChild(option);
        }
    });
    // 
    options.onclick = e => setAlgorithmBtnEvent(e.target);

    algorithmBtn.parentElement.appendChild(options);
    algoSelector =  document.getElementById('algoSelector');
}

algorithmBtn.onclick = listAlgorithmsEvent;
sliderRange.oninput = e => {
    rangeValueDisplay.textContent = e.target.value;
};
sliderSpeed.onchange = e => sliderFill('speed', e.target);

sliderFill('range', sliderRange);
sliderFill('speed', sliderSpeed);