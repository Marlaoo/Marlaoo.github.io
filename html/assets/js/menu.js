window.addEventListener('DOMContentLoaded', function(){

    $j('.menu-toggle').addEventListener('click', function(){
        if ( this.classList.contains('active') ) {
            this.classList.remove('active')
            this.setAttribute('title', 'Abrir menu')
            $j('.menu').classList.remove('active')
            toggleText(false)
            $j('.menu').dataset.type = 'drag-left'
        } else {
            this.classList.add('active')
            this.setAttribute('title', 'Fechar menu')
            $j('.menu').classList.add('active')
            toggleText(true)
            $j('.menu').dataset.type = 'drag-right'
        }
    })

    let mouseIsDown = false;
    let startX = 0;
    let endX = 0;
    let starter = ''

    document.querySelector('.menu').addEventListener("mousedown", function(e) {
        mouseIsDown = true;
        startX = e.clientX;
        starter = this;
    });

    document.querySelector('.menu').addEventListener("mousemove", function(e) {
        if (mouseIsDown) {
            endX = e.clientX;
        }
    });

    document.addEventListener("mouseup", function(e) {
        if (mouseIsDown) {
            if (endX < startX && starter.dataset.type === 'drag-left') {
                $j('.menu-toggle').click();
            }
            if (endX > startX && starter.dataset.type === 'drag-right') {
                $j('.menu-toggle').click();
            }
        }
        starter = '';
        mouseIsDown = false;
    });
})

function toggleText(open) {
    if ( open ) {
        $j('.menu-toggle > span > span:nth-child(1)').innerHTML = 'c'
        $j('.menu-toggle > span > span:nth-child(2)').innerHTML = 'l'
        $j('.menu-toggle > span > span:nth-child(3)').innerHTML = 'o'
        $j('.menu-toggle > span > span:nth-child(4)').innerHTML = 's'
        $j('.menu-toggle > span > span:nth-child(5)').innerHTML = 'e'
    } else {
        $j('.menu-toggle > span > span:nth-child(1)').innerHTML = 'm'
        $j('.menu-toggle > span > span:nth-child(2)').innerHTML = 'e'
        $j('.menu-toggle > span > span:nth-child(3)').innerHTML = 'n'
        $j('.menu-toggle > span > span:nth-child(4)').innerHTML = 'u'
        $j('.menu-toggle > span > span:nth-child(5)').innerHTML = ' '
    }
}

var Emblem = {
    init: function(el, str) {
        var element = document.querySelector(el);
        var text = str ? str : element.innerHTML;
        element.innerHTML = '';
        for (var i = 0; i < text.length; i++) {
            var letter = text[i];
            var span = document.createElement('span');
            var node = document.createTextNode(letter);
            var r = (360/text.length)*(i);
            var x = (Math.PI/text.length).toFixed(0) * (i);
            var y = (Math.PI/text.length).toFixed(0) * (i);
            span.appendChild(node);
            span.style.webkitTransform = 'rotateZ('+r+'deg) translate3d('+x+'px,'+y+'px,0)';
            span.style.transform = 'rotateZ('+r+'deg) translate3d('+x+'px,'+y+'px,0)';
            element.appendChild(span);
        }
        element.classList.add('hiding');
    }
};

Emblem.init('.circular');