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
if(window.location.toString().indexOf('drum.html') > 0) {
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
}


/*JS and CSS Clock
================*/

if(window.location.toString().indexOf('clock.html') > 0) {
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
}

/*CSS Variables
================*/

if(window.location.toString().indexOf('variables.html') > 0) {
    let spacing = document.querySelector('#spacing'),
        blur = document.querySelector('#blur'),
        base = document.querySelector('#base'),
        hl = document.querySelector('.variables__hl'),
        img = document.querySelector('.variables__img');

    spacing.addEventListener('mousemove', changeSpacing);
    blur.addEventListener('mousemove', changeBlur);
    base.addEventListener('change', changeBase);

    function changeSpacing() {
        img.style.padding = `${this.value}px`;
    }

    function changeBlur() {
        img.style.filter = `blur(${this.value}px)`;
    }

    function changeBase() {
        img.style.backgroundColor = `${this.value}`;
        hl.style.color = `${this.value}`;
    }
}

