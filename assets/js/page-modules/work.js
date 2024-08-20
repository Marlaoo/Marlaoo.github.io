window.addEventListener('DOMContentLoaded', function() {
    laodWork()
})

function laodWork() {

    $$j('.w-work__item').forEach(function(item) {
        var clearTransform;
    
        item.addEventListener('mousemove', function(e) {
            let width = this.offsetWidth
            let height = this.offsetHeight
    
            let mouseX = e.pageX - this.getBoundingClientRect().left - width / 2
            let mouseY = e.pageY - this.getBoundingClientRect().top - height / 2
    
            let mousePX = mouseX / width
            let mousePY = mouseY / height
    
            let rX = mousePX * 10
            let rY = mousePY * -10
    
            this.querySelector('.w-work__content').animate({
                transform: `rotateY(${rX}deg) rotateX(${rY}deg)`
            }, { duration: 300, fill: "forwards" });
        })
    
        item.addEventListener('mouseleave', function(e) {
            clearTransform = setTimeout(() => {
                this.querySelector('.w-work__content').animate({
                    transform: `rotateY(0deg) rotateX(0deg)`
                }, { duration: 300, fill: "forwards" });
            }, 1000);
        })
    
        item.addEventListener('mouseenter', function(e) {
            clearTimeout(clearTransform)
        })
    })

    const track = document.getElementById("work-track");

    setTimeout(() => {
        let containerWidth = document.querySelector('.w-work__item').offsetWidth;
        let dividedBy = window.innerHeight < 669 ? 1 : 2;
        let itemsQtd = Math.ceil(document.querySelectorAll('.w-work__item').length / dividedBy);
        containerWidth = ((containerWidth + 30) * itemsQtd) - 25;

        track.style.width = `${containerWidth}px`;
        track.dataset.prevPercentage = 0;
        track.dataset.percentage = 0;
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

    if ( window.innerWidth < 768 ) {
        const workItems = $$j('.w-work__item');
        
        const options = {
            threshold: 0.3 // Define a porcentagem mínima de visibilidade requerida (30% neste caso)
        };
        
        const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
        }, options);
        
        workItems.forEach(item => {
            observer.observe(item);
        });
    }

    setTimeout(() => {
        let footNote = document.createElement('div');
        footNote.classList.add('foot-note');
        if ( window.location.href.includes('pt') ) {
            footNote.innerHTML = 'Observação: Estes designs não são de minha autoria <br> apenas o código.';
        } else {
            footNote.innerHTML = 'Note that these designs are not mine <br> just the code';
        }

        document.querySelector('body').insertAdjacentElement('beforeend', footNote);
        setTimeout(() => {
            footNote.classList.add('visible');
        }, 100);

        setTimeout(() => {
            footNote.classList.remove('visible');
        } , 5000);
    }, 4500);

    // [
    //     {
    //         "title":"CARTACAPITAL",
    //         "link":"https://www.cartacapital.com.br/"
    //     },
    //     {
    //         "title":"STUDIOCARTA - CARTACAPITAL",
    //         "link":"https://negocios.cartacapital.com.br/"
    //     },
    //     {
    //         "title":"ESPAÇO FEMINISMOS PLURAIS",
    //         "link":"https://espacofeminismosplurais.org.br/"
    //     },
    //     {
    //         "title":"OBSERVATÓRIO DAS AÇÕES PENAIS",
    //         "link":"https://obspenalbrumadinho.com.br/"
    //     },
    //     {
    //         "title":"VIDA SIMPLES",
    //         "link":"https://vidasimples.co/"
    //     },
    //     {
    //         "title":"CARMEN MIRANDA",
    //         "link":"https://carmenmiranda.com.br/"
    //     },
    //     {
    //         "title":"CDN",
    //         "link":"http://cdn.com.br/"
    //     },
    //     {
    //         "title":"INTERCEMENT",
    //         "link":"https://intercement.com/"
    //     },
    //     {
    //         "title":"PIAUÍ",
    //         "link":"https://piaui.folha.uol.com.br/"
    //     },
    //     {
    //         "title":"COLÉGIO ROSÁRIO",
    //         "link":"https://rosarionet.com.br/"
    //     },
    //     {
    //         "title":"SOU MAIS",
    //         "link":"https://soumaisbemestar.com.br/"
    //     },
    //     {
    //         "title":"SUSTAINEA",
    //         "link":"https://sustaineabio.com/"
    //     },
    //     {
    //         "title":"FAO",
    //         "link":"https://www.fundoamazoniaoriental.org.br/"
    //     },
    //     {
    //         "title":"INSTITUTO IT MIDIA",
    //         "link":"https://www.institutoitmidia.com.br/"
    //     },
    //     {
    //         "title":"TUPY",
    //         "link":"https://www.tupy.com.br/"
    //     },
    //     {
    //         "title":"Mês da Mulher - Grupo Lara",
    //         "link":"https://laragrupo.com.br/mesdasmulheres/"
    //     }
    // ]
}