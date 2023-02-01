window.addEventListener('DOMContentLoaded', function() {
    $$j('.w-work__item').forEach(function(item) {
        item.addEventListener('click', function() {
            // console.log(this)
        })
    })
    
    const track = document.getElementById("work-track");

    setTimeout(() => {
        let containerWidth = document.querySelector('.w-work__item').offsetWidth;
        let itemsQtd = Math.ceil(document.querySelectorAll('.w-work__item').length / 2);
        containerWidth = ((containerWidth + 30) * itemsQtd) - 30;
    
        track.style.width = `${containerWidth}px`;
    }, 1500);
    
    const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;
    
    const handleOnUp = () => {
        track.dataset.mouseDownAt = "0";  
        track.dataset.prevPercentage = track.dataset.percentage;
    }
    
    const handleOnMove = e => {
        if ( track.dataset.mouseDownAt === "0" ) return;
    
        const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
            maxDelta = document.querySelector('.folder').clientWidth * 2;
            
        const percentage = (mouseDelta / maxDelta) * -100,
            nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
            nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
    
        track.dataset.percentage = nextPercentage;
        
        track.animate({
            transform: `translate(${nextPercentage}%, -50%)`
        }, { duration: 1200, fill: "forwards" });
    }
    
    let drag = false
    window.addEventListener('mousedown', function(e) {
        drag = false;
        handleOnDown(e)
    })

    window.addEventListener('touchstart', function(e) {
        drag = false;
        handleOnDown(e.touches[0])
    })
    
    window.addEventListener('mouseup', function(e) {
        handleOnUp(e)
        if ( !drag ) {
            if ( e.target.classList.contains('w-work__item') ) {
                let item = e.target.querySelector('a')
                window.open(item.href, '_blank').focus();
            }
        }
    })

    window.addEventListener('touchend', function(e) {
        handleOnUp(e.touches[0])
        if ( !drag ) {
            if ( e.target.classList.contains('w-work__item') ) {
                let item = e.target.querySelector('a')
                window.open(item.href, '_blank').focus();
            }
        }
    })
    
    window.addEventListener('mousemove', function(e) { 
        drag = true;
        handleOnMove(e); 
    })

    window.addEventListener('touchmove', function(e) {
        drag = true;
        handleOnMove(e.touches[0]);
    })
})