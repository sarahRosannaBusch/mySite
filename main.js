"use strict"

/** @brief  my resume
 *  @author Sarah Rosanna Busch
 *  @date   13 July 2021
 */

window.addEventListener("resize", () => { 
    console.log(document.documentElement.clientWidth); 
});

var main = (function() {
    var that = {};
    var elem = {};

    var openPage = ''; //keep track of what's open in side panel

    that.init = function() {
        elem.menu = f.html.getElem('#menu');
        elem.sidePanel = f.html.getElem('#sidePanel');
        footer.setup();
        if(document.documentElement.clientWidth >= 800) {
            main.nav("./pages/myChess/index.html");
        }
    }

    that.nav = function(url, callback) {
        url = !url ? openPage : url;
        f.http.get(url, function(pageData) {
            elem.sidePanel.innerHTML = pageData;
            if(document.documentElement.clientWidth < 800) {
                elem.menu.style.display = 'none';
            } else {
                elem.menu.style.display = 'flex';
            }

            switch(url) {
                case "./pages/illustrations/vectorArt.html":
                    illustrations.load("vectorArt");
                    break;
                case "./pages/illustrations/techDrawings.html":
                    illustrations.load("techDrawings");
                    break;
            }
        });
    }

    return that;
}());