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
        ]
    }

    that.load = function(page) {
        elem.container = f.html.getElem("#container");
        _loadImages(imgUrls[page], page);
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
            imgElem.src = imgElem.alt = pageName + '/' + drawings[i][urlIdx];
        }
    }
    
    return that;
}());