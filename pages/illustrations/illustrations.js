"use strict";
/**
 * @file       illustrations.js
 * @brief      functionality for Illustrations page
 * @author     Sarah Rosanna Busch
 * @version    0.1
 * @date       6 Sept 2022
 * */

var illustrations = (function(){
    var that = {};
    var elem = {};

    const urlIdx = 0;
    const headingIdx = 1;
    const imgUrls = {
        vectorArt: [
            ['robot.svg', null],
            ['seagull.svg', null],
            ['bee.svg', null],
            ['baldEagle.svg', null],
            ['wineBottle.svg', null],
            ['Thynee.svg', null]
        ],
        techDrawings: [
            ['diode.svg', 'Light Emitting Diodes'],
            ['BJTs.svg', 'Bipolar Junction Transistors'],
            ['AndOrNot.svg', 'Logic Gates'],
            ['flip-flops.svg', 'Flip-Flops'],
            ['debounceSPDT.svg', 'Debounce Cicuit'],
            ['aluminumBlock.svg', 'Assembly Drawing']
        ],
        svgAnimations: [
            ['logo.svg', 'Animated Logo'],
            ['facialExpressions.svg', 'Facial Expressions'],
            // ['tree.svg', 'Tree Timeline']
        ]
    }

    that.load = function(page) {    
        elem.container = f.html.getElem("#container");   
        if(page === "svgAnimations") {
            f.html.empty(elem.container);
            _loadSVG(imgUrls[page], page); 
            _initFacialExpressions();
        } else {
            _loadImages(imgUrls[page], page); 
        }
    }

    function _loadImages(drawings, pageName) {
        let numImgs = drawings.length;
        for(let i = 0; i < numImgs; i++) {
            let frame = f.html.spawn(elem.container, 'div');
            frame.className = 'frame';
            let heading = drawings[i][headingIdx];
            if(heading) {
                let h3 = f.html.spawn(frame, 'h3');
                h3.innerText = heading;
            }
            let imgElem = f.html.spawn(frame, 'img');
            imgElem.src = imgElem.alt = 'pages/illustrations/' + pageName + '/' + drawings[i][urlIdx];
        }
    }

    function _loadSVG(drawings, pageName) {
        let numImgs = drawings.length;
        for(let i = 0; i < numImgs; i++) {
            let frame = f.html.spawn(elem.container, 'div');
            frame.className = 'frame';
            let heading = drawings[i][headingIdx];
            if(heading) {
                let h3 = f.html.spawn(frame, 'h3');
                h3.innerText = heading;
            }
            let filename = 'pages/illustrations/' + pageName + '/' + drawings[i][urlIdx];
            f.ajax.get(filename, (svgXML) => {
                frame.innerHTML += svgXML;
            });
        }
    }

    function _initFacialExpressions() {
        let expElems = [];
        let i = 0;
        let timer = setInterval(() => {
            if(!expElems[i]) {                
                expElems.push(f.html.getElem("#exp_"+i));
                expElems[i].style.display = "inline";
            }
            let last = i - 1;
            if(last < 0) { last = 11; }
            if(expElems[last]) {
                expElems[last].style.opacity = "0";
                expElems[i].style.opacity = "1";
            }
            i = (i >= 11) ? 0 : i+1; 
        }, 1000);
    }
    
    return that;
}());