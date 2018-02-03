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
======================*/

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

/*Flex Panel Gallery
=========================*/

if(window.location.toString().indexOf('panels.html') > 0) {
    let panel = document.querySelectorAll('.panel');

    Array.from(panel).forEach(function (item) {
        item.addEventListener('click', function () {
            item.classList.toggle('action');
            item.children[0].classList.toggle('action-first');
            item.children[2].classList.toggle('action-last');
        })
    })
}

/*Type Ahead
=========================*/

if(window.location.toString().indexOf('type_ahead.html') > 0) {
    const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

    document.body.style.backgroundColor = '#ffc600';

    let xhr = new XMLHttpRequest(),
        suggestions = document.querySelector('.suggestions'),
        search = document.querySelector('.search'),
        arrCity;

    xhr.open('GET', endpoint, false);
    xhr.send();

    if (xhr.status !== 200) {
        alert( xhr.status + ': ' + xhr.statusText );
    } else {
        arrCity = JSON.parse(xhr.responseText);
    }

    search.addEventListener('keyup', func);

    function func() {
        let str,
            textSearch = search.value.toLowerCase().trim();
        if (search.value[0]) {
            str = search.value[0].toUpperCase() + search.value.substring(1);
            str = str.trim();
        }

        suggestions.innerHTML = '';

        arrCity.forEach(function (item) {
            if (item.city.indexOf(textSearch) >= 0 || item.city.indexOf(str) >= 0 || item.state.indexOf(textSearch) >= 0 || item.state.indexOf(str) >= 0) {
                let li = document.createElement('li'),
                    strLi = item.city + ', ' + item.state;
                    reg = new RegExp(textSearch, 'i'),
                    newStr = strLi.replace(reg, `<span class="target-search">${textSearch}</span>`);

                li.innerHTML = `<p class="text-search">${newStr}</p><span>${item.population}</span>`;

                suggestions.appendChild(li);
            }
        });
        if (!textSearch[0] || textSearch[0] === ' ') {
            suggestions.innerHTML = '';
        }
    }

}