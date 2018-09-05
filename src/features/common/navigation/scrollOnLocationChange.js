// first add raf shim
// http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (() =>
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, 1000 / 60);
    })();

// https://stackoverflow.com/questions/8917921/cross-browser-javascript-not-jquery-scroll-to-top-animation
const scrollToY = (scrollTargetY = 0, speed = 2000, easing = 'easeOutSine') => {
    // scrollTargetY: the target scrollY property of the window
    // speed: time in pixels per second
    // easing: easing equation to use

    const scrollY = window.scrollY || document.documentElement.scrollTop;

    let currentTime = 0;

    // min time .1, max time .8 seconds
    const time = Math.max(0.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, 0.8));

    // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
    const easingEquations = {
        easeOutSine(pos) {
            return Math.sin(pos * (Math.PI / 2));
        },
        easeInOutSine(pos) {
            return -0.5 * (Math.cos(Math.PI * pos) - 1);
        },
        easeInOutQuint(pos) {
            if ((pos /= 0.5) < 1) {
                return 0.5 * Math.pow(pos, 5);
            }
            return 0.5 * (Math.pow(pos - 2, 5) + 2);
        },
    };

    // add animation loop
    function tick() {
        currentTime += 1 / 60;

        const p = currentTime / time;
        const t = easingEquations[easing](p);

        if (p < 1) {
            window.requestAnimFrame(tick);

            window.scrollTo(0, scrollY + (scrollTargetY - scrollY) * t);
        } else {
            window.scrollTo(0, scrollTargetY);
        }
    }

    // call it once to get started
    tick();
};

const scrollOnLocationChange = history => {
    history.listen(() => {
        // Reviewers; skip smooth scrolling and delete scrollToY function?
        // window.scrollTo(0, 0);
        scrollToY();
    });
};

export default scrollOnLocationChange;
