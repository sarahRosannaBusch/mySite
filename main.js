"use strict"

/** @brief  my resume
 *  @author Sarah Rosanna Busch
 *  @date   11 March 2022
 */

window.addEventListener("resize", () => { 
    if(document.documentElement.clientWidth >= 800) {
        f.html.getElem('#menu').classList.remove('closed');
        f.html.getElem('#menuBtn').style.display = 'none';
    }
    //console.log(document.documentElement.clientWidth); 
});

var main = (function() {
    var that = {};
    var elem = {};

    const pageUrls = {
        shop: 'shop',
        services: './pages/services/services.html',
        myChess: './pages/myChess/index.html',
        diceRoller: './pages/diceRoller/index.html',
        dndBackstories: './pages/dndBackstories/index.html',
        svgAnimations: './pages/illustrations/svgAnimations.html',
        vectorArt: './pages/illustrations/vectorArt.html',
        techDrawings: './pages/illustrations/techDrawings.html',
        shortStories: './pages/book/shortStories.html',
        book: './pages/book/index.html',
        swPortfolio: './pages/swPortfolio/index.html',
        resume: './pages/resume/index.html',
        charts: './pages/illustrations/charts.html'
    }

    that.init = function() {
        elem.body = f.html.getElem('body');
        elem.menu = f.html.getElem('#menu');
        elem.sidePanel = f.html.getElem('#sidePanel');
        elem.shop = f.html.getElem("#shopPanel");
        elem.menuBtn = f.html.getElem("#menuBtn");
        let buttonElems = f.html.getElems("button", elem.menu);
        elem.btn = {};
        buttonElems.forEach(function(item) {
            elem.btn[item.id] = item;
        });
        footer.setup();
        var hash = location.hash.slice(1);
        if(!hash) {
            if(elem.body.clientWidth < 800) {
                main.nav("menu");
            } else {
                main.nav("services");
            }
        } else {
            main.nav(hash);
        }
        window.onhashchange = function() {
            _loadPage(location.hash.slice(1));
        }
    }

    that.nav = function(pageName) {
        let hash = location.hash.slice(1);
        if(hash === pageName) {
            _loadPage(pageName); //for reload
        } else {
            pageName = !pageName ? hash : pageName;
            location.hash = pageName;
        }
    }

    function _loadPage(pageName) {
        var hash = pageName ? pageName : location.hash.slice(1); 
        if(hash === 'menu') {
            elem.menu.classList.remove('closed');
            elem.sidePanel.style.display = 'none';
        } else if(hash === 'shop') {
            f.html.empty(elem.sidePanel);
            elem.sidePanel.style.display = 'none';
        } else {
            elem.sidePanel.style.display = 'inline-block';
            var url = pageUrls[hash];
            f.ajax.get(url, function(pageData) {
                elem.sidePanel.innerHTML = pageData;
                switch(hash) {
                    case "vectorArt":
                        illustrations.load("vectorArt");
                        break;
                    case "techDrawings":
                        illustrations.load("techDrawings");
                        break;
                    case "svgAnimations":
                        illustrations.load("svgAnimations");
                        break;
                    case "charts":
                        charts.init();
                        break;
                }
                window.scrollTo(0,0);
            });
        }
        if(elem.body.clientWidth < 800 && pageName !== 'menu') {
            elem.menu.className = 'closed';
            elem.menuBtn.style.display = 'block';
        } else {
            elem.menuBtn.style.display = 'none';
            for(let key in elem.btn) {
                elem.btn[key].classList.remove('selected');
            }
            if(pageName !== 'menu') {
                elem.btn[pageName].className = 'selected';
            }
        }
    }

    return that;
}());