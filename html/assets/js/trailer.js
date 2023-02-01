const trailer = $j("#trailer");
const trailerText = $j("#trailer + span");

const animateTrailer = (e, interacting) => {
    const xTrailer = e.clientX - trailer.offsetWidth / 2,
        yTrailer = e.clientY - trailer.offsetHeight / 2;

    const keyframesTrailer = {
        transform: `translate(${xTrailer}px, ${yTrailer}px) scale(${interacting ? 5 : 1})`
    }

    trailer.animate(keyframesTrailer, { 
        duration: 800, 
        fill: "forwards" 
    });
}

const animateTrailerText = (e, interacting) => {
    const xText = e.clientX - trailerText.offsetWidth / 2,
        yText = e.clientY - trailerText.offsetHeight / 2;

    const keyframesTrailerText = {
        transform: `translate(${xText}px, ${yText}px)`
    }

    trailerText.animate(keyframesTrailerText, { 
        duration: 5000, 
        fill: "forwards" 
    });
}

const getTrailerClass = type => {
    switch(type) {
        case "click":
            return "click";
        case "hover":
            return "hover";
        case "drag":
            return "drag";
        case "drag-left":
            return "drag left";
        case "drag-right":
            return "drag right";
        case "double-click":
            return "double click";
        default:
            return ""; 
    }
}

window.onmousemove = e => {
    const interactable = e.target.closest("[data-type]"),
        interacting = interactable !== null;

    animateTrailer(e, interacting);
    animateTrailerText(e, interacting);

    trailer.dataset.type = interacting ? interactable.dataset.type : "";
    
    if ( interacting ) {
        if ( interactable.dataset.explanation ) {
            if ( interactable.dataset.explanation != '' && $j('.explanation') ) {
                // writeExplantion(interactable.dataset.explanation)
                if ( interactable.dataset.explanation == 'date' ) {
                    $j('.explanation').innerText = calculateDate();
                } else {
                    $j('.explanation').innerText = interactable.dataset.explanation;
                }
            }
        }
        trailerText.innerText = getTrailerClass(interactable.dataset.type);
    } else {
        if ( $j('.explanation') ) {
            // writeExplantion('', true)
            $j('.explanation').innerText = '';
        }
        trailerText.innerText = "";
    }
}

function calculateDate() {
    // 25/08/2018 9:00
    let startDate = new Date(2018, 7, 27, 9, 0, 0, 0);
    let endDate = new Date();
    let diff = endDate.getTime() - startDate.getTime();
    let years = Math.floor(diff / 1000 / 60 / 60 / 24 / 365);
    let months = Math.floor(diff / 1000 / 60 / 60 / 24 / 30);
    let days = Math.floor(diff / 1000 / 60 / 60 / 24);
    let hours = Math.floor(diff / 1000 / 60 / 60);
    let minutes = Math.floor(diff / 1000 / 60);
    
    let text = '';
    // how long have passed
    if ( years > 0 ) {
        text += years + ' years ';
    }
    if ( months > 0 ) {
        let monthsExtra = months - (years * 12);
        text += monthsExtra + ' months ';
    }
    if ( days > 0 ) {
        let daysExtra = days - (months * 30);
        text += daysExtra + ' days ';
    }
    if ( hours > 0 ) {
        let hoursExtra = hours - (days * 24);
        text += hoursExtra + ' hours ';
    }
    if ( minutes > 0 ) {
        let minutesExtra = minutes - (hours * 60);
        text += minutesExtra + ' minutes';
    }
    
    return text;
}

// function writeExplantion(text, stop = false) {
    
//     if ( $j('.explanation') ) {
//         let a = text.split('');
//         $j('.explanation').innerText = '';

//         var c = a.length;
//         j = 0;

//         let writing = setInterval(function(){
//             if( j < c ){
//                 $j('.explanation').innerText = $j('.explanation').innerText + a[j];
//                 j++; 
//             } else {
//                 clearInterval(writing);
//             }
//         }, 150);
        
//         if ( stop ) {
//             clearInterval(writing);
//             $j('.explanation').innerText = '';
//             return;
//         }
//     }
// }
