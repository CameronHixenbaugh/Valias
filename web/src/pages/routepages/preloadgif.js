/*
var toggle = document.getElementById('toggle');
var slider = document.querySelector('.slider');


toggle.addEventListener('click', toggleSlider, false);

function toggleSlider(){
    if (slider.classList.contains('opened')) {
        slider.classList.remove('opened');
        slider.classList.add('closed');
    } else {
        slider.classList.remove('closed');
        slider.classList.add('opened');
    }
}

*/
//export function pregif(){
/*
function preload(opa) {
    if(opa <= 0) {
        showContent();
    }
    else {
        document.getElementById('preloader').style.opacity = opa;
        window.setTimeout(function() { preload(opa - 0.5) }, 3000);
    }
};

function showContent() {
    document.getElementById('preloader').style.display = 'none';
    document.getElementById('content').style.display = 'block';
};

document.addEventListener("DOMContentLoaded", function () {
    preload(1);
});
*/
//}
/*
//const preloader = document.getElementById('preloader');
<script src='https://cdnjs.cloudflare.com/ajax/libs/js-cookie/2.2.1/js.cookie.min.js' />

document.addEventListener("DOMContentLoaded", function(event) {
    const seenAnimation = window.Cookies.get('seenAnimation');

    if(!seenAnimation){

    


function preload(opa) {
    if(opa <= 0) {
        showContent();
    }
    else {
        document.getElementById('preloader').style.opacity = opa;
        window.setTimeout(function() { preload(opa - 0.6) }, 3500);
    }
};

function showContent() {
    document.getElementById('preloader').style.display = 'none';
    document.getElementById('content').style.display = 'block';
};

document.addEventListener("DOMContentLoaded", function () {
    preload(1);
});

window.Cookies.set('seenAnimation', 1, {expires: 1});

} else {
    document.getElementById('content').style.display = 'block';
};

('clear-cookie').click(() =>{
    window.Cookies.remove('seenAnimation');
})

});
*/
