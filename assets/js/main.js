const $j = document.querySelector.bind(document)
const $$j = document.querySelectorAll.bind(document)

console.log( '%cHey curious developer. Thanks for visiting my website.\nIf you have any questions or tips. Please contact me.\nmarleyryann@gmail.com', 'background-color: #5F4B8B; color: #ffffff; padding: 5px 10px; border-radius: 5px; font-size: 16px;' );

window.addEventListener('DOMContentLoaded', function(){

    // updateMaximize();

    let clickCounter = 0;
    let clickTimer = null;

    $j('.header').addEventListener('click', function(e){
        // e.stopImmediatePropagation()
        clickCounter++;

        if (clickCounter === 1) {
            clickTimer = setTimeout(function() {
                clickCounter = 0;
            }, 300);
        } else if (clickCounter === 2) {
            clearTimeout(clickTimer);
            $j('.folder').classList.toggle('fullscreen')
            if ( $j('.folder').classList.contains('fullscreen') ) {
                var elem = document.documentElement;
                if (elem.requestFullscreen) {
                    elem.requestFullscreen();
                } else if (elem.webkitRequestFullscreen) { /* Safari */
                    elem.webkitRequestFullscreen();
                } else if (elem.msRequestFullscreen) { /* IE11 */
                    elem.msRequestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) { /* Safari */
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) { /* IE11 */
                    document.msExitFullscreen();
                }
            }
            
            // updateMaximize($j('.folder').classList.contains('fullscreen'))

            clickCounter = 0;
        }
    })

    if ( $j('#video') ) {
        $j('#video').addEventListener('canplay', function(){
            this.classList.add('active')
        })
    }

    if ( window.innerWidth < 800 ) {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
        
    setTimeout(() => {
        $j('.folder').classList.remove('closed')
        setTimeout(() => {
            wrapperDistance();
        }, 300);
    }, 150);
})

window.addEventListener('beforeunload', function(){
    $j('.folder').classList.add('closed')
    $j('#video').classList.remove('active')
})

window.addEventListener('resize', function(){
    wrapperDistance()
})

var lastScrollTop = 0;
window.addEventListener('scroll', function(){
    // var st = window.scrollY;

    // if ( st > lastScrollTop ){
    //     console.log('Scrolling down')
    // } else {
    //     console.log('Scrolling up')
    // }

    // lastScrollTop = st;

    if ( window.innerWidth < 800 ) {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    wrapperDistance()
})

if ( window.innerWidth > 1280 ) {
    window.addEventListener('wheel', function(event){
        if ( event.target.tagName === 'DIV' ) {
            if ( getComputedStyle(event.target)['overflow'] == 'auto' ) return;
        } else {
            if ( getComputedStyle(event.target.closest('div'))['overflow'] == 'auto' ) return;
        }
        
        if (event.deltaY > 0) {
            $j('.folder').style.transform = 'rotateY(0) rotateX(-4deg) translateY(calc(-50% - 2rem)) translateX(-50%)';
            $j('.menu-toggle').style.translate = '0 2rem';
            setTimeout(() => {
                $j('.folder').style.transform = 'translate(-50%, -50%)'
                $j('.menu-toggle').style.translate = '-0';
            }, 400);
        } else if (event.deltaY < 0) {
            $j('.folder').style.transform = 'rotateY(0) rotateX(4deg) translateY(calc(-50% + 30px)) translateX(-50%)';
            $j('.menu-toggle').style.translate = '0 -2rem';
            setTimeout(() => {
                $j('.folder').style.transform = 'translate(-50%, -50%)'
                $j('.menu-toggle').style.translate = '0';
            }, 400);
        }
    })
}
/*
 * Functions
 */
function wrapperDistance(){
    if ( !$j('.wrapper') ) return;
    
    let distance = $j('.wrapper').offsetLeft

    $$j('[data-distance]').forEach(function(item){
        let datas = item.dataset.distance.split(';')
        datas.forEach(function(data){
            let property = data.split('-')[0]
            let side = data.split('-')[1]
            item.style[`${property}${side}`] = `${distance}px`
        })
    })
}

// function updateMaximize(maximized) {
//     if (typeof maximized === 'undefined') {
//         let isMaximized = window.localStorage.getItem('maximized')

//         if ( isMaximized == null ) return;

//         if ( isMaximized === 'true' ) {
//             $j('.folder').classList.add('fullscreen')
//             // document.documentElement.requestFullscreen();
//         } else {
//             $j('.folder').classList.remove('fullscreen')
//         }
//         return;
//     }
    
//     if ( maximized ) {
//         window.localStorage.setItem('maximized', 'true')
//         $j('.folder').classList.add('fullscreen')
//         // document.documentElement.requestFullscreen();
//     } else {
//         window.localStorage.setItem('maximized', 'false')
//         $j('.folder').classList.remove('fullscreen')
//     }
// }

fetch(`${window.location.origin}/content.json`)
.then(function(response){ return response.json() })
.then(function(data){
    document.addEventListener('click', function(event){
        if ( event.target.dataset.page ) {
            let page = event.target.dataset.page

            let currentPath = window.location.pathname.split('/')
            currentPath = currentPath.filter(el => el != '')

            let currentPage = currentPath.length > 1 ? currentPath[1] : currentPath[0]
            
            let currentLanguage = window.location.pathname.includes('pt') ? 'pt' : ''
            let language = currentLanguage
            
            if ( event.target.classList.contains('language') ) {
                language = event.target.dataset.page == 'pt' ? 'pt' : ''
                if ( currentPage != 'pt' ) {
                    page = currentPage ? currentPage : 'home'
                } else {
                    page = 'home'
                }
            }

            
            if ( (
                (page == currentPage) 
                || (
                    page == 'home' 
                    && (currentPage == '' || currentPage == 'pt')
                   )
                ) 
                && !event.target.classList.contains('language') 
            ) return;
            
            let content = data[page]
            if ( content ) {
                
                updateURL(page, language)
                
                let main = window.location.pathname.includes('pt') ? content.pt.main : content.en.main;
                let cssFiles = content.files.css
                let jsFiles = content.files.js
                let images = content.files.images
                loadFiles(cssFiles, jsFiles, function() {
                    $j('[data-title]').innerText = page == 'home' ? '' : ` - ${page}`
                    $j('title').innerText = `Marley | ${capitalizeFirstLetter(page)}`

                    $j('.folder').classList.add('changing')
                    setTimeout(() => {
                        $j('body').classList = page
                        $j('main').innerHTML = main;
                        setTimeout(() => {
                            $j('.folder').classList.remove('changing')
                            window.dispatchEvent(new Event('resize'));
                            if ( page == 'work' ) {
                                laodWork()
                            } else if ( page == 'skills' ) {
                                loadSkills()
                            }
                        }, 50);
                    }, 350);

                    $j('[data-page].active:not(.language)')?.classList.remove('active')
                    event.target.classList.add('active')

                    $$j('.language').forEach(function(lang) {
                        lang.classList.remove('active')
                    })
                    $j(`.language[data-page="${language ? 'pt' : 'en'}"]`).classList.add('active')

                    setTimeout(() => {
                        $j('.menu-toggle').classList.remove('active')
                        $j('.menu-toggle').setAttribute('title', 'Abrir menu')
                        $j('.menu').classList.remove('active')
                        toggleText(false)
                        $j('.menu').dataset.type = 'drag-left'
                        $j('.menu').blur();
                    }, 100);
                })
            } else {
                console.error('No content for page', page)
            }
        }
    })
})
.catch(function(error){
    console.log(error)
})

function loadFiles(cssFiles, jsFiles, callback) {
    let totalFiles = cssFiles.length + jsFiles.length;
    let loadedFiles = 0;

    function loadScript(fileName) {
        if (!isScriptLoaded(fileName)) {
            let script = document.createElement("script");
            script.src = fileName;
            script.onload = () => {
                loadedFiles++;
                checkAllFilesLoaded();
            };
            document.head.appendChild(script);
        } else {
            loadedFiles++;
            checkAllFilesLoaded();
        }
    }

    function loadStylesheet(fileName) {
        if (!isStylesheetLoaded(fileName)) {
            let link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = fileName;
            link.onload = () => {
                loadedFiles++;
                checkAllFilesLoaded();
            };
            document.head.appendChild(link);
        } else {
            loadedFiles++;
            checkAllFilesLoaded();
        }
    }

    function isScriptLoaded(fileName) {
        return Array.from(document.scripts).some((script) => 
            script.src === window.location.origin + fileName
        );
    }

    function isStylesheetLoaded(fileName) {
        return Array.from(document.styleSheets).some((styleSheet) =>
            styleSheet.href === window.location.origin + fileName
        );
    }

    function checkAllFilesLoaded() {
        if (loadedFiles === totalFiles) {
            callback();
        }
    }

    cssFiles.forEach((fileName) => {
        loadStylesheet(fileName);
    });

    jsFiles.forEach((fileName) => {
        loadScript(fileName);
    });
}

function updateURL(page, language = '') {
    page = page == 'home' ? '' : page
    let url = window.location.href.split('/')
    // if there is no language in the url, leave it without
    if ( language ) {
        let newURL = `${url[0]}//${url[2]}/${language}/${page}/`
        window.history.pushState({page: page}, page, newURL)
        return;
    }
    let newURL = `${url[0]}//${url[2]}/${page}/`
    window.history.pushState({page: page}, page, newURL)
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

window.addEventListener('popstate', function (event) {
    // let page = 'home'
    // if ( event.state?.page ) {
    //     page = event.state.page
    // }

    // let current = window.location.pathname.replace('/', '')
    
    // console.log(page)
    // console.log(current)
    
    // if ( page != current ) {
    //     if ( $j(`[data-page="${page}"]`) ) {
    //         $j(`[data-page="${page}"]`).click()
    //     }
    // }
});