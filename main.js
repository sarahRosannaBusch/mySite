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
        elem.shop = f.html.getElem("#shop");
        footer.setup();
        // if(document.documentElement.clientWidth >= 800) {
        //     main.nav("./pages/shop/shop.html");
        // }
    }

    that.nav = function(url) {
        url = !url ? openPage : url;
        if(url === 'shop') {
            elem.shop.style.display = 'block';
            f.html.empty(elem.sidePanel);
            elem.sidePanel.display = 'none';
        } else {
            elem.shop.style.display = 'none';
            elem.sidePanel.display = 'inline-block';
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
    }

    return that;
}());