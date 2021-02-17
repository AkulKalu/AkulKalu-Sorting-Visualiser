const rangeValueDisplay = document.getElementById('arrLength');
const speedValueDisplay = document.getElementById('visSpeed');
const sortBtn = document.getElementById('sort');
const generateBtn = document.getElementById('generate');
const algorithmBtn = document.getElementById('algorithms')
const array = document.getElementById('array');
const sliderRange = document.getElementById('range');
const sliderSpeed = document.getElementById('speed');


let algoSelector = null;



const state = {
    algoListOpen : false,
    arrayLocal : [],
}

let sorter = new Sort(state.arrayLocal, sliderSpeed.value);


