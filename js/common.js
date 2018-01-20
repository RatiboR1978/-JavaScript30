$(function () {
    $(window).scroll(function(e){
        parallax();
    });

    function parallax(){
        var scrolled = $(window).scrollTop();
        $('.background').css('top',-(scrolled*0.15)+'px');
    }
});

/*Drum Kit
================*/

let keys = Array.from(document.querySelectorAll('.keys__key')),
    audioAll = Array.from(document.querySelectorAll('audio'));

document.addEventListener('keydown', play);
document.addEventListener('keyup', noplay);

function play(event) {
    for (let i = 0; i < audioAll.length; i++) {
        if(event.keyCode === audioAll[i].dataset.key * 1) {
            audioAll[i].currentTime = 0;
            audioAll[i].play();
            keys[i].classList.add('playing');
        }
    }
}

function noplay() {
    Array.from(keys).forEach(function (item) {
        item.classList.remove('playing');
    })
}

/*JS and CSS Clock
================*/

function start() {
    window.setInterval(sec, 1000);
}

function sec() {
    let sec = ((new Date().getSeconds() / 60) * 360) - 270,
        min = ((new Date().getMinutes() / 60) * 360) - 270,
        hour = ((new Date().getHours() / 12) * 360) - 270,
        minHand = document.querySelector('.min-hand'),
        secondHand = document.querySelector('.second-hand'),
        hourHand = document.querySelector('.hour-hand');

    secondHand.style.transform = `rotate(${min}deg)`;
    minHand.style.transform = `rotate(${sec}deg)`;
    hourHand.style.transform = `rotate(${hour}deg)`;
}

start()