"use strict";
/**
 * @file       illustrations.js
 * @brief      functionality for Illustrations page
 * @author     Sarah Rosanna Busch
 * @version    0
 * @date       17 Sept 2021
 * */

var illustrations = (function(){
    var that = {};
    var pages = {};
    var tabBtns = [];

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
        ]
    }

    that.load = function() {
        footer.setup();
        pages.vectorArt = f.html.getElem('#vectorArt');
        pages.techDrawings = f.html.getElem('#techDrawings');
        let tabsDiv = f.html.getElem('#tabs');
        tabBtns = f.html.getElems('button', tabsDiv);
        _loadImages();
    }

    that.show = function(pageName, btn) {
        for(let page in pages) {
            pages[page].style.display = 'none';
        }
        let numPages = tabBtns.length;
        for(let i = 0; i < numPages; i++) {
            tabBtns[i].classList.remove('active');
        }
        pages[pageName].style.display = 'block';
        btn.classList.add('active');
    }

    function _loadImages() {
        for(let key in imgUrls) {
            let containerElem = pages[key];
            let drawings = imgUrls[key];
            let numImgs = drawings.length;
            for(let i = 0; i < numImgs; i++) {
                let frame = f.html.spawn(containerElem, 'div');
                frame.className = 'frame';
                let heading = drawings[i][headingIdx];
                if(heading) {
                    let h3 = f.html.spawn(frame, 'h3');
                    h3.innerText = heading;
                }
                let imgElem = f.html.spawn(frame, 'img');
                imgElem.src = imgElem.alt = key + '/' + drawings[i][urlIdx];
            }
        }
    }
    
    return that;
}());