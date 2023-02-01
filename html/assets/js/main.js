const $j = document.querySelector.bind(document)
const $$j = document.querySelectorAll.bind(document)

console.log( '%cHey curious developer. Thanks for visiting my website.\nIf you have any questions or tips. Please contact me.\nmarleyryann@gmail.com', 'background-color: #5F4B8B; color: #ffffff; padding: 5px 10px; border-radius: 5px; font-size: 16px;' );

window.addEventListener('DOMContentLoaded', function(){

    updateMaximize();

    let clickCounter = 0;
    let clickTimer = null;

    $j('.header').addEventListener('click', function(e){
        e.stopImmediatePropagation()
        clickCounter++;

        if (clickCounter === 1) {
            clickTimer = setTimeout(function() {
                clickCounter = 0;
            }, 300);
        } else if (clickCounter === 2) {
            clearTimeout(clickTimer);
            $j('.folder').classList.toggle('full')
            updateMaximize($j('.folder').classList.contains('full'))

            clickCounter = 0;
        }
    })

    $j('#video').addEventListener('canplay', function(){
        this.classList.add('active')
    })

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
    wrapperDistance()
})

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

function updateMaximize(maximized) {
    if (typeof maximized === 'undefined') {
        let isMaximized = window.localStorage.getItem('maximized')

        if ( isMaximized == null ) return;

        if ( isMaximized === 'true' ) {
            $j('.folder').classList.add('full')
        } else {
            $j('.folder').classList.remove('full')
        }
        return;
    }
    
    if ( maximized ) {
        window.localStorage.setItem('maximized', 'true')
        $j('.folder').classList.add('full')
    } else {
        window.localStorage.setItem('maximized', 'false')
        $j('.folder').classList.remove('full')
    }
}