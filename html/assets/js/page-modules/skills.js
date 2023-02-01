window.addEventListener('DOMContentLoaded', function(){
    $$j('.s-skills__item').forEach(function(el){
        if ( !el.dataset.progress ) return;
        
        const progress = el.dataset.progress

        if ( progress > 100 ) {
            let over = progress - 100
            el.style.boxShadow = `0rem 0rem 1rem rgb(255 255 255 / ${over}%)`
        } else {
            let opacity = progress / 100
            opacity = opacity < 0.45 ? 0.45 : opacity
            el.style.opacity = opacity
        }
    })
})