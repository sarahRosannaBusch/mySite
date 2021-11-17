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

    var vars = {
        openPage: '' //keep track of what's open in side panel
    }

    const pageUrls = {
        shop: 'shop',
        services: './pages/services/services.html',
        myChess: './pages/myChess/index.html',
        dndBackstories: './pages/dndBackstories/index.html',
        vectorArt: './pages/illustrations/vectorArt.html',
        techDrawings: './pages/illustrations/techDrawings.html',
        shortStories: './pages/book/shortStories.html',
        book: './pages/book/index.html',
        swPortfolio: './pages/swPortfolio/index.html',
        resume: './pages/resume/index.html'
    }

    that.init = function() {
        elem.menu = f.html.getElem('#menu');
        elem.sidePanel = f.html.getElem('#sidePanel');
        elem.shop = f.html.getElem("#shop");
        footer.setup();
        // if(document.documentElement.clientWidth >= 800) {
        //     main.nav("shop");
        // }
        window.onhashchange = function() {
            var hash = location.hash.slice(1);
        }
    }

    that.nav = function(pageName) {
        pageName = !pageName ? vars.openPage : pageName;
        vars.openPage = pageName;
        if(pageName === 'shop') {
            f.html.empty(elem.sidePanel);
            elem.sidePanel.style.display = 'none';
            elem.shop.style.display = 'inline-block';
        } else {
            elem.shop.style.display = 'none';
            elem.sidePanel.style.display = 'inline-block';
            var url = pageUrls[pageName];
            f.http.get(url, function(pageData) {
                elem.sidePanel.innerHTML = pageData;
                if(document.documentElement.clientWidth < 800) {
                    elem.menu.style.display = 'none';
                } else {
                    elem.menu.style.display = 'flex';
                }

                switch(pageName) {
                    case "vectorArt":
                        illustrations.load("vectorArt");
                        break;
                    case "techDrawings":
                        illustrations.load("techDrawings");
                        break;
                }
            });
        }
    }

    return that;
}());